import jwt from "jsonwebtoken";
import db from "../../config/database.js";
import { promisify } from "util";
import dotenv from "dotenv";
dotenv.config();

//Check user is still logged in
async function IsLoggedIn(req, res, next) {
	if (req.cookies.jwt) {
		try {
			//Verify the token
			const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
			//Check if user still exist
			const query = "SELECT `ID`,`Email`,`Type`,`FullName`,`isBanned` FROM `User` WHERE `ID` = ?";
			db.query(query, [decoded.id], (err, rows, fields) => {
				if (!rows ||rows.length <= 0) return res.status(401).json({ auth: 0, message: "User does not exist" });
				//Send return data to req.user
				req.user = rows[0];
				//Run next function
				return next();
			}).on("", (row) => console.log(row));
		} catch (err) {
			console.log({ info: "IsLoggedIn Error", message: err });
			return res.status(400).json({ auth: 0, message: err });
		}
	} else return res.status(401).json({ auth: 0, message: "No auth!" });
}

export default IsLoggedIn;
