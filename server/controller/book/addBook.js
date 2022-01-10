import db from "../../config/database.js";
/**
 * Adds book
 * @param {*} req
 * @param {*} res
 */
async function AddBook(req, res) {
	try {
		const { bName, bGenre, bAuthor, bPublisher, bLocation, bAvailability } =
			req.body;
		//Query
		db.query(
			"INSERT INTO `Book` (`bName`,`bGenre`,`bAuthor`,`bPublisher`,`bLocation`,`bAvailability`) VALUES (?,?,?,?,?,?)",
			[bName, bGenre, bAuthor, bPublisher, bLocation, bAvailability],
			async (err, rows) => {
				if (err) console.log(err);
				else
					res.status(200).json({
						message: "Book succesfully added",
						success: 1,
						id: rows.insertId,
					});
			}
		);
	} catch (err) {
		console.log({ info: "Add Book Error", message: err });
	}
}

export default AddBook;
