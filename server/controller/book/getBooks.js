import db from "../../config/database.js";

/**
 * Get books and return result as array
 * @param {*} req
 * @param {*} res
 */
async function GetBooks(req, res) {
	try {
		//Query
		db.query("SELECT * FROM `Book`", async (err, rows) => {
			if (!rows) return res.status(401).json({ auth: 0, message: "There is no book" });
			//Result array of books
			const result = Object.values(JSON.parse(JSON.stringify(rows)));
			//Send successful auth flag
			res.status(200).json(result);
		});
	} catch (err) {
		console.log({ info: "Get Books Error", message: err });
	}
}

/**
 * Get book by book id
 * @param {*:id} req.params.id
 * @param {*} res
 */
async function GetBook(req, res) {
	try {
		//Query
		db.query("SELECT * FROM `Book` WHERE `bID` = ?", [req.params.id], async (err, rows) => {
			if (!rows || rows.length <= 0) return res.status(401).json({ auth: 0, message: "The specified book does not exist" });
			else {
				//Result array of books
				const result = Object.values(JSON.parse(JSON.stringify(rows)));
				//Send successful auth flag with firt element of result
				res.status(200).json(result[0]);
			}
		});
	} catch (err) {
		console.log({ info: "Get Book Error", message: err });
	}
}

export { GetBook, GetBooks };
