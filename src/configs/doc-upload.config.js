const MULTER = require("multer");

//Configuration for Multer
const multerStorage = MULTER.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/files");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.originalname}-${Date.now()}.${ext}`);
    },
  });
  
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  };
  
  //Calling the "multer" Function
  const upload = MULTER({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  module.exports = upload;
