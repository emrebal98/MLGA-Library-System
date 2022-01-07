import React, { useState } from "react";
import { Table, Popup } from "../../components";
import { Notification } from "../../helper/notfiy";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import "./appointment.css";
import "react-tabs/style/react-tabs.css";

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
				seatNumber: `${item} AppointmentID`,
				date: `${item} date`,
				startTime: `${item} date`,
				endTıme: `${item} duration`,
				status: `${item} duration`,
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
		next: false,
	});
	const [checkedClear, setCheckedClear] = useState(false);

	const [appointmentPage, setAppointmentPage] = useState(false);

	const [selectedSeat, setSelectedSeat] = useState();
	const [selectedDate, setSelectedDate] = useState(new Date());
	// const [showNext, setShowNext] = useState(false);

	function handleShow(type) {
		setShow({ ...show, [type]: true });
	}

	function handleClose(e) {
		setShow({
			create: false,
			edit: false,
			next: false,
		});

		//?Notification examples
		Notification.success("Success Message");
		Notification.error("Error Message");
		Notification.info("Info Message");
		Notification.warning("Warning message");
	}

	function handleDelete(e) {
		//Delete selected elements from the allItems list
		// setAllItems(allItems.filter((f) => !selectedItems.includes(f)));
		//Show message
		Notification.info(
			`${selectedItems.length} appointment${
				selectedItems.length > 1 ? "s" : ""
			} cancelled.`
		);
		//Clear selected items if any
		setSelectedItems([]);
		setCheckedClear((prevState) => !prevState);
	}

	function getSeats() {
		var list = [];

		for (let i = 0; i < 36; i += 6) {
			// const element = 6

			list.push(
				<div className="seat_group">
					<div className="seat_left_line">
						<div
							className={
								selectedSeat === i + 1
									? "seat selected"
									: "seat"
							}
							id={1 + i}
							onClick={(e) => setSelectedSeat(i + 1)}
						>
							{1 + i}
						</div>
						<div
							className={
								selectedSeat === i + 2
									? "seat selected"
									: "seat"
							}
							id={2 + i}
							onClick={(e) => setSelectedSeat(i + 2)}
						>
							{2 + i}
						</div>
						<div
							className={
								selectedSeat === i + 3
									? "seat selected"
									: "seat"
							}
							id={3 + i}
							onClick={(e) => setSelectedSeat(i + 3)}
						>
							{3 + i}
						</div>
					</div>

					<div className="seperator"></div>
					<div className="seat_right_line">
						<div
							className={
								selectedSeat === i + 4
									? "seat selected"
									: "seat"
							}
							id={4 + i}
							onClick={(e) => setSelectedSeat(i + 4)}
						>
							{4 + i}
						</div>
						<div
							className={
								selectedSeat === i + 5
									? "seat selected"
									: "seat"
							}
							id={5 + i}
							onClick={(e) => setSelectedSeat(i + 5)}
						>
							{5 + i}
						</div>
						<div
							className={
								selectedSeat === i + 6
									? "seat selected"
									: "seat"
							}
							id={6 + i}
							onClick={(e) => setSelectedSeat(i + 6)}
						>
							{6 + i}
						</div>
					</div>
				</div>
			);
		}

		return list;
	}

	function getGroupSeats() {
		var list = [];

		for (let i = 0; i < 6; i++) {
			list.push(
				<div
					className={
						selectedSeat === i + 1
							? "seat_group selected"
							: "seat_group"
					}
					onClick={(e) => setSelectedSeat(i + 1)}
				>
					<div className="seperator"></div>
				</div>
			);
		}

		return list;
	}

	// function handleContinue() {
	// 	setShowNext(true);
	// }

	return (
		<>
			<div className="Appointment">
				<h1>Appointment</h1>
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
				{!appointmentPage ? (
					<div className="table_area">
						{user && (
							<div className="button_area">
								<button
									className="create__button"
									onClick={(e) => handleShow("Sanction")}
								>
									Apply a Sanction
								</button>
								<button
									className="delete__button"
									onClick={handleDelete}
								>
									Cancel the Appointment
								</button>
							</div>
						)}

						{!user && (
							<div className="button_area">
								<button
									className="create__button"
									onClick={(e) => setAppointmentPage(true)}
								>
									Make an Appointment
								</button>

								{selectedItems.length === 1 && (
									<button
										className="edit__button"
										onClick={(e) => handleShow("edit")}
									>
										Change in Appointment
									</button>
								)}
								{selectedItems.length > 0 && (
									<button
										onClick={handleDelete}
										className="delete__button"
									>
										Cancel the Appointment
									</button>
								)}
							</div>
						)}

						<Table
							checkBox={true}
							search={user}
							selectedItems={selectedItems}
							setSelectedItems={setSelectedItems}
							allItems={allItems}
							titles={Object.keys(allItems[0])}
							checkedClear={checkedClear}
							setCheckedClear={setCheckedClear}
						/>
					</div>
				) : (
					<div className="create_appointment_container">
						<Tabs>
							<TabList>
								<Tab>Library</Tab>
								<Tab>Group Work Areas</Tab>
							</TabList>

							<TabPanel>
								<div className="date__container">
									<DateTimePicker
										format="yyyy-MM-dd HH:mm"
										clearIcon={null}
										onChange={setSelectedDate}
										value={selectedDate}
										minDate={selectedDate}
										maxDate={moment(selectedDate)
											.add({
												months: 1,
											})
											.toDate()}
									/>
								</div>
								<div className="library_canvas">
									{getSeats()}
								</div>
								<div className="library_canvas__button_container">
									<button
										onClick={(e) => {
											if (selectedSeat)
												handleShow("next");
										}}
									>
										Continue
									</button>
								</div>
							</TabPanel>
							<TabPanel>
								<div className="date__container">
									<DateTimePicker
										format="yyyy-MM-dd HH:mm"
										clearIcon={null}
										onChange={setSelectedDate}
										value={selectedDate}
									/>
								</div>
								<div className="group_canvas">
									{getGroupSeats()}
								</div>
								<div className="library_canvas__button_container">
									<button
										onClick={(e) => {
											if (selectedSeat)
												handleShow("next");
										}}
									>
										Continue
									</button>
								</div>
							</TabPanel>
						</Tabs>
					</div>
				)}
			</div>
			{show.create && (
				<Popup close={handleClose}>
					<h1>Create</h1>
				</Popup>
			)}
			{show.edit && (
				<Popup close={handleClose}>
					<div className="form__container">
						<h1>Make a Change in Appointment</h1>
						<form>
							<div className="input__field">
								<select>
									<option value="shorten">
										Shorten the Appointment
									</option>
									<option value="extend">
										Extend the Appointment
									</option>
								</select>
							</div>
							<div className="submit_button__container">
								<input
									className="submit__button"
									type="submit"
									value="Change"
								/>
							</div>
						</form>
					</div>
				</Popup>
			)}
			{show.next && (
				<Popup close={handleClose}>
					<div>Selected seat: {selectedSeat}</div>
					<div>
						Selected start time:{" "}
						{moment(selectedDate).format("yyyy-MM-DD HH:mm:ss")}
					</div>
					<div>
						Duration:{" "}
						<input
							type="number"
							min={1}
							max={6}
							defaultValue={1}
							onChange={(e) => {
								if (e.target.value) {
									if (e.target.value > 6) {
										e.target.value = 6;
									}
									if (e.target.value < 1) {
										e.target.value = 1;
									}
								}
							}}
						/>
					</div>
					<button>Create</button>
				</Popup>
			)}
		</>
	);
}

export default Appointment;
