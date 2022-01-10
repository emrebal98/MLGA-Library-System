import db from "../../config/database.js";

/**
 * Update appointment by appointment id
 * @param {*:id} req.params.id
 * @param {*} res
 */
async function UpdateAppointment(req, res) {
	try {
		const { aStartTime, aEndTime, uID, sID } = req.body;
		console.log(req.body, req.params.id);
		let queryCheck =
			"SELECT * from Appointment where (? between aStartTime and aEndTime or aStartTime between ? and SUBTIME(?,'0 0:0:10.000000') ) AND aStatus = 'active' AND sID=? AND  aID != ?";

		//Query
		db.query(
			queryCheck,
			[aStartTime, aStartTime, aEndTime, sID, req.params.id],
			async (err, rows) => {
				if (err) console.log(err);
				console.log("here");
				console.log(rows);
				if (rows && rows.length > 0)
					res.status(200).json({
						message:
							"The desired end time of the appointment is full",
						success: 0,
					});
				else {
					//Query
					db.query(
						"UPDATE `Appointment`" +
							"SET `aStartTime` = CASE WHEN ? <> '' THEN ? else `aStartTime` END," +
							"`aEndTime` = CASE WHEN ? <> '' THEN ? else `aEndTime` END," +
							"`uID` = CASE WHEN ? <> '' THEN ? else `uID` END," +
							"`sID` = CASE WHEN ? <> '' THEN ? else `sID` END" +
							" WHERE `aID` = ?",
						[
							aStartTime,
							aStartTime,
							aEndTime,
							aEndTime,
							uID,
							uID,
							sID,
							sID,
							req.params.id,
						],
						async (err, rows) => {
							// console.log(rows);
							if (err) console.log(err);
							if (!rows)
								return res.status(401).json({
									auth: 0,
									message:
										"Something went wrong while updating appointment",
									success: 0,
								});
							else if (rows.affectedRows <= 0)
								res.status(400).json({
									auth: 0,
									message:
										"Specified appointment does not exists",
									success: 0,
								});
							else
								res.status(200).json({
									message: "Appointment succesfully updated",
									success: 1,
								});
						}
					);
				}
			}
		);
	} catch (err) {
		console.log({ info: "Appointment Update Error", message: err });
	}
}

export default UpdateAppointment;
