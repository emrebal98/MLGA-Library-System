//* auth
export { default as Login } from "./auth/login.js";
export { default as Register } from "./auth/register.js";
export { default as IsLoggedIn } from "./auth/isLoggedIn.js";
export { default as Logout } from "./auth/logout.js";
export { BanUser, WarnUser } from "./auth/applySanction.js";
export { default as GetUsers } from "./auth/getUsers.js";
//* book
export { default as AddBook } from "./book/addBook.js";
export { GetBooks, GetBook } from "./book/getBooks.js";
export { default as UpdateBook } from "./book/updateBook.js";
export { default as DeleteBook } from "./book/deleteBook.js";
//* job
export { default as AddJob } from "./job/addJob.js";
export { GetJob, GetJobs, GetJobsByUserId } from "./job/getJobs.js";
export { default as UpdateJob } from "./job/updateJob.js";
export { default as DeleteJob } from "./job/deleteJob.js";
export { default as ApplyJob } from "./job/applyJob.js";
//* computer
export { default as AddComputer } from "./computer/addComputer.js";
export { GetComputer, GetComputers } from "./computer/getComputers.js";
export { default as UpdateComputer } from "./computer/updateComputer.js";
export { default as DeleteComputer } from "./computer/deleteComputer.js";
//* appointment
export { default as AddAppointment } from "./appointment/addAppointment.js";
export { GetAppointment, GetAppointments, PastedAppointmentsUpdate, GetAllAppointments } from "./appointment/getAppointments.js";
export { default as UpdateAppointment } from "./appointment/updateAppointment.js";
export { default as CancelAppointment } from "./appointment/cancelAppointment.js";
//* seats
export { GetSeats ,GetUnavailableSeats} from "./seat/getSeats.js";