const DOC_COLLECTION = require("mongoose").model("File");

module.exports = {
  uploadFile: (req, res) => {
    const fileExt = req.file.originalname.split('.');
    try {
      DOC_COLLECTION.create({
        name: req.file.originalname,
        createdBy: req.session.LOGIN_USER._id,
        filename: req.file.filename,
        ext: fileExt[req.file.length - 1],
        size: req.file.size,
        destination: req.file.destination,
        mimetype: req.file.mimetype,
        path: req.file.path
      }).then((file) => {
        res.status(200).json({
          status: "success",
          message: "File created successfully!!",
          data: file
        });
      });
    } catch (error) {
      res.json({
        isError: true,
        data: error.message,
      });
    }
  },
  getFile: (req, res) => {
    try {
      DOC_COLLECTION.find()
      .then((doc) => {
        res.send({
          isError: false,
          message: "",
          data: doc,
        });
      })
    } catch (error) {
      res.status(500).json({
        isError: true,
        message: "Internal server error",
        data: error.message,
      });
    }
  }
};
