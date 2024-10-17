// controllers/fileController.js
import multer from "multer";
import {dirname} from "path";
import {fileURLToPath} from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, {recursive: true});
}

// multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({storage});

export const uploadFile = (req, res) => {
  console.log(req.file);
  res.status(200).json({message: "File uploaded successfully", file: req.file});
};

export const getFile = (req, res) => {
  const fileName = req.params.fileName;
  console.log(fileName);
  const filePath = path.join(__dirname, "../uploads", fileName);
  res.download(filePath);
};

// eelete File
export const deleteFile = (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../uploads", fileName);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({message: "Error deleting file", err});
    res.status(200).json({message: "File deleted successfully"});
  });
};
