import { toast } from "react-toastify";

const options = { autoClose: 3000 };

const Notification = {
	success: Success,
	error: Error,
	info: Info,
	warning: Warning,
};

function Success(message) {
	toast.success(message, options);
}

function Info(message) {
	toast.info(message, options);
}

function Warning(message) {
	toast.warning(message, options);
}

function Error(message) {
	toast.error(message, options);
}

export { Notification };
