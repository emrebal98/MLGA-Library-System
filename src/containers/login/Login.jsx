import React, { useState } from "react";
import { useNavigate /* Navigate, useLocation */ } from "react-router-dom";
// import useAuth from "../../useAuth";
import "./login.css";

function Login() {
	const navigate = useNavigate();
	// const { authed, login } = useAuth();
	// const { state } = useLocation();
	const [inputs, setInputs] = useState({});
	const [error, setError] = useState();

	//Handle change function for the form inputs
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		//Set typed values to inputs state
		setInputs((prevValues) => ({ ...prevValues, [name]: value }));
	};

	//If user already logged in navigate to dashboard or state
	// if (authed) {
	// 	return <Navigate to={state?.path || "/home"} />;
	// }

	//Handle login function for Login button
	const handleLogin = (e) => {
		e.preventDefault();
		//?TEMP
		setError("Waiting for backend");
		navigate("/home");
		//Login auth
		// login(inputs.username, inputs.password)
		// 	.then((res) => {
		// 		//TODO: delete console log
		// 		console.log(res);
		// 		navigate(state?.path || "/home");
		// 	})
		// 	.catch((err) => {
		// 		setError(err.message);
		// 		console.error(err);
		// 	});
	};

	//Render
	return (
		<div>
			<h1>Login (Public)</h1>
			<p style={{ color: "red" }}>{error}</p>
			<form onSubmit={handleLogin}>
				<label>
					Username
					<input
						type="text"
						name="username"
						value={inputs.username || ""}
						onChange={handleChange}
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						name="password"
						value={inputs.password || ""}
						onChange={handleChange}
					/>
				</label>
				<input type="submit" value="Login" />
			</form>
		</div>
	);
}

export default Login;
