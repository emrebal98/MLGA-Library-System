import React, { useState } from "react";
import { Table, Popup } from "../../components";
import { Notification } from "../../helper/notfiy";
import "./librarydatabase.css";

function LibraryDatabase() {
	const randomTexts = Array.apply(null, Array(21)).map(function () {
		return Array.apply(null, Array(~~(Math.random() * 10 + 3)))
			.map(function () {
				return String.fromCharCode(Math.random() * (123 - 97) + 97);
			})
			.join("");
	});

	const createRandomItems = () =>
		randomTexts.map((item, index) => {
			return {
				id: index,
				code: `${item} code`,				
				name: `${item} book`,
				genre: `${item} genre`,
				author: `${item} author`,
				publisher: `${item} data`,
				availability: Math.random() > 0.5 ? "true" : "false",
			};
		});

	const [allItems, setAllItems] = useState(createRandomItems());

	const [selectedItems, setSelectedItems] = useState([]);
	/**
	 * false = Student
	 * true = Librarian
	 */
	const [user, setUser] = useState(false);
	const [show, setShow] = useState({
		create: false,
		edit: false,
	});
	const [checkedClear, setCheckedClear] = useState(false);

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

	function handleDelete(e) {
		//Delete selected elements from the allItems list
		setAllItems(allItems.filter((f) => !selectedItems.includes(f)));
		//Show message
		Notification.info(
			`${selectedItems.length} item${
				selectedItems.length > 1 ? "s" : ""
			} deleted.`
		);
		//Clear selected items if any
		setSelectedItems([]);
		setCheckedClear((prevState) => !prevState);
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
								Add
							</button>
							<button onClick={(e) => handleShow("edit")}>
								Edit
							</button>
							<button onClick={handleDelete}>Delete</button>
						</div>
					)}

					<Table
						checkBox={user}
						search={true}
						selectedItems={selectedItems}
						setSelectedItems={setSelectedItems}
						allItems={allItems}
						titles={Object.keys(allItems[0])}
						checkedClear={checkedClear}
						setCheckedClear={setCheckedClear}
					/>
				</div>
			</div>
			{show.create && (
				<Popup close={handleClose}>
					<div className="form__container">
						<h1>Add New Book to the Library Database</h1>
						<form>
							<div className="input__field">
								Code:
								<input type="text" name="code" />
							</div>
							<div className="input__field">
								Name:
								<input type="text" name="name" />
							</div>
							<div className="input__field">
								Genre:
								<select>
									<option value="shorten">Science</option>
									<option value="extend">History</option>
								</select>
							</div>
							<div className="input__field">
								Author:
								<input type="text" name="author" />
							</div>
							<div className="input__field">
								Publisher:
								<input type="text" name="publisher" />
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
						<form>
							<div className="input__field">
								Code:
								<input type="text" name="code" />
							</div>
							<div className="input__field">
								Name:
								<input type="text" name="name" />
							</div>
							<div className="input__field">
								Genre:
								<select>
									<option value="shorten">Science</option>
									<option value="extend">History</option>
								</select>
							</div>
							<div className="input__field">
								Author:
								<input type="text" name="author" />
							</div>
							<div className="input__field">
								Publisher:
								<input type="text" name="publisher" />
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
