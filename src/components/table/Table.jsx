import React, { useState, useEffect } from "react";
import { Search, Checkbox } from "../";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./table.css";

function Table({
	titles,
	allItems,
	checkBox = false,
	selectedItems,
	setSelectedItems,
	search = true,
	checkedClear,
	setCheckedClear,
}) {
	const increment = 10;
	const [items, setItems] = useState(allItems);
	const [page, setPage] = useState({ start: 0, end: 10 });
	const [disable, setDisable] = useState(
		allItems.length > increment
			? { left: true, right: false }
			: { left: true, right: true }
	);
	const [onSearch, setOnSearch] = useState(false);

	useEffect(() => {
		setItems(allItems);
		if (allItems.length > increment)
			setDisable({ left: true, right: false });
		else setDisable({ left: true, right: true });
	}, [allItems]);

	function handleChecked(state, item) {
		let check = state;
		if (check === true) {
			//add the selected item to the selected array
			setSelectedItems([...selectedItems, item]);
		} else {
			//remove the selected item from the selected array
			let remoevedArr = selectedItems.filter((f) => f !== item);
			setSelectedItems(remoevedArr);
		}
	}

	function handlePreviousPage(e) {
		//If button disable do not click
		if (disable.left) return;
		//Clear selected items if any
		setSelectedItems([]);
		setCheckedClear((prevState) => !prevState);
		let startN = page.start - increment;
		let endN = page.end - increment;
		if (startN < 0) return;
		setPage({ start: startN, end: endN });
		//Activate the next button if it is not the last page
		if (endN < items.length)
			setDisable((prevState) => {
				return { left: prevState.left, right: false };
			});
		//Disable the previous button if it is the first page
		if (startN < increment)
			setDisable((prevState) => {
				return {
					right: prevState.right,
					left: true,
				};
			});
	}

	function handleNextPage(e) {
		//If button disable do not click
		if (disable.right) return;
		//Clear selected items if any
		setSelectedItems([]);
		setCheckedClear((prevState) => !prevState);
		let startN = page.start + increment;
		let endN = page.end + increment;
		if (endN - items.length >= increment) return;
		setPage({ start: startN, end: endN });
		//Activate the previous button if it is not the firt page
		if (startN >= increment)
			setDisable((prevState) => {
				return {
					right: prevState.right,
					left: false,
				};
			});
		//Disable the next button if it is the last page
		if (endN >= items.length)
			setDisable((prevState) => {
				return { left: prevState.left, right: true };
			});
	}

	function handleOnSearch(search) {
		if (search !== "") {
			setOnSearch(true);
			//Disable page button while searching
			setDisable({ left: true, right: true });
			//Clear selected items if any
			setSelectedItems([]);
			setCheckedClear(!checkedClear);
		} else {
			setOnSearch(false);
			//If left on first page before search
			if (page.start === 0) setDisable({ left: true, right: false });
			//If left on between page before search
			else if (page.end >= allItems.length)
				setDisable({ left: false, right: true });
			//If left on last page before search
			else setDisable({ left: false, right: false });
		}
	}

	return (
		<>
			{search && (
				<Search
					activeSet={allItems}
					setItems={setItems}
					titles={titles}
					onSearch={handleOnSearch}
				/>
			)}
			<div className="pagination">
				<p className="pagination_label">
					{onSearch ? 0 : page.start}-
					{onSearch ? items.length : page.end} of {allItems.length}
				</p>
				<div
					className={
						disable.left
							? "pagination__button disabled"
							: "pagination__button"
					}
					onClick={handlePreviousPage}
				>
					<IoIosArrowBack />
				</div>
				<div
					className={
						disable.right
							? "pagination__button disabled"
							: "pagination__button"
					}
					onClick={handleNextPage}
				>
					<IoIosArrowForward />
				</div>
			</div>
			<div className="table_container">
				<table className="table">
					<tr class="header">
						{checkBox && (
							<th className="center_selected">
								{selectedItems.length}
							</th>
						)}
						{titles.map(
							(title) =>
								title !== "id" && (
									<th>
										{title
											.toString()
											.replace(/([A-Z])/g, " $1")
											.trim()
											.toUpperCase()}
									</th>
								)
						)}
					</tr>

					{onSearch
						? items.map((item) => (
								<tr>
									{checkBox && (
										<td>
											<Checkbox
												onChange={(state) =>
													handleChecked(state, item)
												}
												value={checkedClear}
											/>
										</td>
									)}
									{Object.keys(item).map(
										(i) => i !== "id" && <td>{item[i]}</td>
									)}
								</tr>
						  ))
						: items.slice(page.start, page.end).map((item) => (
								<tr>
									{checkBox && (
										<td>
											<Checkbox
												onChange={(state) =>
													handleChecked(state, item)
												}
												value={checkedClear}
											/>
										</td>
									)}
									{Object.keys(item).map(
										(i) => i !== "id" && <td>{item[i]}</td>
									)}
								</tr>
						  ))}
				</table>
			</div>
		</>
	);
}

export default Table;
