const MONGOOSE = require("mongoose");
const STRING = MONGOOSE.Schema.Types.String;

const LOGIN_SCHEMA = new MONGOOSE.Schema({
    username: {
        type: STRING,
        required: true
    },
    password: {
        type: STRING,
        required: true
    }
})

const LOGIN = MONGOOSE.model("Login" , LOGIN_SCHEMA);
module.exports = {
    LOGIN, LOGIN_SCHEMA
}
