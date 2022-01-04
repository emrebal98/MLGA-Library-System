import React, { useState } from "react";
import { Search, Checkbox } from "../";
import "./table.css";

function Table({
	titles,
	allItems,
	checkBox = false,
	selectedItems,
	setSelectedItems,
}) {
	const [items, setItems] = useState(allItems);

	function handleChecked(state, item) {
		console.log(state);
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

	return (
		<>
			<Search activeSet={allItems} setItems={setItems} titles={titles} />

			<table className="table">
				<tr class="header">
					{checkBox && (
						<th className="center_selected">{selectedItems.length}</th>
					)}
					{titles.map((title) => (
						<th>
							{title
								.toString()
								.replace(/([A-Z])/g, " $1")
								.trim()
								.toUpperCase()}
						</th>
					))}
				</tr>

				{items.map((item) => (
					<tr>
						{checkBox && (
							<td>
								<Checkbox
									onChange={(state) =>
										handleChecked(state, item)
									}
								/>
								{/* <input
									type="checkbox"
									onClick={console.log("click")}
									onChange={(e) => handleChecked(e, item)}
								/> */}
							</td>
						)}
						{Object.keys(item).map((i) => (
							<td>{item[i]}</td>
						))}
					</tr>
				))}
			</table>
		</>
	);
}

export default Table;
