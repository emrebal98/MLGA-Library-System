import React, { useState, useEffect } from "react";
import { RiComputerLine } from "react-icons/ri";
import axios from "axios";
import "./computers.css";

function Computers() {
	const [computers, setComputers] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/computer", { withCredentials: true })
			.then((res) => {
				setComputers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [computers]);

	return (
		<div className="computers">
			<h1>Computers</h1>

			<div className="computer__container">
				{computers &&
					computers.map((item) => (
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
