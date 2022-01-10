import db from "../../config/database.js";
/**
 * Applys job
 * @param {*} req
 * @param {*} res
 */
async function ApplyJob(req, res) {
	try {
		const { uID } = req.body;
		//Check if user already applied
		db.query("SELECT * FROM `JobApplication` WHERE `uID` = ? AND `jID` = ?", [uID,req.params.id], async (err, rows) => {
			if (err) console.log(err);
			else if (rows.length > 0) {
				return res.json({ auth: 0, message: "User already applied for the job.", success:0 });
			}
			//Query
			db.query("INSERT INTO `JobApplication` (`uID`,`jID`) VALUES (?,?)", [uID, req.params.id], async (err, rows) => {
				if (err) {
					if (err.errno == 1216) return res.status(400).json({ auth: 0, message: "Specified job or user does not exists", success:0 });
					else console.log(err);
				}
				if (!rows) return res.status(401).json({ auth: 0, message: "Something went wrong while applying job", success:0 });
				else if (rows.affectedRows <= 0) return res.status(400).json({ auth: 0, message: "Specified job or user does not exists", success:0 });
				else return res.status(200).json({ message: "Job succesfully applied", success:1 });
			});
		});
	} catch (err) {
		console.log({ info: "Apply Job Error", message: err });
	}
}

export default ApplyJob;
