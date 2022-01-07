import React, { useState } from "react";
import { RiComputerLine } from "react-icons/ri";
import "./computers.css";

function Computers() {
	const [computers, setComputers] = useState([
		{
			cID: 1,
			cLocation: "Computer 1",
			cAvailability: 1,
		},
		{
			cID: 2,
			cLocation: "Computer 2",
			cAvailability: 1,
		},
		{
			cID: 3,
			cLocation: "Computer 2",
			cAvailability: 1,
		},
		{
			cID: 4,
			cLocation: "Computer 2",
			cAvailability: 0,
		},
		{
			cID: 5,
			cLocation: "Computer 1",
			cAvailability: 0,
		},
		{
			cID: 6,
			cLocation: "Computer 2",
			cAvailability: 0,
		},
		{
			cID: 7,
			cLocation: "Computer 2",
			cAvailability: 0,
		},
		{
			cID: 8,
			cLocation: "Computer 2",
			cAvailability: 1,
		},
	]);

	return (
		<div className="computers">
			<h1>Computers</h1>

			<div className="computer__container">
				{computers.map((item) => (
					<div
						className={
							item.cAvailability === 1
								? "computer"
								: "computer disabled"
						}
					>
						<div className="img">
							<RiComputerLine />
						</div>
						<div className="title">{item.cID}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Computers;
