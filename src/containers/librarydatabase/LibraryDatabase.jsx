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
			availability: "true",
		},
		{
			bookName: "Book name2",
			genre: "fds",
			author: "vcx",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book name3",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book name2",
			genre: "fds",
			author: "vcx",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book name3",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book name2",
			genre: "fds",
			author: "vcx",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book name3",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book name2",
			genre: "fds",
			author: "vcx",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book name3",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book name10",
			genre: "fds",
			author: "vcx",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book nameLAST",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book nameLAST",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book nameLAST",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book nameLAST",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book nameLAST",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book nameLAST",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book nameLAST",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book nameLAST",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book nameLAST",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book nameLAST",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
		{
			bookName: "Book 21",
			genre: "hgf",
			author: "kjh",
			publisher: "data",
			availability: "true",
		},
	];
	const [selectedItems, setSelectedItems] = useState([]);

	return (
		<div className="library_database">
			<h1>Library Database</h1>
			<div className="table_area">
				<Table
					checkBox={false}
					search={true}
					selectedItems={selectedItems}
					setSelectedItems={setSelectedItems}
					allItems={allItems}
					titles={Object.keys(allItems[0])}
				/>
			</div>
		</div>
	);
}

export default LibraryDatabase;
