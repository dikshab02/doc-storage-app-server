const LOGIN_CONTROLLER = require('../controllers/sign-up');

module.exports = (APP) => {
    APP.post("/sign-up", LOGIN_CONTROLLER.signup);
}


