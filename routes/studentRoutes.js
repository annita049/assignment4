// routes/studentRoutes.js
import express from "express";
import { registerStudent,loginStudent,getProfile,updateProfile} from "../app/controllers/studentController.js";
import {uploadFile,getFile,deleteFile,upload} from "../app/controllers/fileController.js";
import auth from "../app/middlewares/auth.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);

router.post("/upload", auth, upload.single("file"), uploadFile);
router.get("/file/:fileName", auth, getFile);
router.delete("/file/:fileName", auth, deleteFile);

export default router;
