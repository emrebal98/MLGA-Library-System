import bcrypt from "bcrypt";
import db from "../../config/database.js";

//TODO: add fullname etc
//Register Function
async function Register(req, res) {
	//TODO: add user type register
	const { email, password, type } = req.body;
	let userID = 0;

	//Check if username already exist
	db.query("SELECT * FROM `User` WHERE `Email` = ?", [email], async (err, rows) => {
		if (err) console.log(err);
		else if (rows.length > 0) {
			return res.json({ auth: 0, message: "That username is already in use." });
		}

		let hashedPassword = await bcrypt.hash(password, 10);

		db.query("INSERT INTO `User` (`Email`,`Password`,`Type`) VALUES (?,?,?)", [email, hashedPassword, type], (err, rows) => {
			if (err) console.log(err);
			else {
				userID = rows.insertId;
				return res.json({ auth: 0, message: "User registered" });
				// if (type.toLowerCase() === "admin") return res.json({ auth: 0, message: "Admin setting required." });
				// if (type.toLowerCase() === "trainer") {
				//     if (userID === 0) return res.json({ auth: 0, message: "Something went wrong" });
				//     //Create Trainer
				//     db.query("INSERT INTO `Trainer` (Name,Surname,Phone_Number,User_ID) VALUES (?,?,?,?)", [name, surname, phoneNumber, userID], (err, rows) => {
				//         if (err) console.log(err);
				//         else {
				//             return res.json({ auth: 0, message: "Trainer registered" });
				//         }
				//     });
				// } else if (type.toLowerCase() === "member") {
				//     if (userID === 0) return res.json({ auth: 0, message: "Something went wrong" });
				//     //Create Trainer
				//     db.query(
				//         "INSERT INTO `Member` (Name,Surname,Email,Address,Phone_Number,User_ID) VALUES (?,?,?,?,?,?)",
				//         [name, surname, email, address, phoneNumber, userID],
				//         (err, rows) => {
				//             if (err) console.log(err);
				//             else {
				//                 return res.json({ auth: 0, message: "Member registered" });
				//             }
				//         }
				//     );
				// }
			}
		});
	});
}

export default Register;
