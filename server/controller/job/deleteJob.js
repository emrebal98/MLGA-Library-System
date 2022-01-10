import db from "../../config/database.js";

/**
 * Delete job(s) by job id
 * @param {*:id,id,id or id} req.params.id
 * @param {*} res
 */
async function DeleteJob(req, res) {
	try {
		const selected = req.params.id;
		const arr = selected.split(",");
		//Query
		db.query("DELETE FROM `Job` WHERE `jID` IN (?)", [arr], async (err, rows) => {
			if (err) console.log(err);
			if (!rows) return res.status(401).json({ auth: 0, message: "Something went wrong while deleting job(s)", success:0 });
			else {
				if (rows.affectedRows <= 0) res.status(400).json({ auth: 0, message: "Specified job(s) does not exists", success:0 });
				//Send successful message
				res.status(200).json({ auth: 0, message: "Job(s) successfully deleted", success:1 });
			}
		});
	} catch (err) {
		console.log({ info: "Delete Job Error", message: err });
	}
}

export default DeleteJob;
