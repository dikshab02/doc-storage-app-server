const DOC_CONTROLLER = require('../controllers/document');

const DOC_UPLOAD = require('../configs/doc-upload.config');

module.exports = (APP) => {
    APP.post('/doc/uploadFile', DOC_UPLOAD.single('file') ,DOC_CONTROLLER.uploadFile);
    APP.get('/doc/getFile',DOC_CONTROLLER.getFile);
}
