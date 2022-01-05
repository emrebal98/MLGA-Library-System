import React, { useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import "./filter.css";

function Filter({ titles, filter, setFilter }) {
	const [show, setShow] = useState(false);

	/**
	 * Show or hide the drop down menu
	 */
	function handleShowFilter(e) {
		setShow(!show);
	}

	/**
	 * Sets the selected value
	 */
	function handleSelect(value) {
		setFilter(value);
	}

	return (
		<div className="select__box" onClick={handleShowFilter}>
			<p>
				{filter
					.replace(/([A-Z])/g, " $1")
					.trim()
					.toUpperCase()}
				{!show ? (
					<BiChevronDown className="select__box__icon" />
				) : (
					<BiChevronUp className="select__box__icon" />
				)}
			</p>

			<div
				className={
					show ? "select__box__list show" : "select__box__list"
				}
			>
				<ul>
					{titles.map(
						(f, index) =>
							f !== "id" && (
								<li
									key={index}
									onClick={(e) => handleSelect(f)}
								>
									{f
										.replace(/([A-Z])/g, " $1")
										.trim()
										.toUpperCase()}
								</li>
							)
					)}
				</ul>
			</div>
		</div>
	);
}

export default Filter;
