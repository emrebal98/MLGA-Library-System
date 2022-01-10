import React, { useState, useEffect } from "react";
import { Table, Popup, Card } from "../../components";
import { Notification } from "../../helper/notfiy";
import axios from "axios";
import useAuth from "../../useAuth";
import "./jobs.css";

function Jobs() {
	// const randomTexts = Array.apply(null, Array(21)).map(function () {
	// 	return Array.apply(null, Array(~~(Math.random() * 10 + 3)))
	// 		.map(function () {
	// 			return String.fromCharCode(Math.random() * (123 - 97) + 97);
	// 		})
	// 		.join("");
	// });

	// const createRandomItems = () =>
	// 	randomTexts.map((item, index) => {
	// 		return {
	// 			id: index,
	// 			jobName: `${item} job`,
	// 			description: `${item} desc`,
	// 		};
	// 	});

	const [allItems, setAllItems] = useState([]);
	const [appliedJobs, setAppliedJobs] = useState();
	const [selectedItems, setSelectedItems] = useState([]);
	const [job, setJob] = useState({});
	const [show, setShow] = useState({
		create: false,
		edit: false,
	});
	const [checkedClear, setCheckedClear] = useState(false);
	const [users, setUsers] = useState([]);
	const [vUsers, setvUsers] = useState([]);
	// AUTH PART START
	const { user } = useAuth();
	// AUTH PART END

	//GET ITEMS
	useEffect(() => {
		axios
			.get("http://localhost:5000/job", { withCredentials: true })
			.then((res) => {
				let temp = res.data;
				// console.log(res.data);
				if (temp.length > 0) {
					setAllItems([]);
					for (let index = 0; index < temp.length; index++) {
						const element = temp[index];

						setAllItems((prevState) => [
							...prevState,
							{
								id: element.jID,
								jobName: element.jTitle,
								description: element.jDescription,
								availability: element.jAvailability,
							},
						]);
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
		axios
			.get(`http://localhost:5000/jobA/${user.ID}`, {
				withCredentials: true,
			})
			.then((res) => {
				let temp = res.data;
				// console.log(res.data);
				if (temp.length > 0) {
					setAppliedJobs([]);
					for (let index = 0; index < temp.length; index++) {
						const element = temp[index];

						setAppliedJobs((prevState) => [
							...prevState,
							element.jID,
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
			setJob({ ...getSelectedJob() });

			axios
				.get(`http://localhost:5000/job/${job.id}`, {
					withCredentials: true,
				})
				.then((res) => {
					let temp = res.data;
					if (temp) {
						let arr = temp.uIDs;
						setvUsers(users.filter((f) => arr.includes(f.ID)));
					}
				})
				.catch((err) => console.log(err));
		}
		if (type === "create") {
			setJob({ availability: true });
		}
	}

	const getSelectedJob = () => {
		if (selectedItems.length === 1) {
			let temp = JSON.parse(JSON.stringify(allItems));
			temp = temp.filter((f) => f.id === selectedItems[0].id)[0];
			// if (temp.availability !== 1) {
			// 	temp.returnTime = temp.availability;
			// 	temp.availability = 0;
			// }
			return temp;
		} else return false;
	};

	function handleClose(e) {
		setShow({
			create: false,
			edit: false,
			delete: false,
		});
	}

	//Creates the job
	function handleCreate(e) {
		e.preventDefault();

		axios
			.post(
				`http://localhost:5000/job/`,
				{
					jTitle: job.jobName,
					jDescription: job.description,
					jAvailability: job.availability,
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
						jobName: job.jobName,
						description: job.description,
						availability:
							job.availability === true || job.availability === 1
								? 1
								: 0,
					});

					setAllItems(tempO);
				} else {
					handleClose(null, Notification.error(res.data.message));
				}
			})
			.catch((err) => console.log(err));
	}

	//Edits the job
	function handleEdit(e) {
		e.preventDefault();

		axios
			.patch(
				`http://localhost:5000/job/${job.id}`,
				{
					jTitle: job.jobName,
					jDescription: job.description,
					jAvailability: job.availability,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				if (res.data.success === 1) {
					handleClose(null, Notification.success(res.data.message));
					let tempO = allItems;

					tempO.forEach((item) => {
						if (item.id === job.id) {
							item.jobName = job.jobName;
							item.description = job.description;
							item.availability =
								job.availability === true ||
								job.availability === 1
									? 1
									: 0;
						}
					});
					setAllItems(tempO);
				} else {
					handleClose(null, Notification.err(res.data.message));
				}
			})
			.catch((err) => console.log(err));
	}

	function handleDelete(e) {
		let selectedIDs = selectedItems.map((e) => e.id).toString();

		axios
			.delete(`http://localhost:5000/job/${selectedIDs}`, {
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

	//Apply for the job
	function handleApply(e) {
		axios
			.post(
				`http://localhost:5000/job/${e}`,
				{ uID: user.ID },
				{ withCredentials: true }
			)
			.then((res) => {
				let temp = res.data;

				if (temp.success === 1) {
					Notification.success("Job applied successfully");
					setAppliedJobs((prevState) => [...prevState, e]);
				} else Notification.error(temp.message);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<>
			<div className="jobs">
				<h1>Job Opportunities</h1>

				<div className="table_area">
					{user.Type === "librarian" && (
						<>
							<div className="button_area">
								<button
									className="create__button"
									onClick={(e) => handleShow("create")}
								>
									Create
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
										className="delete__button"
										onClick={handleDelete}
									>
										Delete
									</button>
								)}
							</div>
							{allItems.length > 0 && (
								<Table
									checkBox={true}
									search={false}
									selectedItems={selectedItems}
									setSelectedItems={setSelectedItems}
									allItems={allItems}
									titles={Object.keys(allItems[0])}
									checkedClear={checkedClear}
									setCheckedClear={setCheckedClear}
								/>
							)}
						</>
					)}
					{user.Type === "student" && (
						<div className="card__container">
							{allItems.length > 0 &&
								appliedJobs &&
								allItems
									.filter((f) => f.availability === 1)
									.map((item) => (
										<Card
											id={item.id}
											title={item.jobName}
											description={item.description}
											onApply={handleApply}
											disabled={
												appliedJobs.includes(item.id)
													? true
													: false
											}
										/>
									))}
						</div>
					)}
				</div>
			</div>
			{show.create && (
				<Popup close={handleClose}>
					<div className="form__container">
						<h1>Create New Job Posting</h1>
						<form onSubmit={handleCreate}>
							<div className="input__field">
								Job Name:
								<input
									type="text"
									name="name"
									value={job.jobName}
									onChange={(e) =>
										setJob((prevState) => {
											return {
												...prevState,
												jobName: e.target.value,
											};
										})
									}
								/>
							</div>
							<div className="input__field">
								Job Description:
								<textarea
									rows="4"
									cols="50"
									value={job.description}
									onChange={(e) =>
										setJob((prevState) => {
											return {
												...prevState,
												description: e.target.value,
											};
										})
									}
								></textarea>
							</div>
							<div className="input__field">
								<span>
									Available:{" "}
									<input
										type="checkbox"
										name="available"
										defaultChecked={
											job.availability === 1 ||
											job.availability === true
										}
										onChange={(e) =>
											setJob((prevState) => {
												return {
													...prevState,
													availability:
														e.target.checked,
												};
											})
										}
									/>
								</span>
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
						<h1>Edit Job Posting</h1>
						<form onSubmit={handleEdit}>
							<div className="input__field">
								Job Name:
								<input
									type="text"
									name="name"
									value={job.jobName}
									onChange={(e) =>
										setJob((prevState) => {
											return {
												...prevState,
												jobName: e.target.value,
											};
										})
									}
								/>
							</div>
							<div className="input__field">
								Job Description:
								<textarea
									rows="4"
									cols="50"
									value={job.description}
									onChange={(e) =>
										setJob((prevState) => {
											return {
												...prevState,
												description: e.target.value,
											};
										})
									}
								></textarea>
							</div>
							<div className="input__field">
								<span>
									Available:{" "}
									<input
										type="checkbox"
										name="available"
										defaultChecked={
											job.availability === 1 ||
											job.availability === true
										}
										onChange={(e) =>
											setJob((prevState) => {
												return {
													...prevState,
													availability:
														e.target.checked,
												};
											})
										}
									/>
								</span>
							</div>
							<div className="input__field">
								Applications
								<dl>
									{vUsers.map((item) => (
										<>
											<dd>
												{item.ID} - {item.Email}
											</dd>
										</>
									))}
								</dl>
								{/* 
								<ul>
									{users.map((item) => (
										<li>{item.Email}</li>
									))}
								</ul> */}
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

export default Jobs;
