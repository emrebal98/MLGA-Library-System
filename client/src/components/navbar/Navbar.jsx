import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import {
	BiGridAlt,
	BiBookAlt,
	BiLayer,
	BiLaptop,
	BiStation,
	BiSend,
	BiLogOut,
	BiMenu,
	BiMenuAltRight,
} from "react-icons/bi";
import useAuth from "../../useAuth";
import "./navbar.css";

function Navbar() {
	const { logout, auth } = useAuth();

	const [open, setOpen] = useState(false);

	const [user, setUser] = useState({});

	function toggleMenu(e) {
		setOpen(!open);
	}

	function handleLogout() {
		logout();
	}

	useEffect(() => {
		auth().then((v) => {
			setUser(v["user"]);
		});
	}, [auth]);

	function Capitalize(str) {
		if (str) return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return (
		<IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
			<div className={open ? "sidebar open" : "sidebar"}>
				<div className="logo-details">
					<div className="r-icon icon">
						<BiBookAlt />
					</div>
					<div className="logo_name">MAKE LIBRARIES GREAT AGAIN</div>
					<div className="r-icon" id="btn" onClick={toggleMenu}>
						{!open ? <BiMenu /> : <BiMenuAltRight />}
					</div>
				</div>
				<ul className="nav-list">
					<li>
						<Link to="/home">
							<div className="r-icon">
								<BiGridAlt />
							</div>
							<span className="links_name">Home</span>
						</Link>
						<span className="tooltip">Home</span>
					</li>
					<li>
						<Link to="/appointment">
							<div className="r-icon">
								<BiSend />
							</div>
							<span className="links_name">Appointment</span>
						</Link>
						<span className="tooltip">Appointment</span>
					</li>
					<li>
						<Link to="/database">
							<div className="r-icon">
								<BiLayer />
							</div>
							<span className="links_name">Library Database</span>
						</Link>
						<span className="tooltip">Library Database</span>
					</li>
					<li>
						<Link to="/computers">
							<div className="r-icon">
								<BiLaptop />
							</div>
							<span className="links_name">Computers</span>
						</Link>
						<span className="tooltip">Computers</span>
					</li>
					<li>
						<Link to="/jobs">
							<div className="r-icon">
								<BiStation />
							</div>
							<span className="links_name">
								Job Opportunities
							</span>
						</Link>
						<span className="tooltip">Job Opportunities</span>
					</li>

					<li className="profile">
						<div className="profile-details">
							<div className="name_job">
								<div className="name">{user.FullName ? user.FullName : "-"}</div>
								<div className="job">
									{Capitalize(user.Type)}
								</div>
							</div>
						</div>

						<div
							className="r-icon"
							id="log_out"
							onClick={handleLogout}
						>
							<BiLogOut />
						</div>
					</li>
				</ul>
			</div>
		</IconContext.Provider>
	);
}

export default Navbar;
