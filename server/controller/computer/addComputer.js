import db from "../../config/database.js";
/**
 * Adds computer
 * @param {*} req
 * @param {*} res
 */
async function AddComputer(req, res) {
	try {
		const { cLocation, cAvailability } = req.body;
		//Query
		db.query("INSERT INTO `Computer` (`cLocation`,`cAvailability`) VALUES (?,?)", [cLocation, cAvailability], async (err, rows) => {
			if (err) console.log(err);
			else res.status(200).json({ message: "Computer succesfully added" });
		});
	} catch (err) {
		console.log({ info: "Add Computer Error", message: err });
	}
}

export default AddComputer;
