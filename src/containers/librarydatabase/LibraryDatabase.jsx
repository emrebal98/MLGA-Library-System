import React, { useState } from "react";
import { Table, Popup } from "../../components";
import { Notification } from "../../helper/notfiy";
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
	/**
	 * false = Student
	 * true = Librarian
	 */
	const [user, setUser] = useState(false);
	const [show, setShow] = useState({
		create: false,
		edit: false,
		delete: false,
	});

	function handleShow(type) {
		setShow({ ...show, [type]: true });
	}

	function handleClose(e) {
		setShow({
			create: false,
			edit: false,
			delete: false,
		});

		//?Notification examples
		Notification.success("Sucess Message");
		Notification.error("Error Message");
		Notification.info("Info Message");
		Notification.warning("Warning message");
	}

	return (
		<>
			<div className="library_database">
				<h1>Library Database</h1>

				{/* TEMP CODE START*/}
				<span>Student </span>
				<label class="switch">
					<input
						type="checkbox"
						onChange={(e) => setUser(e.target.checked)}
					/>
					<span class="slider round"></span>
				</label>
				<span> Librarian</span>
				{/* TEMP CODE END*/}

				<div className="table_area">
					{user && (
						<div className="button_area">
							<button onClick={(e) => handleShow("create")}>
								Create
							</button>
							<button onClick={(e) => handleShow("edit")}>
								Edit
							</button>
							<button onClick={(e) => handleShow("delete")}>
								Delete
							</button>
						</div>
					)}

					<Table
						checkBox={user}
						search={true}
						selectedItems={selectedItems}
						setSelectedItems={setSelectedItems}
						allItems={allItems}
						titles={Object.keys(allItems[0])}
					/>
				</div>
			</div>
			{show.create && (
				<Popup close={handleClose}>
					<h1>Create</h1>
				</Popup>
			)}
			{show.edit && (
				<Popup close={handleClose}>
					<h1>Edit</h1>
				</Popup>
			)}
			{show.delete && (
				<Popup close={handleClose}>
					<h1>Delete</h1>
				</Popup>
			)}
		</>
	);
}

export default LibraryDatabase;
