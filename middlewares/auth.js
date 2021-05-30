const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

exports.isAuth = async(req, res, next) => {
    if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer"))
    {
        return next(new ErrorResponse("Missing auth token", 401))
    }
    const authToken = req.headers.authorization.split(" ")[1].trim()

    try {
        const decodedAuthToken = jwt.verify(authToken, process.env.JWT_AUTH_SECRET)
        
        if(!decodedAuthToken.authToken) return next(new ErrorResponse("Invalid token", 401))

        const user = await User.findOne({_id: decodedAuthToken.id})
        if(!user) return next(new ErrorResponse("Invalid token", 401))

        req.user = user;
        next();

    } catch (error) {
        return next(new ErrorResponse("invalid token", 401))
    }
}