import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Auth } from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/", Auth);

app.listen(port, () => console.log(`Server is runnning on port: ${port}`));
