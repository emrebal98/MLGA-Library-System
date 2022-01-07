import React, { useState } from "react";
import { useNavigate /* Navigate, useLocation */ } from "react-router-dom";
// import useAuth from "../../useAuth";
import "./login.css";
import FormInput from "./FormInput";



function Login() {
	const [values, setValues] = useState({
	  email: "",
	  password: "",
	  confirmPassword: "",
	});
  
	const inputs = [

	  {
		id: 1,
		name: "email",
		type: "email",
		placeholder: "Email",
		errorMessage: "It should be a valid email address!",
		label: "Email",
		required: true,
	  },
	  {
		id: 2,
		name: "password",
		type: "password",
		placeholder: "Password",
		errorMessage:
		  "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
		label: "Password",
		pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
		required: true,
	  },
	  {
		id: 3,
		name: "confirmPassword",
		type: "password",
		placeholder: "Confirm Password",
		errorMessage: "Passwords don't match!",
		label: "Confirm Password",
		pattern: values.password,
		required: true,
	  },
	];
  
	const handleSubmit = (e) => {
	  e.preventDefault();
	};
  
	const onChange = (e) => {
	  setValues({ ...values, [e.target.name]: e.target.value });
	};
  
	return (
	  <div className="app">
		<form onSubmit={handleSubmit}>
		  <h1>Medipol Library System</h1>
		  {inputs.map((input) => (
			<FormInput
			  key={input.id}
			  {...input}
			  value={values[input.name]}
			  onChange={onChange}
			/>
		  ))}
		  <button>Login</button>
		</form>
	  </div>
	);
  };



/*

{
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

 */


export default Login;
