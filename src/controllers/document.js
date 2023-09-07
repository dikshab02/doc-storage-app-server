const DOC_COLLECTION = require("mongoose").model("File");
const fs = require("fs");
const https = require("https");
const path = require("path");

function removeFile(pathToFile) {
  fs.unlink(pathToFile, function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Successfully deleted the file.");
    }
  });
}

module.exports = {
  uploadFile: (req, res) => {
    const fileNameSplit = req.file.originalname.split(".");
    try {
      DOC_COLLECTION.create({
        name: req.file.originalname,
        createdBy: req.session.LOGIN_USER._id,
        filename: req.file.filename,
        ext: fileNameSplit[fileNameSplit.length - 1],
        size: req.file.size,
        destination: req.file.destination,
        mimetype: req.file.mimetype,
        path: req.file.path,
        description: req.body.description,
      }).then((file) => {
        res.status(200).json({
          status: "success",
          message: "File created successfully!!",
          data: file,
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
    const userId = req.session.LOGIN_USER._id;
    try {
      DOC_COLLECTION.find({createdBy:userId}).then((doc) => {
        res.send({
          isError: false,
          message: "",
          data: doc,
        });
      });
    } catch (error) {
      res.status(500).json({
        isError: true,
        message: "Internal server error",
        data: error.message,
      });
    }
  },
  deleteFile: (req, res) => {
    const docId = req.params.docId;

    try {
      DOC_COLLECTION.findById(docId)
        .then((doc) => {
          if (!doc) {
            return res.status(404).json({
              isError: true,
              message: "document not found",
              data: doc,
            });
          }
          DOC_COLLECTION.findByIdAndRemove(docId).then((document) => {
            const path = document.path;
            removeFile(path);
            res.json({
              isError: false,
              message: "document has been deleted successfully",
              data: document,
            });
          });
        })
        .catch((error) => {
          res.status(500).json({
            isError: true,
            message: "Failed to delete the document",
            data: error.message,
          });
        });
    } catch (error) {
      res.status(500).json({
        isError: true,
        message: "Internal server error",
        data: error.message,
      });
    }
  },
  getDocumentById: (req, res) => {
    const docId = req.params.docId;
    try {
      DOC_COLLECTION.findById(docId)
        .then((doc) => {
          res.send({
            isError: false,
            data: doc,
          });
        })
        .catch((error) => {
          res.status(400).send({
            isError: true,
            data: error,
          });
        });
    } catch (error) {
      res.status(500).send({
        isError: true,
        data: "Internal server error",
        data: error,
      });
    }
  },
  downloadFile: (req, res) => {
    const docId = req.params.docId;

    try {
      DOC_COLLECTION.findById(docId).then((doc) => {
        if (!doc)
          return res.status(500).json({
            isError: true,
            message: "No Document found with given id",
            data: null,
          });

        res.download(doc.path);
      });
    } catch (error) {
      res.status(500).json({
        isError: true,
        message: "Internal server error",
        data: error.message,
      });
    }
  },
};
