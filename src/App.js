import * as React from "react";
import { Link, Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
// import useAuth, { AuthProvider } from "./useAuth";
import { Login, Home, Appointment, LibraryDatabase, Computers, Jobs } from "./containers";

//! Temporary code START

function Nav() {
	// const { authed, logout } = useAuth();
	const navigate = useNavigate();

	// const handleLogout = () => {
	// 	// logout();
	// 	navigate("/");
	// };

	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Login</Link>
				</li>

				<li>
					<Link to="/home">Home</Link>
				</li>
				<li>
					<Link to="/appointment">Appointment</Link>
				</li>
				<li>
					<Link to="/database">Library Database</Link>
				</li>
				<li>
					<Link to="/computers">Computers</Link>
				</li>
				<li>
					<Link to="/jobs">Jobs</Link>
				</li>
			</ul>
			{/* {authed && <button onClick={handleLogout}>Logout</button>} */}
		</nav>
	);
}
//! Temporary code END

// function RequireAuth({ children }) {
// 	const { authed } = useAuth();
// 	const location = useLocation();

// 	return authed === true ? children : <Navigate to="/" replace state={{ path: location.pathname }} />;
// }

export default function App() {
	return (
		// <AuthProvider>
		<>
			<Nav />

			<Routes>
				<Route path="/" element={<Login />} />

				<Route
					path="/home"
					element={
						// 	<RequireAuth>
						<Home />
						//  <RequireAuth>
					}
				/>
				<Route
					path="/appointment"
					element={
						// <RequireAuth>
						<Appointment />
						// <RequireAuth>
					}
				/>
				<Route
					path="/database"
					element={
						// <RequireAuth>
						<LibraryDatabase />
						// <RequireAuth>
					}
				/>
				<Route
					path="/computers"
					element={
						// <RequireAuth>
						<Computers />
						// <RequireAuth>
					}
				/>
				<Route
					path="/jobs"
					element={
						// <RequireAuth>
						<Jobs />
						// <RequireAuth>
					}
				/>
			</Routes>
		{/* </AuthProvider> */}
		</>
	);
}
