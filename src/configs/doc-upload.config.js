const MULTER = require("multer");
const fileFormatArr = ['pdf','txt','jpg','jpeg','png', 'xlsx', 'xls', 'doc', 'docx'];

const getExtension = (fileName) => {
  const arr = fileName.split('.');
  return arr[arr.length - 1];
}

//Configuration for Multer
const multerStorage = MULTER.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/files");
    },
    filename: (req, file, cb) => {  
      const ext = getExtension(file.originalname);
      cb(null, `${file.originalname}-${Date.now()}.${ext}`);
    },
  });

  const isExtAllowed = (ext) => {
    return fileFormatArr.some((format)=> format === ext )
  }
  
  const multerFilter = (req, file, cb) => {
    if(isExtAllowed(getExtension(file.originalname) )){

    // }
    // if (file.mimetype.split("/")[1] === "pdf") {
      cb(null, true);
    } else {
      cb(new Error("Extension not allowed!!"), false);
    }
  };
  
  //Calling the "multer" Function
  const upload = MULTER({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  module.exports = upload;
