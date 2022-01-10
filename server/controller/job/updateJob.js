import db from "../../config/database.js";

/**
 * Update job by job id
 * @param {*:id} req.params.id
 * @param {*} res
 */
async function UpdateJob(req, res) {
	try {
		const { jTitle, jDescription, jAvailability } = req.body;
		//Query
		db.query(
			"UPDATE `Job`" +
				"SET `jTitle` = CASE WHEN ? <> '' THEN ? else `jTitle` END," +
				"`jDescription` = CASE WHEN ? <> '' THEN ? else `jDescription` END," +
				"`jAvailability` = CASE WHEN ? <> '' THEN ? else `jAvailability` END" +
				" WHERE `jID` = ?",
			[jTitle, jTitle, jDescription, jDescription, jAvailability, jAvailability, req.params.id],
			async (err, rows) => {
				console.log(rows);
				if (err) console.log(err);
				if (!rows) return res.status(401).json({ auth: 0, message: "Something went wrong while updating job",success:0 });
				else if (rows.affectedRows <= 0) res.status(400).json({ auth: 0, message: "Specified job does not exists",success:0  });
				else res.status(200).json({ message: "Job succesfully updated", success:1 });
			}
		);
	} catch (err) {
		console.log({ info: "Job Update Error", message: err });
	}
}

export default UpdateJob;
