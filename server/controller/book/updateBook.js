import db from "../../config/database.js";

/**
 * Update book by book id
 * @param {*:id} req.params.id
 * @param {*} res
 */
async function UpdateBook(req, res) {
	try {
		const { bName, bGenre, bAuthor, bPublisher, bLocation, bReturnTime, uID } = req.body;
		console.log(req.body);
		//Query
		db.query(
			"UPDATE `Book`" +
				"SET `bName` = CASE WHEN ? <> '' THEN ? else `bName` END," +
				"`bGenre` = CASE WHEN ? <> '' THEN ? else `bGenre` END," +
				"`bAuthor` = CASE WHEN ? <> '' THEN ? else `bAuthor` END," +
				"`bPublisher` = CASE WHEN ? <> '' THEN ? else `bPublisher` END," +
				"`bLocation` = CASE WHEN ? <> '' THEN ? else `bLocation` END," +
				"`bAvailability`= IF(? IS NULL,1,0) ," +
				"`bReturnTime`= ? ," +
				"`uID`= IF(? IS NULL,NULL,CASE WHEN ? <> '' THEN ? else `uID` END)" +
				" WHERE `bID` = ?",
			[bName, bName, bGenre, bGenre, bAuthor, bAuthor, bPublisher, bPublisher, bLocation, bLocation, bReturnTime, bReturnTime, bReturnTime, uID, uID, req.params.id],
			async (err, rows) => {
				if (err) console.log(err);
				if (!rows) return res.status(401).json({ auth: 0, message: "Something went wrong while updating book", success: 0 });
				else if (rows.affectedRows <= 0) res.status(400).json({ auth: 0, message: "Specified book does not exists", success: 0 });
				else res.status(200).json({ message: "Book succesfully updated", success: 1 });
			}
		);
	} catch (err) {
		console.log({ info: "Book Update Error", message: err });
	}
}

export default UpdateBook;
