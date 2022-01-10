import db from "../../config/database.js";

//Gets users
async function getUsers(req, res) {
	try {
		db.query("SELECT ID, Email FROM `User` WHERE Type = 'student'", async (err, rows) => {
			if (!rows)
				return res
					.status(401)
					.json({ auth: 0, message: "There is no user" });
			//Result array of books
			const result = Object.values(JSON.parse(JSON.stringify(rows)));
			//Send successful auth flag
			res.status(200).json(result);
		});
	} catch (err) {
		console.log({ info: "Users Error", message: err });
	}
}

export default getUsers;
