import db from "../../config/database.js";

/**
 * Get jobs and return result as array
 * @param {*} req
 * @param {*} res
 */
async function GetJobs(req, res) {
	try {
		//Query
		db.query("SELECT * FROM `Job`", async (err, rows) => {
			if (!rows)
				return res
					.status(401)
					.json({ auth: 0, message: "There is no job" });
			//Result array of jobs
			const result = Object.values(JSON.parse(JSON.stringify(rows)));
			//Send successful auth flag
			res.status(200).json(result);
		});
	} catch (err) {
		console.log({ info: "Get Jobs Error", message: err });
	}
}

/**
 * Get job by job id
 * @param {*:id} req.params.id
 * @param {*} res
 */
async function GetJob(req, res) {
	try {
		//Query
		db.query(
			"SELECT `j`.`jID`, `j`.`jTitle`, `j`.`jDescription`, `j`.`jAvailability`, json_arrayagg(`ja`.`uID`) as `uIDs` FROM `Job` as `j`" +
				"JOIN `JobApplication` as `ja` on `j`.`jID` = `ja`.`jID`" +
				"WHERE `j`.`jID` = ?" +
				"GROUP BY `j`.`jID`",
			[req.params.id],
			async (err, rows) => {
				//If there is no application for specified job
				if (!rows || rows.length <= 0) {
					db.query(
						"SELECT * FROM `Job` WHERE `jID` = ? ",
						[req.params.id],
						async (err, rows) => {
							if (err) console.log(err);
							if (!rows || rows.length <= 0)
								return res.status(401).json({
									auth: 0,
									message: "The specified job does not exist",
								});
							else {
								//Result array of jobs
								const result = Object.values(
									JSON.parse(JSON.stringify(rows))
								);
								//To parse array string to array object
								result[0].uIDs = [];
								//Send successful auth flag with firt element of result
								res.status(200).json(result[0]);
							}
						}
					);
				} else {
					//Result array of jobs
					const result = Object.values(
						JSON.parse(JSON.stringify(rows))
					);
					//To parse array string to array object
					result[0].uIDs = JSON.parse(result[0].uIDs);
					//Send successful auth flag with firt element of result
					res.status(200).json(result[0]);
				}
			}
		);
	} catch (err) {
		console.log({ info: "Get Job Error", message: err });
	}
}

/**
 * Get jobs by user id and return result as array
 * @param {*} req
 * @param {*} res
 */
async function GetJobsByUserId(req, res) {
	try {
		//Query
		db.query(
			"SELECT * FROM `JobApplication` WHERE `uID` = ?",
			[req.params.id],
			async (err, rows) => {
				if (!rows)
					return res
						.status(401)
						.json({ auth: 0, message: "There is no job" });
				//Result array of jobs
				const result = Object.values(JSON.parse(JSON.stringify(rows)));
				//Send successful auth flag
				res.status(200).json(result);
			}
		);
	} catch (err) {
		console.log({ info: "Get Jobs By User ID Error", message: err });
	}
}
export { GetJob, GetJobs, GetJobsByUserId };
