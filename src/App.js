import * as React from "react";
import { Routes, Route /*Navigate*/, useLocation } from "react-router-dom";
// import useAuth, { AuthProvider } from "./useAuth";
import {
	Login,
	Home,
	Appointment,
	LibraryDatabase,
	Computers,
	Jobs,
} from "./containers";
import { Navbar } from "./components";
import "./app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//!BACKEND
// function RequireAuth({ children }) {
// 	const { authed } = useAuth();
// 	const location = useLocation();

// 	return authed === true ? children : <Navigate to="/" replace state={{ path: location.pathname }} />;
// }

export default function App() {
	const location = useLocation();
	console.log(location);
	return (
		// <AuthProvider>
		<>
			{location.pathname !== "/" && <Navbar />}
			<section
				class={
					location.pathname === "/" ? "login-section" : "home-section"
				}
			>
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
				<ToastContainer />
			</section>
			{/* </AuthProvider> */}
		</>
	);
}
