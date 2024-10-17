import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../config/config.js";

const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({message: "Access denied. unauthorized"});

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.student = decoded;
    next();
  } catch (error) {
    res.status(401).json({message: "Access denied. unauthorized"});
  }
};

export default auth;
