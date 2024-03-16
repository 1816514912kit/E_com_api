import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  fileName: (req, file, cb) => {
    cb(null, new Date().toISOString + file.originalname);
  },
});

export const upload = multer({ storage: storage });
