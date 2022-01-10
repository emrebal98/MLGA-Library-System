import React, { useState, useEffect } from "react";
import { Table, Popup } from "../../components";
import { Notification } from "../../helper/notfiy";
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from "react-tabs";
import DateTimePicker from "react-datetime-picker";
import { IoChevronBack } from "react-icons/io5";
import moment from "moment";
import useAuth from "../../useAuth";
import "./appointment.css";
import "react-tabs/style/react-tabs.css";
import axios from "axios";

function Appointment() {
	const [allItems, setAllItems] = useState([]);

	const [selectedItems, setSelectedItems] = useState([]);

	const [show, setShow] = useState({
		create: false,
		edit: false,
		next: false,
	});
	const [checkedClear, setCheckedClear] = useState(false);

	const [appointmentPage, setAppointmentPage] = useState(false);

	const [seats, setSeats] = useState([]);
	const [gSeats, setgSeats] = useState([]);

	const [unAvSeats, setunAvSeats] = useState([]);
	const [unAvgSeats, setunAvgSeats] = useState([]);

	const [selectedSeat, setSelectedSeat] = useState();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [duration, setDuration] = useState(1);
	const [extend, setExtend] = useState(false);
	// const [showNext, setShowNext] = useState(false);

	// AUTH PART START
	const { user } = useAuth();
	// AUTH PART END

	//GET ITEMS
	useEffect(() => {
		console.log(user);
		user.Type === "student" &&
			axios
				.get("http://localhost:5000/appointments/" + user.ID, {
					withCredentials: true,
				})
				.then((res) => {
					let temp = res.data;
					// console.log(res.data);
					if (temp.length > 0) {
						setAllItems([]);
						for (let index = 0; index < temp.length; index++) {
							const element = temp[index];

							let startDateTime = moment(element.aStartTime);
							let endDateTime = moment(element.aEndTime);
							let startDate = startDateTime.format("DD-MM-yyyy");
							let startTime = startDateTime.format("HH:mm");
							let endTime = endDateTime.format("HH:mm");
							setAllItems((prevState) => [
								...prevState,
								{
									id: element.aID,
									seatNumber: element.sID,
									date: startDate,
									startTime: startTime,
									endTime: endTime,
									status: element.aStatus,
								},
							]);
						}
					}
				})
				.catch((err) => {
					console.log(err);
				});
		user.Type === "librarian" &&
			axios
				.get("http://localhost:5000/appointments/", {
					withCredentials: true,
				})
				.then((res) => {
					let temp = res.data;
					// console.log(res.data);
					if (temp.length > 0) {
						setAllItems([]);
						for (let index = 0; index < temp.length; index++) {
							const element = temp[index];

							let startDateTime = moment(element.aStartTime);
							let endDateTime = moment(element.aEndTime);
							let startDate = startDateTime.format("DD-MM-yyyy");
							let startTime = startDateTime.format("HH:mm");
							let endTime = endDateTime.format("HH:mm");
							setAllItems((prevState) => [
								...prevState,
								{
									id: element.aID,
									seatNumber: element.sID,
									date: startDate,
									startTime: startTime,
									endTime: endTime,
									bookedBy: element.uID,
									status: element.aStatus,
								},
							]);
						}
					}
				})
				.catch((err) => {
					console.log(err);
				});
		axios
			.get("http://localhost:5000/seat/0", { withCredentials: true })
			.then((res) => {
				let temp = res.data;
				// console.log(res.data);
				if (temp.length > 0) {
					setSeats(temp);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		axios
			.get("http://localhost:5000/seat/1", { withCredentials: true })
			.then((res) => {
				let temp = res.data;
				// console.log(res.data);
				if (temp.length > 0) {
					setgSeats(temp);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [appointmentPage]);

	useEffect(() => {
		axios
			.post(
				"http://localhost:5000/seatUn/0",
				{ date: moment(selectedDate).format("yyyy-MM-DD HH:mm") },
				{ withCredentials: true }
			)
			.then((res) => {
				let temp = res.data;
				// console.log(res.data);
				if (temp.length > 0) {
					setunAvSeats(temp);
				} else {
					setunAvSeats([]);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		axios
			.post(
				"http://localhost:5000/seatUn/1",
				{ date: moment(selectedDate).format("yyyy-MM-DD HH:mm") },
				{ withCredentials: true }
			)
			.then((res) => {
				let temp = res.data;
				// console.log(res.data);
				if (temp.length > 0) {
					setunAvgSeats(temp);
				} else {
					setunAvgSeats([]);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [selectedDate]);

	// useEffect(() => {
	// 	axios.patch(
	// 		"http://localhost:5000/appointments/" + user.ID,
	// 		{ date: moment(new Date()).format("yyyy-MM-DD HH:mm:ss") },
	// 		{
	// 			withCredentials: true,
	// 		}
	// 	);

	// 	axios
	// 		.get("http://localhost:5000/appointments/" + user.ID, {
	// 			withCredentials: true,
	// 		})
	// 		.then((res) => {
	// 			let temp = res.data;
	// 			// console.log(res.data);
	// 			if (temp.length > 0) {
	// 				setAllItems([]);
	// 				for (let index = 0; index < temp.length; index++) {
	// 					const element = temp[index];

	// 					let startDateTime = moment(element.aStartTime);
	// 					let endDateTime = moment(element.aEndTime);
	// 					let startDate = startDateTime.format("DD-MM-yyyy");
	// 					let startTime = startDateTime.format("HH:mm");
	// 					let endTime = endDateTime.format("HH:mm");
	// 					setAllItems((prevState) => [
	// 						...prevState,
	// 						{
	// 							id: element.aID,
	// 							seatNumber: element.sID,
	// 							date: startDate,
	// 							startTime: startTime,
	// 							endTime: endTime,
	// 							status: element.aStatus,
	// 						},
	// 					]);
	// 				}
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, [appointmentPage]);

	function handleShow(type) {
		setShow({ ...show, [type]: true });
		if (type === "edit") setDuration(1);
	}

	function handleClose(e, message = () => {}) {
		setShow({
			create: false,
			edit: false,
			next: false,
		});
		message();
	}

	function handleDelete(e) {
		let selectedIDs = selectedItems.map((e) => e.id).toString();

		axios
			.delete(`http://localhost:5000/appointment/${selectedIDs}`, {
				withCredentials: true,
			})
			.then((res) => {
				let temp = res.data;
				// console.log(res.data);
				if (temp.success === 1) {
					//Delete selected elements from the allItems list
					// setAllItems(
					// 	allItems.filter((f) => !selectedItems.includes(f))
					// );

					let oldValues = allItems.filter((f) =>
						selectedItems.map((e) => e.id).includes(f.id)
					);

					let stayedValues = allItems.filter(
						(f) => !selectedItems.map((e) => e.id).includes(f.id)
					);

					console.log(oldValues);
					console.log(stayedValues);

					// setAllItems(
					// 	allItems.filter((f) => !selectedItems.includes(f))
					// );

					oldValues.forEach((item) => {
						item.status = "cancelled";
					});

					setAllItems([...oldValues, ...stayedValues]);
					// for (var sItem in selectedItems) {
					// 	let tempO = allItems;

					// 	tempO.forEach((item) => {
					// 		if (item.id === sItem.id) {
					// 			item.status = "cancelled";
					// 		}
					// 	});
					// 	setAllItems(tempO);
					// }

					//Show message
					Notification.info(
						`${selectedItems.length} item${
							selectedItems.length > 1 ? "s" : ""
						} cancelled.`
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

	function handleSanction(e) {
		let selectedIDs = selectedItems.map((e) => e.bookedBy).toString();

		axios
			.patch(
				`http://localhost:5000/sanction/${selectedIDs[0]}`,
				{ isBanned: true },
				{ withCredentials: true }
			)
			.then((res) => {
				if (res.data.success === 1) {
					handleClose(null, Notification.success(res.data.message));
				} else {
					handleClose(null, Notification.error(res.data.message));
				}
			})
			.catch((err) => console.log(err));
	}

	function getSeats() {
		var list = [];

		for (let i = 0; i < seats.length; i += 6) {
			// const element = seats[i];

			let temp1 = unAvSeats.find((f) => f.sID === seats[i].sID);
			let temp2 = unAvSeats.find((f) => f.sID === seats[i + 1].sID);
			let temp3 = unAvSeats.find((f) => f.sID === seats[i + 2].sID);
			let temp4 = unAvSeats.find((f) => f.sID === seats[i + 3].sID);
			let temp5 = unAvSeats.find((f) => f.sID === seats[i + 4].sID);
			let temp6 = unAvSeats.find((f) => f.sID === seats[i + 5].sID);

			list.push(
				<div className="seat_group">
					<div className="seat_left_line">
						<div
							className={
								temp1
									? "seat disabled"
									: selectedSeat === seats[i].sID
									? "seat selected"
									: "seat"
							}
							id={seats[i].sID}
							onClick={(e) => {
								if (!temp1) setSelectedSeat(seats[i].sID);
							}}
						>
							{seats[i].sLocation}
						</div>
						<div
							className={
								temp2
									? "seat disabled"
									: selectedSeat === seats[i + 1].sID
									? "seat selected"
									: "seat"
							}
							id={seats[i + 1].sID}
							onClick={(e) => {
								if (!temp2) setSelectedSeat(seats[i + 1].sID);
							}}
						>
							{seats[i + 1].sLocation}
						</div>
						<div
							className={
								temp3
									? "seat disabled"
									: selectedSeat === seats[i + 2].sID
									? "seat selected"
									: "seat"
							}
							id={seats[i + 2].sID}
							onClick={(e) => {
								if (!temp3) setSelectedSeat(seats[i + 2].sID);
							}}
						>
							{seats[i + 2].sLocation}
						</div>
					</div>

					<div className="seperator"></div>
					<div className="seat_right_line">
						<div
							className={
								temp4
									? "seat disabled"
									: selectedSeat === seats[i + 3].sID
									? "seat selected"
									: "seat"
							}
							id={seats[i + 3].sID}
							onClick={(e) => {
								if (!temp4) setSelectedSeat(seats[i + 3].sID);
							}}
						>
							{seats[i + 3].sLocation}
						</div>
						<div
							className={
								temp5
									? "seat disabled"
									: selectedSeat === seats[i + 4].sID
									? "seat selected"
									: "seat"
							}
							id={seats[i + 4].sID}
							onClick={(e) => {
								if (!temp5) setSelectedSeat(seats[i + 4].sID);
							}}
						>
							{seats[i + 4].sLocation}
						</div>
						<div
							className={
								temp6
									? "seat disabled"
									: selectedSeat === seats[i + 5].sID
									? "seat selected"
									: "seat"
							}
							id={seats[i + 5].sID}
							onClick={(e) => {
								if (!temp6) setSelectedSeat(seats[i + 5].sID);
							}}
						>
							{seats[i + 5].sLocation}
						</div>
					</div>
				</div>
			);
		}

		return list;
	}

	function getGroupSeats() {
		var list = [];

		for (let i = 0; i < gSeats.length; i++) {
			const element = gSeats[i];

			let temp = unAvgSeats.find((f) => f.sID === gSeats[i].sID);

			list.push(
				<div
					className={
						temp
							? "seat_group disabled"
							: selectedSeat === element.sID
							? "seat_group selected"
							: "seat_group"
					}
					onClick={(e) => {
						if (!temp) setSelectedSeat(element.sID);
					}}
				>
					<div className="seperator">{element.sLocation}</div>
				</div>
			);
		}

		return list;
	}

	function handleCreateAppointment(e) {
		let obj = {
			aStartTime: moment(selectedDate).format("yyyy-MM-DD HH:mm:ss"),
			aEndTime: moment(selectedDate)
				.add({ hours: duration })
				.format("yyyy-MM-DD HH:mm:ss"),
			uID: user.ID,
			sID: selectedSeat,
		};

		axios
			.post(`http://localhost:5000/appointments`, obj, {
				withCredentials: true,
			})
			.then((res) => {
				let temp = res.data;
				console.log(res);
				if (temp.success === 1) {
					handleClose(null, Notification.success(temp.message));
				} else {
					handleClose(null, Notification.error(temp.message));
				}
			})
			.catch((err) => console.log(err));
	}
	// function handleContinue() {
	// 	setShowNext(true);
	// }

	function handleEditAppointment(e) {
		e.preventDefault();

		let temp = selectedItems[0];
		console.log(temp);
		if (extend) {
			let newEnd = moment(
				temp.date + " " + temp.endTime,
				"DD-MM-yyyy HH:mm"
			)
				.add({ hours: duration })
				.format("yyyy-MM-DD HH:mm:ss");

			axios
				.patch(
					`http://localhost:5000/appointment/${temp.id}`,
					{
						aStartTime: moment(
							temp.date + " " + temp.startTime,
							"DD-MM-yyyy HH:mm"
						).format("yyyy-MM-DD HH:mm:ss"),
						aEndTime: newEnd,
						sID: temp.seatNumber,
						uID: user.ID,
					},
					{ withCredentials: true }
				)
				.then((res) => {
					if (res.data.success === 1) {
						handleClose(
							null,
							Notification.success(res.data.message)
						);
					} else {
						handleClose(null, Notification.error(res.data.message));
					}
				})
				.catch((err) => console.log(err));
		} else {
			let newEndd = moment(
				temp.date + " " + temp.endTime,
				"DD-MM-yyyy HH:mm"
			)
				.subtract({ hours: duration })
				.format("yyyy-MM-DD HH:mm:ss");

			axios
				.patch(
					`http://localhost:5000/appointment/${temp.id}`,
					{
						aStartTime: moment(
							temp.date + " " + temp.startTime,
							"DD-MM-yyyy HH:mm"
						).format("yyyy-MM-DD HH:mm:ss"),
						aEndTime: newEndd,
						sID: temp.seatNumber,
						uID: user.ID,
					},
					{ withCredentials: true }
				)
				.then((res) => {
					if (res.data.success === 1) {
						handleClose(
							null,
							Notification.success(res.data.message)
						);
					} else {
						handleClose(null, Notification.error(res.data.message));
					}
				})
				.catch((err) => console.log(err));
		}
	}

	return (
		<>
			<div className="Appointment">
				<h1>Appointment</h1>
				{!appointmentPage ? (
					<div className="table_area">
						{user.Type === "librarian" &&
							selectedItems.length <= 1 && (
								<div className="button_area">
									<button
										className="apply__button"
										onClick={handleSanction}
									>
										Apply a Sanction
									</button>
									<button
										className="delete__button"
										onClick={handleDelete}
									>
										Invalidate the Appointment
									</button>
								</div>
							)}
						{user.Type === "student" && (
							<div className="button_area">
								{user.isBanned === 1 && (
									<p>
										You cannot make a new appointment since
										you are banned.
									</p>
								)}
								<button
									className="create__button"
									onClick={(e) => setAppointmentPage(true)}
									disabled={
										allItems.find(
											(f) => f.status === "active"
										) || user.isBanned === 1
									}
								>
									Make an Appointment
								</button>

								{selectedItems &&
									selectedItems.find(
										(f) => f.status === "active"
									) && (
										<button
											className="edit__button"
											onClick={(e) => handleShow("edit")}
										>
											Change in Appointment
										</button>
									)}
								{selectedItems &&
									selectedItems.find(
										(f) => f.status === "active"
									) && (
										<button
											onClick={handleDelete}
											className="delete__button"
										>
											Cancel the Appointment
										</button>
									)}
							</div>
						)}
						{allItems.length > 0 && (
							<Table
								checkBox={true}
								search={user.Type === "librarian"}
								selectedItems={selectedItems}
								setSelectedItems={setSelectedItems}
								allItems={allItems}
								titles={Object.keys(allItems[0])}
								checkedClear={checkedClear}
								setCheckedClear={setCheckedClear}
							/>
						)}
					</div>
				) : (
					<div className="create_appointment_container">
						<button
							className="back"
							onClick={(e) => setAppointmentPage(false)}
						>
							<IoChevronBack /> <span>Back</span>
						</button>
						<Tabs>
							<TabList>
								<Tab>Library</Tab>
								<Tab>Group Work Areas</Tab>
							</TabList>

							<TabPanel>
								<div className="date__container">
									<DateTimePicker
										format="yyyy-MM-dd HH"
										clearIcon={null}
										onChange={setSelectedDate}
										value={selectedDate}
										minDate={new Date()}
										maxDate={moment(selectedDate)
											.add({
												months: 1,
											})
											.toDate()}
									/>
								</div>
								<div className="library_canvas">
									{seats && unAvSeats && getSeats()}
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
										format="yyyy-MM-dd HH"
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
						<form onSubmit={handleEditAppointment}>
							<div className="input__field">
								<select
									value={extend}
									onChange={(e) => setExtend(e.target.value)}
								>
									<option value={false}>
										Shorten the Appointment
									</option>
									<option value={true}>
										Extend the Appointment
									</option>
								</select>
							</div>
							<div className="input__field">
								Duration:{" "}
								<input
									type="number"
									min={1}
									max={6}
									// defaultValue={1}
									value={duration}
									onChange={(e) => {
										if (e.target.value) {
											if (e.target.value > 6) {
												setDuration(6);
											} else if (e.target.value < 1) {
												setDuration(1);
											} else {
												setDuration(e.target.value);
											}
										}
									}}
								/>
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
							// defaultValue={1}
							value={duration}
							onChange={(e) => {
								if (e.target.value) {
									if (e.target.value > 4) {
										setDuration(4);
									} else if (e.target.value < 1) {
										setDuration(1);
									} else {
										setDuration(e.target.value);
									}
								}
							}}
						/>
					</div>
					<button onClick={handleCreateAppointment}>Create</button>
				</Popup>
			)}
		</>
	);
}

export default Appointment;
