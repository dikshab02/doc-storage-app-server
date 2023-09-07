const DOC_CONTROLLER = require('../controllers/document');
const DOC_UPLOAD = require('../configs/doc-upload.config');

module.exports = (APP) => {
    APP.post('/doc/uploadFile', DOC_UPLOAD.single('file') ,DOC_CONTROLLER.uploadFile);
    APP.get('/doc/getFile',DOC_CONTROLLER.getFile);
    APP.get('/doc/downloadFile/:docId',DOC_CONTROLLER.downloadFile);
    APP.delete('/doc/deleteFile/:docId',DOC_CONTROLLER.deleteFile)
    APP.get('/document-detail/:docId', DOC_CONTROLLER.getDocumentById)
}
