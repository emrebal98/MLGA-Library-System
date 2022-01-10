import db from "../../config/database.js";

/**
 * Ban user by user id
 * @param {*:id} req.params.id
 * @param {*} res
 */
async function BanUser(req, res) {
	try {
		const { isBanned } = req.body;
		// 1 week
		//Query
		db.query("UPDATE `User`" + "SET `isBanned` = CASE WHEN ? <> '' THEN ? else `isBanned` END" + " WHERE `ID` = ?", [isBanned, isBanned, req.params.id], async (err, rows) => {
			if (err) console.log(err);
			if (!rows) return res.status(401).json({ auth: 0, message: "Something went wrong while updating user", success:0 });
			else if (rows.affectedRows <= 0) res.status(400).json({ auth: 0, message: "Specified user does not exists", success:0 });
			else res.status(200).json({ message: "User succesfully banned", success: 1 });
		});
	} catch (err) {
		console.log({ info: "User Ban Error", message: err });
	}
}

/**
 * Warn user by user id
 * @param {*:id} req.params.id
 * @param {*} res
 */
async function WarnUser(req, res) {
	try {
		//Query
		db.query("UPDATE `User`" + "SET `warningCount` = `warningCount` + 1" + " WHERE `ID` = ?", [req.params.id], async (err, rows) => {
			if (err) console.log(err);
			if (!rows) return res.status(401).json({ auth: 0, message: "Something went wrong while updating user" });
			else if (rows.affectedRows <= 0) res.status(400).json({ auth: 0, message: "Specified user does not exists" });
			else res.status(200).json({ message: "User succesfully warned" });
		});
	} catch (err) {
		console.log({ info: "User Warn Error", message: err });
	}
}

export { BanUser, WarnUser };
