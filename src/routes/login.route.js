const LOGIN_CONTROLLER = require('../controllers/login');

module.exports = (APP) => {
    APP.post('/login' ,LOGIN_CONTROLLER.login);
}

