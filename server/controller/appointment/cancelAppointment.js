import db from "../../config/database.js";

/**
 * Delete appointment(s) by appointment id
 * @param {*:id,id,id or id} req.params.id
 * @param {*} res
 */
async function CancelAppointment(req, res) {
	try {
		const selected = req.params.id;
		const arr = selected.split(",");
		//Query
		db.query("UPDATE `Appointment`	SET `aStatus` = 'cancelled' WHERE `aID` IN (?)", [arr], async (err, rows) => {
			if (err) console.log(err);
			if (!rows) return res.status(401).json({ auth: 0, message: "Something went wrong while deleting appointment(s)", success: 0 });
			else {
				if (rows.affectedRows <= 0) res.status(400).json({ auth: 0, message: "Specified appointment(s) does not exists", success:0 });
				//Send successful message
				res.status(200).json({ auth: 0, message: "Appointment(s) successfully cancelled", success:1 });
			}
		});
	} catch (err) {
		console.log({ info: "Delete Appointment Error", message: err });
	}
}

export default CancelAppointment;
