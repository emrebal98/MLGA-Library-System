import React, { useState, useEffect } from "react";
import { Table, Popup } from "../../components";
import { Notification } from "../../helper/notfiy";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import moment from "moment";
import useAuth from "../../useAuth";
import "./librarydatabase.css";

function LibraryDatabase() {
	const [allItems, setAllItems] = useState([]);

	const [selectedItems, setSelectedItems] = useState([]);

	const [users, setUsers] = useState([]);

	const [book, setBook] = useState({});

	const [show, setShow] = useState({
		create: false,
		edit: false,
	});
	const [checkedClear, setCheckedClear] = useState(false);

	// AUTH PART START
	const { user } = useAuth();
	// AUTH PART END
	//GET ITEMS
	useEffect(() => {
		axios
			.get("http://localhost:5000/book", { withCredentials: true })
			.then((res) => {
				let temp = res.data;
				console.log(res.data);
				if (temp.length > 0) {
					setAllItems([]);
					for (let index = 0; index < temp.length; index++) {
						const element = temp[index];
						let returnTime;
						if (element.bReturnTime) {
							returnTime = moment(element.bReturnTime).format(
								"DD-MM-yyyy"
							);
						}
						setAllItems((prevState) => [
							...prevState,
							{
								id: element.bID,
								code: element.bID,
								name: element.bName,
								location: element.bLocation,
								genre: element.bGenre,
								author: element.bAuthor,
								publisher: element.bPublisher,
								availability:
									element.bAvailability === 1
										? element.bAvailability
										: returnTime,
							},
						]);
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
		axios
			.get("http://localhost:5000/user", { withCredentials: true })
			.then((res) => {
				let temp = res.data;
				// console.log(res.data);
				if (temp.length > 0) {
					setUsers([]);
					for (let index = 0; index < temp.length; index++) {
						const element = temp[index];
						setUsers((prevState) => [...prevState, element]);
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	function handleShow(type) {
		setShow({ ...show, [type]: true });

		if (type === "edit") {
			setBook({ ...getSelectedBook(), user: users[0].ID });
		}
		if (type === "create") setBook({ genre: "Science" });
	}

	function handleClose(e, message = () => {}) {
		setShow({
			create: false,
			edit: false,
			delete: false,
		});

		//?Notification examples
		message();
		// Notification.success("Sucess Message");
		// Notification.error("Error Message");
		// Notification.info("Info Message");
		// Notification.warning("Warning message");
	}

	//Delete the selected books
	function handleDelete(e) {
		let selectedIDs = selectedItems.map((e) => e.id).toString();

		axios
			.delete(`http://localhost:5000/book/${selectedIDs}`, {
				withCredentials: true,
			})
			.then((res) => {
				let temp = res.data;
				// console.log(res.data);
				if (temp.success === 1) {
					//Delete selected elements from the allItems list
					setAllItems(
						allItems.filter((f) => !selectedItems.includes(f))
					);
					//Show message
					Notification.info(
						`${selectedItems.length} item${
							selectedItems.length > 1 ? "s" : ""
						} deleted.`
					);
				} else {
					Notification.error(temp.message);
				}
			})
			.catch((err) => {
				console.log(err);
			});

		//Clear selected items if any
		setSelectedItems([]);
		setCheckedClear((prevState) => !prevState);
	}

	const getSelectedBook = () => {
		if (selectedItems.length === 1) {
			let temp = JSON.parse(JSON.stringify(allItems));
			temp = temp.filter((f) => f.id === selectedItems[0].id)[0];
			if (temp.availability !== 1) {
				temp.returnTime = temp.availability;
				temp.availability = 0;
			}
			return temp;
		} else return false;
	};

	//Creates the book
	function handleCreate(e) {
		e.preventDefault();

		// console.log(book);

		axios
			.post(
				`http://localhost:5000/book/`,
				{
					bName: book.name,
					bGenre: book.genre,
					bAuthor: book.author,
					bPublisher: book.publisher,
					bLocation: book.location,
					bAvailability: true,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log(res);
				if (res.data.success === 1) {
					handleClose(null, Notification.success(res.data.message));

					let tempO = allItems;

					tempO.push({
						id: res.data.id,
						code: res.data.id,
						name: book.name,
						genre: book.genre,
						author: book.author,
						publisher: book.publisher,
						location: book.location,
						availability: 1,
					});

					setAllItems(tempO);
				} else {
					handleClose(null, Notification.error(res.data.message));
				}
			})
			.catch((err) => console.log(err));
	}

	//Edits the book
	function handleEdit(e) {
		e.preventDefault();

		// console.log(book);

		axios
			.patch(
				`http://localhost:5000/book/${book.id}`,
				{
					bName: book.name,
					bGenre: book.genre,
					bAuthor: book.author,
					bPublisher: book.publisher,
					bLocation: book.location,
					bAvailability: book.availability === true ? true : null,
					bReturnTime:
						book.availability === false
							? moment(book.returnTime).format("yyyy-MM-DD")
							: null,
					uID: book.user,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				if (res.data.success === 1) {
					handleClose(
						null,
						Notification.success("Update Succesfull")
					);
					let tempO = allItems;

					tempO.forEach((item) => {
						if (item.id === book.id) {
							item.name = book.name;
							item.genre = book.genre;
							item.author = book.author;
							item.publisher = book.publisher;
							item.location = book.location;
							item.availability =
								book.availability === true ||
								book.availability === 1
									? 1
									: moment(book.returnTime).format(
											"DD-MM-yyyy"
									  );
						}
					});
					setAllItems(tempO);
				} else {
					handleClose(null, Notification.err(res.data.message));
				}
			})
			.catch((err) => console.log(err));
	}

	return (
		<>
			<div className="library_database">
				<h1>Library Database</h1>

				<div className="table_area">
					{user.Type === "librarian" && (
						<div className="button_area">
							<button
								className="create__button"
								onClick={(e) => handleShow("create")}
							>
								Add
							</button>
							{selectedItems.length === 1 && (
								<button
									className="edit__button"
									onClick={(e) => handleShow("edit")}
								>
									Edit
								</button>
							)}
							{selectedItems.length > 0 && (
								<button
									onClick={handleDelete}
									className="delete__button"
								>
									Delete
								</button>
							)}
						</div>
					)}
					{allItems.length > 0 && (
						<Table
							checkBox={user.Type === "librarian"}
							search={true}
							selectedItems={selectedItems}
							setSelectedItems={setSelectedItems}
							allItems={allItems}
							titles={Object.keys(allItems[0])}
							checkedClear={checkedClear}
							setCheckedClear={setCheckedClear}
						/>
					)}
				</div>
			</div>
			{show.create && (
				<Popup close={handleClose}>
					<div className="form__container">
						<h1>Add New Book to the Library Database</h1>
						<form onSubmit={handleCreate}>
							<div className="input__field">
								Name:
								<input
									type="text"
									name="name"
									value={book.name}
									onChange={(e) =>
										setBook((prevState) => {
											return {
												...prevState,
												name: e.target.value,
											};
										})
									}
								/>
							</div>
							<div className="input__field">
								Location:
								<input
									type="text"
									name="location"
									value={book.location}
									onChange={(e) =>
										setBook((prevState) => {
											return {
												...prevState,
												location: e.target.value,
											};
										})
									}
								/>
							</div>
							<div className="input__field">
								Genre:
								<select
									value={book.genre}
									onChange={(e) =>
										setBook((prevState) => {
											return {
												...prevState,
												genre: e.target.value,
											};
										})
									}
								>
									<option value="Science">Science</option>
									<option value="History">History</option>
								</select>
							</div>
							<div className="input__field">
								Author:
								<input
									type="text"
									name="author"
									value={book.author}
									onChange={(e) =>
										setBook((prevState) => {
											return {
												...prevState,
												author: e.target.value,
											};
										})
									}
								/>
							</div>
							<div className="input__field">
								Publisher:
								<input
									type="text"
									name="publisher"
									value={book.publisher}
									onChange={(e) =>
										setBook((prevState) => {
											return {
												...prevState,
												publisher: e.target.value,
											};
										})
									}
								/>
							</div>
							<div className="submit_button__container">
								<input
									className="submit__button"
									type="submit"
									value="Create"
								/>
							</div>
						</form>
					</div>
				</Popup>
			)}
			{show.edit && (
				<Popup close={handleClose}>
					<div className="form__container">
						<h1>Edit Book Information</h1>
						<form onSubmit={handleEdit}>
							<div className="input__field">
								Name:
								<input
									type="text"
									name="name"
									value={book.name}
									onChange={(e) =>
										setBook((prevState) => {
											return {
												...prevState,
												name: e.target.value,
											};
										})
									}
								/>
							</div>

							<div className="input__field">
								Location:
								<input
									type="text"
									name="location"
									value={book.location}
									onChange={(e) =>
										setBook((prevState) => {
											return {
												...prevState,
												location: e.target.value,
											};
										})
									}
								/>
							</div>
							<div className="input__field">
								Genre:
								<select
									value={book.genre}
									onChange={(e) =>
										setBook((prevState) => {
											return {
												...prevState,
												genre: e.target.value,
											};
										})
									}
								>
									<option value="Science">Science</option>
									<option value="History">History</option>
								</select>
							</div>
							<div className="input__field">
								Author:
								<input
									type="text"
									name="author"
									value={book.author}
									onChange={(e) =>
										setBook((prevState) => {
											return {
												...prevState,
												author: e.target.value,
											};
										})
									}
								/>
							</div>
							<div className="input__field">
								Publisher:
								<input
									type="text"
									name="publisher"
									value={book.publisher}
									onChange={(e) =>
										setBook((prevState) => {
											return {
												...prevState,
												publisher: e.target.value,
											};
										})
									}
								/>
							</div>
							<div className="input__field">
								{book.availability === true ||
								book.availability === 1 ? (
									<span>
										Available:{" "}
										<input
											type="checkbox"
											name="available"
											defaultChecked={true}
											onChange={(e) =>
												setBook((prevState) => {
													return {
														...prevState,
														availability:
															e.target.checked,
													};
												})
											}
										/>
									</span>
								) : (
									<>
										<span>
											Available:{" "}
											<input
												type="checkbox"
												name="available"
												defaultChecked={false}
												onChange={(e) =>
													setBook((prevState) => {
														return {
															...prevState,
															availability:
																e.target
																	.checked,
														};
													})
												}
											/>
										</span>
										ReturnTime:
										<input
											type="date"
											name="returnTime"
											defaultValue={moment(
												book.returnTime,
												"DD-MM-yyyy"
											)
												.format("yyyy-MM-DD")
												.toString()}
											onChange={(e) =>
												setBook((prevState) => {
													return {
														...prevState,
														returnTime:
															e.target.value,
													};
												})
											}
										/>
										Student:
										<select
											defaultValue={users[0].ID}
											onChange={(e) =>
												setBook((prevState) => {
													return {
														...prevState,
														user: e.target.value,
													};
												})
											}
										>
											{users.map((user) => (
												<option value={user.ID}>
													{user.Email}
												</option>
											))}
										</select>
									</>
								)}
							</div>
							<div className="submit_button__container">
								<input
									className="submit__button"
									type="submit"
									value="Edit"
								/>
							</div>
						</form>
					</div>
				</Popup>
			)}
		</>
	);
}

export default LibraryDatabase;
