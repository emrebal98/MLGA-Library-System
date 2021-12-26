import React from "react";
import "./jobs.css";

function Jobs() {

	function handleButton() {
		alert("test")
	}
	return <div>
		JOBS
		<button onClick={handleButton}>TEST</button>
	</div>;
}

export default Jobs;