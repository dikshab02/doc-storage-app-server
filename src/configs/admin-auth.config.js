module.exports = function validateAdmin(req,res,next) {
    if(!req.session.LOGIN_USER || req.session.LOGIN_USER.isAdmin != 'true') {
        return res.status(400).send({
            isError: true,
            message: 'User is not an admin'
        })
    }
    next();
}

