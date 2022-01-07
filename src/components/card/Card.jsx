import React, { useState } from "react";
import { Popup } from "../";
import "./card.css";

function Card({ title, description, onApply = () => {} }) {
	const [show, setShow] = useState(false);

	function handleClick(e) {
		setShow(true);
	}

	function handleYes(e) {
        setShow(false);
		onApply();
	}

	function handleNo(e) {
		setShow(false);
	}

	return (
		<div className="card">
			<div className="title">{title}</div>
			<div className="description">
				<p>{description}</p>
			</div>

			<div className="apply_button__container">
				<button className="apply_button" onClick={handleClick}>
					Apply
				</button>
			</div>

			{show && (
				<div className="confirm_dialog_container">
					<div className="confirm_dialog">
						<h1>Do you want to apply for the job posting?</h1>
						<div className="button_container">
							<button onClick={handleYes}>Yes</button>
							<button onClick={handleNo}>No</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Card;
