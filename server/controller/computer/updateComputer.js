import db from "../../config/database.js";

/**
 * Update computer by computer id
 * @param {*:id} req.params.id
 * @param {*} res
 */
async function UpdateComputer(req, res) {
	try {
		const { cLocation, cAvailability } = req.body;
		//Query
		db.query(
			"UPDATE `Computer`" +
				"SET `cLocation` = CASE WHEN ? <> '' THEN ? else `cLocation` END," +
				"`cAvailability` = CASE WHEN ? <> '' THEN ? else `cAvailability` END" +
				" WHERE `cID` = ?",
			[cLocation, cLocation, cAvailability, cAvailability, req.params.id],
			async (err, rows) => {
				console.log(rows);
				if (err) console.log(err);
				if (!rows) return res.status(401).json({ auth: 0, message: "Something went wrong while updating computer" });
				else if (rows.affectedRows <= 0) res.status(400).json({ auth: 0, message: "Specified computer does not exists" });
				else res.status(200).json({ message: "Computer succesfully updated" });
			}
		);
	} catch (err) {
		console.log({ info: "Computer Update Error", message: err });
	}
}

export default UpdateComputer;
