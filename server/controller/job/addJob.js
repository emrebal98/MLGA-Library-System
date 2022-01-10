import db from "../../config/database.js";
/**
 * Adds job
 * @param {*} req
 * @param {*} res
 */
async function AddJob(req, res) {
	try {
		const { jTitle, jDescription, jAvailability } = req.body;
		//Query
		db.query("INSERT INTO `Job` (`jTitle`,`jDescription`,`jAvailability`) VALUES (?,?,?)", [jTitle, jDescription, jAvailability], async (err, rows) => {
			if (err) console.log(err);
			else res.status(200).json({ message: "Job succesfully added", success:1, id: rows.insertId, });
		});
	} catch (err) {
		console.log({ info: "Add Job Error", message: err });
	}
}

export default AddJob;
