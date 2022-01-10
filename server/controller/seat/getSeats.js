import db from "../../config/database.js";

/**
 * Get seats and return result as array
 * @param {*} req
 * @param {*} res
 */
async function GetSeats(req, res) {
	try {
		//Query
		db.query(
			"SELECT * FROM Seat WHERE sTypeGroup = ?",
			[req.params.id],
			async (err, rows) => {
				if (!rows)
					return res
						.status(401)
						.json({ auth: 0, message: "There is no seat" });
				//Result array of jobs
				const result = Object.values(JSON.parse(JSON.stringify(rows)));
				//Send successful auth flag
				res.status(200).json(result);
			}
		);
	} catch (err) {
		console.log({ info: "Get Seats Error", message: err });
	}
}
/**
 * Get unavailable seats and return result as array
 * @param {*} req
 * @param {*} res
 */
async function GetUnavailableSeats(req, res) {
	try {
		const { date } = req.body;
		console.log(date);
		//Query
		db.query(
			"SELECT se.* FROM Appointment as ap " +
				"JOIN Seat as se on ap.sID=se.sID " +
				"WHERE ? BETWEEN ap.aStartTime and SUBTIME(ap.aEndTime,'0 0:0:10.000000') " +
				"AND se.sTypeGroup = ?",
			[date, req.params.id],
			async (err, rows) => {
				console.log(err);
				if (!rows)
					return res
						.status(401)
						.json({ auth: 0, message: "There is no seat" });
				//Result array of jobs
				const result = Object.values(JSON.parse(JSON.stringify(rows)));
				//Send successful auth flag
				res.status(200).json(result);
			}
		);
	} catch (err) {
		console.log({ info: "Get Seats Error", message: err });
	}
}

export { GetUnavailableSeats, GetSeats };
