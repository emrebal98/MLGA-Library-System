import db from "../../config/database.js";

/**
 * Get computers and return result as array
 * @param {*} req
 * @param {*} res
 */
async function GetComputers(req, res) {
	try {
		//Query
		db.query("SELECT * FROM `Computer`", async (err, rows) => {
			if (!rows) return res.status(401).json({ auth: 0, message: "There is no computer" });
			//Result array of computers
			const result = Object.values(JSON.parse(JSON.stringify(rows)));
			//Send successful auth flag
			res.status(200).json(result);
		});
	} catch (err) {
		console.log({ info: "Get Computers Error", message: err });
	}
}

/**
 * Get computer by computer id
 * @param {*:id} req.params.id
 * @param {*} res
 */
async function GetComputer(req, res) {
	try {
		//Query
		db.query("SELECT * FROM `Computer` WHERE `cID` = ?", [req.params.id], async (err, rows) => {
			if (!rows || rows.length <= 0) return res.status(401).json({ auth: 0, message: "The specified computer does not exist" });
			else {
				console.log(rows.length);
				// if (rows.affectedRows <= 0) res.status(400).json({ auth: 0, message: "Specified computer(s) does not exists" });
				//Result array of computers
				const result = Object.values(JSON.parse(JSON.stringify(rows)));
				//Send successful auth flag with firt element of result
				res.status(200).json(result[0]);
			}
		});
	} catch (err) {
		console.log({ info: "Get Computer Error", message: err });
	}
}

export { GetComputer, GetComputers };
