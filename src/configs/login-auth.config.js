module.exports = function validateLogin(req,res,next){
    if(!req.session.LOGIN_USER){
        return res.status(400).send({
            isError: true,
            message: 'Please login first.',
            data: ''
        })
    }
    next();
}
