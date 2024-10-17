import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import studentRoutes from "./routes/studentRoutes.js";
import dotenv from "dotenv";
import {PORT, DB_URL} from "./app/config/config.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", studentRoutes);

mongoose
  .connect(DB_URL)
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error connecting to database", err));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
