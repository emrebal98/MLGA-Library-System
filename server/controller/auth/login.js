import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../../config/database.js";
import dotenv from "dotenv";
dotenv.config();

//Login Function
async function Login(req, res) {
	try {
		const { email, password } = req.body;
		//Check if username and password not empty
		if (!email || !password)
			return res.status(400).json({
				auth: 0,
				message: "Please provide an username and password.",
			});

		// Query
		db.query(
			"SELECT * FROM `User` WHERE `Email` = ?",
			[email],
			async (err, rows) => {
				//Check if user exist or password is correct
				if (
					rows.length === 0 ||
					!(await bcrypt.compare(password, rows[0].Password))
				)
					res.json({
						auth: 0,
						message: "Username or Password is incorrect.",
					});
				else {
					const id = rows[0].ID;
					//Create token
					const token = jwt.sign({ id }, process.env.JWT_SECRET, {
						expiresIn: process.env.JWT_EXPIRES_IN,
					});

					const cookieOptions = {
						expires: new Date(
							Date.now() +
								process.env.JWT_COOKIE_EXPIRES *
									24 *
									60 *
									60 *
									1000 /*miliseconds*/
						),
						httpOnly: true,
					};
					res.cookie("jwt", token, cookieOptions);
					//Send successful auth flag
					res.status(200).json({
						auth: 1,
						message: "Login succesful.",
						user: {
							ID: rows[0].ID,
							FullName: rows[0].FullName,
							Type: rows[0].Type,
							IsBanned: rows[0].isBanned
						},
					});
				}
			}
		);
	} catch (err) {
		console.log({ info: "Login Error", message: err });
	}
}

export default Login;
