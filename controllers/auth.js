const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {getAuthToken, getRefreshToken} = require('../utils/jwtUtil')



exports.register = async (req, res, next) => {
    const {fullname, email, password} = req.body;

    try {
        const user = await User.create({fullname, email, password});
    
        sendTokens(user, 201, res);

    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) return next(new ErrorResponse("Please provide an email and passsword", 400))

    try {
        const user = await User.findOne({email}).select("+password")
        if(!user) return next(new ErrorResponse("Invalid credentials", 404));

        const compare = await user.comparePasswords(password);
        if(!compare) return next(new ErrorResponse("Invalid credentials", 404));

        sendTokens(user, 200, res)
    } catch (error) {
        res.status(500).json({sucess: false, error: error.message})
    }

};

exports.refresh = async (req, res, next) => {

    if(!req.headers.authorization && !req.headers.authorization.startsWith("Bearer"))
    {
        return next(new ErrorResponse("Missing refresh token", 401))
    }
    const refreshToken = req.headers.authorization.split(" ")[1]

    try {
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        console.log(decodedRefreshToken)
        if(!decodedRefreshToken.refreshToken) return next(new ErrorResponse("Invalid token", 401))

        const user = await User.findOne({_id: decodedRefreshToken.id})
        if(!user) return next(new ErrorResponse("Invalid token", 401))

        const authToken = getAuthToken(user._id);

        res.status(200).json({
            success: true,
            refreshToken,
            authToken
        })

    } catch (error) {
        return next(new ErrorResponse("invalid tokenzeira", 401))
    }
};

exports.forgotpassword = (req, res, next) => {
    res.status(200).json({
        sucess: true,
        message: "forgot password router"
    })
};

exports.resetpassword = (req, res, next) => {
    res.status(200).json({
        sucess: true,
        message: "reset password router"
    })
};


const sendTokens = (user, statusCode, res) => {
    const authToken = getAuthToken(user._id);
    const refreshToken = getRefreshToken(user._id);
    res.status(statusCode).json({
        success: true,
        authToken,
        refreshToken,
    })
}
