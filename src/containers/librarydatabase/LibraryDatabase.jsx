import React, { useState } from "react";
import { Table } from "../../components";
import "./librarydatabase.css";

function LibraryDatabase() {
	const allItems = [
		{
			bookName: "Book name1",
			genre: "asd",
			author: "kljh",
			publisher: "data",
			availability: true,
		},
		{
			bookName: "Book name2",
			genre: "fds",
			author: "vcx",
			publisher: "data",
			availability: true,
		},
		{
			bookName: "Book name3",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: true,
		},
	];
	const [selectedItems, setSelectedItems] = useState([]);

	return (
		<div className="LibraryDatabase">
			<Table
				checkBox={true}
				selectedItems={selectedItems}
				setSelectedItems={setSelectedItems}
				allItems={allItems}
				titles={Object.keys(allItems[0])}
			/>
		</div>
	);
}

export default LibraryDatabase;
