const MONGOOSE = require("mongoose");
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;
const STRING = MONGOOSE.Schema.Types.String;
const DATE = MONGOOSE.Schema.Types.Date;

// Creating a Schema for uploaded files
const DOC_SCHEMA = new MONGOOSE.Schema({
  name: {
    type: STRING,
    required: [true, "Uploaded file must have a name"],
  },
  createdAt: {
    type: DATE,
    default: Date.now,
  },
  createdBy: {
    type: OBJECT_ID,
    ref: 'Login'
  },
  filename: {
    type: STRING
  },
  ext: {
    type: STRING
  },
  size: {
    type: STRING   
  },
  destination: {
    type: STRING
  },
  mimetype: {
    type: STRING
  },
  path: {
    type: STRING
  }
});

// Creating a Model from that Schema
const FILE = MONGOOSE.model("File", DOC_SCHEMA);

module.exports = FILE;