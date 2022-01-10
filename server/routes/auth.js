import { Router } from "express";
import {
	IsLoggedIn,
	Login,
	Logout,
	Register,
	AddBook,
	GetBooks,
	GetBook,
	UpdateBook,
	DeleteBook,
	AddComputer,
	GetComputer,
	GetComputers,
	DeleteComputer,
	UpdateComputer,
	GetJobs,
	AddJob,
	ApplyJob,
	GetJob,
	UpdateJob,
	DeleteJob,
	GetAppointments,
	AddAppointment,
	GetAppointment,
	UpdateAppointment,
	CancelAppointment,
	BanUser,
	WarnUser,
	GetJobsByUserId,
	GetUsers,
	GetSeats,
	GetUnavailableSeats,
	PastedAppointmentsUpdate,
	GetAllAppointments,
} from "../controller/index.js";

const router = Router();

//* user routes
router.post("/login", Login);
router.post("/register", Register);
router.get("/auth", IsLoggedIn, (req, res) => res.json({ auth: 1, user: req.user }));
router.get("/logout", Logout);
router.route("/sanction/:id").patch(IsLoggedIn, BanUser).post(IsLoggedIn, WarnUser);
router.get("/user",IsLoggedIn,GetUsers);

//* book routes
router.route("/book").get(IsLoggedIn, GetBooks).post(IsLoggedIn, AddBook);
router.route("/book/:id").get(IsLoggedIn, GetBook).patch(IsLoggedIn, UpdateBook).delete(IsLoggedIn, DeleteBook);

//* job routes
router.route("/job").get(IsLoggedIn, GetJobs).post(IsLoggedIn, AddJob);
router.route("/jobA/:id").get(IsLoggedIn,GetJobsByUserId);
router.route("/job/:id").get(IsLoggedIn, GetJob).patch(IsLoggedIn, UpdateJob).delete(IsLoggedIn, DeleteJob).post(IsLoggedIn, ApplyJob);

//* computer routes
router.route("/computer").get(IsLoggedIn, GetComputers).post(IsLoggedIn, AddComputer);
router.route("/computer/:id").get(IsLoggedIn, GetComputer).patch(IsLoggedIn, UpdateComputer).delete(IsLoggedIn, DeleteComputer);

//* appointment routes
router.route("/appointments").get( IsLoggedIn, GetAllAppointments).post(IsLoggedIn, AddAppointment);
router.route("/appointments/:id").get(IsLoggedIn, GetAppointments).patch(IsLoggedIn,PastedAppointmentsUpdate);
router.route("/appointment/:id").get(IsLoggedIn, GetAppointment).patch(IsLoggedIn, UpdateAppointment).delete(IsLoggedIn, CancelAppointment);


//* seat routes
router.route("/seat/:id").get(IsLoggedIn,GetSeats);
router.route("/seatUn/:id").post(IsLoggedIn,GetUnavailableSeats);
export default router;
