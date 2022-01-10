import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
	connectionLimit: 8,
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASS ? process.env.PASS : null,
	database: process.env.DATABASE,
	port: 3306,
	debug: false,    
});

pool.getConnection((err, connection) => {
	return new Promise((resolve, reject) => {
		if (err) {
			if (err.code === "PROTOCOL_CONNECTION_LOST") {
				reject("Database connection was closed.");
			}
			if (err.code === "ER_CON_COUNT_ERROR") {
				reject("Database has too many connections.");
			}
			if (err.code === "ECONNREFUSED") {
				reject("Database connection was refused.");
			}
		}
		if (connection) {
			connection.release();
			console.log("Connected to mysql database. ");
		}
		resolve();
	});
});

export default pool;
