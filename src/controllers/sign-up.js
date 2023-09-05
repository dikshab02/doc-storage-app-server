const LOGIN_COLLECTION = require("mongoose").model("Login");

module.exports = {
    signup: (req, res) => {
        const data = {
        username: req.body.username,
        password: req.body.password,
        };
        LOGIN_COLLECTION.create(data)
        .then((response) => {
            res.send({
            isError: false,
            message: "Registered successfully",
            data: response,
            });
        })
        .catch((error) => {
            res.status(500).json({
            isError: true,
            message: "Failed to register",
            data: error.message,
            });
        });
    }
}
