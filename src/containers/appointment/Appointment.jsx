import React, { useState } from "react";
import { Table, Popup } from "../../components";
import { Notification } from "../../helper/notfiy";
import "./appointment.css";

function Appointment() {
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
			AppointmentID: `${item} AppointmentID`,
			dateTıme: `${item} date`,
			duration: `${item} duration`,
			seatLocation: `${item} seat`,
			bookedBy: `${item} bookedBy`,

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
	Notification.success("Success Message");
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

	return(
	<>
	<div className="Appointment">
		<h1>My Appointments</h1>
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
							<button onClick={(e) => handleShow("Sanction")}>
								Sanction
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
					<h1>Create</h1>
				</Popup>
			)}
			{show.edit && (
				<Popup close={handleClose}>
					<h1>Edit</h1>
				</Popup>
			)}
		</>
	);
}

	

export default Appointment;