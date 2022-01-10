import db from "../../config/database.js";
/**
 * Adds appointment
 * @param {*} req
 * @param {*} res
 */
async function AddAppointment(req, res) {
	try {
		const { aStartTime, aEndTime, uID, sID } = req.body;
		// console.log(req.body);
		let queryCheck =
			"SELECT * from Appointment where ? between aStartTime and aEndTime or aStartTime between ? and SUBTIME(?,'0 0:0:10.000000') AND sID = ?";
		//Query
		db.query(
			queryCheck,
			[aStartTime, aStartTime, aEndTime, sID],
			async (err, rows) => {
				if (err) console.log(err);
				console.log("hhh");
				console.log(rows);
				if (rows && rows.length > 0)
					res.status(200).json({
						message:
							"The desired end time of the appointment is full",
						success: 0,
					});
				else {
					db.query(
						"INSERT INTO `Appointment` (`aStartTime`,`aEndTime`,`uID`, `sID`) VALUES (?,?,?,?)",
						[aStartTime, aEndTime, uID, sID],
						async (err, rows) => {
							if (err) console.log(err);
							else
								res.status(200).json({
									message: "Appointment succesfully added",
									success: 1,
								});
						}
					);
				}
			}
		);
	} catch (err) {
		console.log({ info: "Add Appointment Error", message: err });
	}
}

export default AddAppointment;
