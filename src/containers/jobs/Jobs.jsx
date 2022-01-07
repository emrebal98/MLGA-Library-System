import React, { useState } from "react";
import { Table, Popup, Card } from "../../components";
import { Notification } from "../../helper/notfiy";
import "./jobs.css";

function Jobs() {
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
				jobName: `${item} job`,
				description: `${item} desc`,
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

	function handleApply(e) {
		Notification.success("Job applied successfully");
	}

	return (
		<>
			<div className="jobs">
				<h1>Job Opportunities</h1>

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
						</>
					)}
					{!user && (
						<div className="card__container">
							{Array.apply(null, Array(21)).map((item) => (
								<Card
									title={"Test title"}
									description={
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum dicta rerum delectus eos eligendi, in quos magni, iste corporis, quidem ut tempora? Blanditiis dolores cupiditate sit quam, voluptate atque sunt?Cum, dolore vitae magni quam dicta ullam enim corporis reiciendis accusamus impedit similique optio sit numquam distinctio eum quia fugiat velit natus fuga tempora recusandae rerum voluptas illo nemo? Repellat."
									}
									onApply={handleApply}
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
						<form>
							<div className="input__field">
								Job Name:
								<input type="text" name="name" />
							</div>
							<div className="input__field">
								Job Description:
								<textarea rows="4" cols="50"></textarea>
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
						<form>
							<div className="input__field">
								Job Name:
								<input type="text" name="name" />
							</div>
							<div className="input__field">
								Job Description:
								<textarea rows="4" cols="50"></textarea>
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
