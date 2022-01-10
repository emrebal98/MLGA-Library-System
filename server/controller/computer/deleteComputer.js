import db from "../../config/database.js";

/**
 * Delete computer(s) by computer id
 * @param {*:id,id,id or id} req.params.id
 * @param {*} res
 */
async function DeleteComputer(req, res) {
	try {
		const selected = req.params.id;
		const arr = selected.split(",");
		//Query
		db.query("DELETE FROM `Computer` WHERE `cID` IN (?)", [arr], async (err, rows) => {
			if (err) console.log(err);
			if (!rows) return res.status(401).json({ auth: 0, message: "Something went wrong while deleting computer(s)" });
			else {
				if (rows.affectedRows <= 0) res.status(400).json({ auth: 0, message: "Specified computer(s) does not exists" });
				//Send successful message
				res.status(200).json({ auth: 0, message: "Computer(s) successfully deleted" });
			}
		});
	} catch (err) {
		console.log({ info: "Delete Computer Error", message: err });
	}
}

export default DeleteComputer;
