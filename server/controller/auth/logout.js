//Logout Function
async function Logout(req, res) {
	res.cookie("jwt", "logout", {
		expires: new Date(Date.now() + 0 * 1000),
		httpOnly: true,
	});
	res.status(200).json({ auth: 0, message: "Logout successful." });
}

export default Logout;
