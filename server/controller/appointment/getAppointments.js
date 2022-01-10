import db from "../../config/database.js";


/**
 * Get appointments and return result as array
 * @param {*} req
 * @param {*} res
 */
 async function GetAllAppointments(req, res) {
	try {
		//Query
		db.query(
			"SELECT * FROM `Appointment` ORDER BY aStartTime DESC",
			[req.params.id],
			async (err, rows) => {
				if (!rows)
					return res
						.status(401)
						.json({ auth: 0, message: "There is no appointment" });
				//Result array of appointments
				const result = Object.values(JSON.parse(JSON.stringify(rows)));
				//Send successful auth flag
				res.status(200).json(result);
			}
		);
	} catch (err) {
		console.log({ info: "Get Appointments Error", message: err });
	}
}

/**
 * Get appointments and return result as array
 * @param {*} req
 * @param {*} res
 */
async function GetAppointments(req, res) {
	try {
		//Query
		db.query(
			"SELECT * FROM `Appointment` WHERE `uID` = ? ORDER BY aStatus,aStartTime DESC",
			[req.params.id],
			async (err, rows) => {
				if (!rows)
					return res
						.status(401)
						.json({ auth: 0, message: "There is no appointment" });
				//Result array of appointments
				const result = Object.values(JSON.parse(JSON.stringify(rows)));
				//Send successful auth flag
				res.status(200).json(result);
			}
		);
	} catch (err) {
		console.log({ info: "Get Appointments Error", message: err });
	}
}

async function PastedAppointmentsUpdate(req, res) {
	try {
		const { date } = req.body;

		db.query(
			"UPDATE `Appointment` SET `aStatus` = 'passed' WHERE aEndTime < ? AND uID = ?",
			[date, req.params.id],
			async (err, rows) => {
				if (err) console.log(err);
			}
		);
	} catch (err) {
		console.log({ info: "PastedAppointmentsUpdate Error", message: err });
	}
}

/**
 * Get appointment by appointment id
 * @param {*:id} req.params.id
 * @param {*} res
 */
async function GetAppointment(req, res) {
	try {
		//Query
		db.query(
			"SELECT * FROM `Appointment` WHERE `aID` = ?",
			[req.params.id],
			async (err, rows) => {
				if (!rows || rows.length <= 0)
					return res.status(401).json({
						auth: 0,
						message: "The specified appointment does not exist",
					});
				else {
					console.log(rows.length);
					//Result array of appointments
					const result = Object.values(
						JSON.parse(JSON.stringify(rows))
					);
					//Send successful auth flag with firt element of result
					res.status(200).json(result[0]);
				}
			}
		);
	} catch (err) {
		console.log({ info: "Get Appointment Error", message: err });
	}
}

export {GetAllAppointments, GetAppointment, GetAppointments, PastedAppointmentsUpdate };
