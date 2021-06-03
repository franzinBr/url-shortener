const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const {getAuthToken, getRefreshToken} = require('../utils/jwtUtil')



exports.register = async (req, res, next) => {
    const {fullname, email, password} = req.body;

    try {
        const user = await User.create({fullname, email, password});
        const verifyEmailToken = user.getVerifyEmailToken()

        // Send email here!!!
        
        console.log(verifyEmailToken)

        res.status(201).json({
            success: true,
            message: "Please verify your email"
        })
    //    sendTokens(user, 201, res);

    } catch (error) {
        next(error);
    }
};

exports.verify = async (req, res, next) => {
    const verifyEmailToken = crypto.createHash("sha256").update(req.params.tokenVerify).digest("hex");

    try {
        const user = await User.findOne({
            verifyEmailToken
        })
        if(!user) return next(new ErrorResponse("Invalid Verify Token", 400))
        
        user.isVerified = true
        user.verifyEmailToken = undefined;
        await user.save()

        res.status(201).json({success: true, message: "email verified successfully"})

    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) return next(new ErrorResponse("Please provide an email and passsword", 400))

    try {
        const user = await User.findOne({email}).select("+password")
        if(!user) return next(new ErrorResponse("Invalid credentials", 404));

        const compare = await user.comparePasswords(password);
        if(!compare) return next(new ErrorResponse("Invalid credentials", 404));

        if(!user.isVerified) return next(new ErrorResponse("Please verify your email", 404))

        const authToken = getAuthToken(user._id);
        const refreshToken = getRefreshToken(user._id);
        sendAuthTokenAndSetCookie(authToken, refreshToken, res, 200)


    } catch (error) {
        res.status(500).json({sucess: false, error: error.message})
    }

};

exports.refresh = async (req, res, next) => {    
    const refreshToken =  req.cookies.refreshtoken
    if(!refreshToken) return next(new ErrorResponse("Invalid token, please login again", 401))

    try {
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        if(!decodedRefreshToken.refreshToken) return next(new ErrorResponse("Invalid token, please login again", 401))

        const user = await User.findOne({_id: decodedRefreshToken.id})
        if(!user) return next(new ErrorResponse("Invalid token", 401))

        const authToken = getAuthToken(user._id);
        sendAuthTokenAndSetCookie(authToken, refreshToken, res, 201)

    } catch (error) {
        return next(new ErrorResponse("invalid token, please login again", 401))
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


const sendAuthTokenAndSetCookie = (authToken, refreshToken, res, statusCode ) => {

    res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/api/v1/refreshToken',
     //   maxAge: 30*24*60*60*1000 // 30days
    })

    res.status(statusCode).json({
        success: true,
        authToken,
    })
}
