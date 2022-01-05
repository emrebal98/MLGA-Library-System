import React from "react";
import { IoMdClose } from "react-icons/io";
import "./popup.css";

function Popup({ children, close }) {
	return (
		<div className="popup_container">
			<div className="popup">
				{children}
				<div className="close_button" onClick={close}>
					<IoMdClose />
				</div>
			</div>
		</div>
	);
}

export default Popup;
