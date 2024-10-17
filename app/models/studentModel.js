// models/studentModel.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    profilePic: {type: String},
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
