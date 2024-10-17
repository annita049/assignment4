// controllers/studentController.js
import Student from "../models/studentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {SECRET_KEY, TOKEN_EXPIRATION} from "../config/config.js";

// Student Registration
export const registerStudent = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({name, email, password: hashedPassword});
        await newStudent.save();
        res.status(201).json({message: "Student registered successfully"});
    } catch (error) {
        res.status(500).json({message: "Error registering student", error});
    }
};

// Student Login
export const loginStudent = async (req, res) => {
  const {email, password} = req.body;

  try {
    const student = await Student.findOne({email});
    if (!student) return res.status(404).json({message: "Student not found"});

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid)
      return res.status(401).json({message: "Invalid credentials"});

    const token = jwt.sign(
      {id: student._id, email: student.email},
        SECRET_KEY,
      {
        expiresIn: TOKEN_EXPIRATION,
      }
    );

    res
      .cookie("token", token, {httpOnly: true})
      .status(200)
      .json({message: "Login successful"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Error logging in", error});
  }
};

// Read Profile
export const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({message: "Error fetching profile", error});
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  const {name, email} = req.body;

  try {
    const student = await Student.findByIdAndUpdate(
      req.student.id,
      {name, email},
      {new: true}
    );
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({message: "Error updating profile", error});
  }
};
