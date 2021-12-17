import React, { useEffect } from "react";
import axios from "axios";
const authContext = React.createContext();

function useAuth() {
	const [authed, setAuthed] = React.useState(() => {
		//Check localStorage for user logged in or not
		const stillAuth = localStorage.getItem("auth");
		return stillAuth ? true : false;
	});

	useEffect(() => {
		//Check server for user logged in or not
		return axios
			.get("http://localhost:5000/auth", { withCredentials: true })
			.then((res) => {
				//If user has auth setAuthed state to true and save the state in localStorage
				if (res.data.auth === 1) {
					setAuthed(true);
					localStorage.setItem("auth", res.data);
				}
			})
			.catch((err) => {
				//If user does not auth setAuthed state to false and clear localStorage
				if (err.response.status === 401) {
					setAuthed(false);
					localStorage.clear();
				}
			});
	}, []);

	return {
		authed,
		login(id, pass) {
			//Login handle with server
			return new Promise(function (resolve, reject) {
				axios
					.post("http://localhost:5000/login", { username: id, password: pass }, { withCredentials: true })
					.then((res) => {
						//If user has auth setAuthed state to true and save the state in localStorage
						if (res.data.auth === 1) {
							setAuthed(true);
							localStorage.setItem("auth", res.data);
							resolve(res.data);
						} else {
							reject(res.data);
						}
					})
					.catch((err) => {
						console.error(err);
					});
			});
		},
		logout() {
			//Logout handle with server
			return axios
				.get("http://localhost:5000/logout", { withCredentials: true })
				.then((res) => {
					//If user does not auth setAuthed state to false and clear localStorage
					if (res.data.auth === 0) {
						setAuthed(false);
						localStorage.clear();
					}
				})
				.catch((err) => console.log(err.response.status));
		},
	};
}

export function AuthProvider({ children }) {
	const auth = useAuth();

	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
	const context = React.useContext(authContext);
	if (context === undefined) {
		throw new Error("useAuthState must be used within a AuthProvider");
	}
	return context;
}
