import React, { useState, useEffect } from "react";
import { BsCheck } from "react-icons/bs";
import "./checkbox.css";

function Checkbox({ onChange, value }) {
	const [checked, setChecked] = useState(false);

	function handleClick(e) {
		if (checked) {
			setChecked(false);
			onChange(false);
		} else {
			setChecked(true);
			onChange(true);
		}
		// setChecked(!checked);
	}

	useEffect(() => {
		setChecked(false);
	}, [value]);

	return (
		<div className="check_box" onClick={handleClick}>
			{checked && <BsCheck className="check_box__icon" />}
		</div>
	);
}

export default Checkbox;
