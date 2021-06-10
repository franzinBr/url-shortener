const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const {getAuthToken, getRefreshToken} = require('../utils/jwtUtil')
const {convertTimes} = require('../utils/convertTimes')
const emailSender = require('../utils/emailSender')

exports.register = async (req, res, next) => {
    const {fullname, email, password} = req.body;

    try {
        const user = await User.create({fullname, email, password});
        const verifyEmailToken = user.getVerifyEmailToken()

        // Send email here!!!
        const confirmUrl = `${process.env.FRONT_URL}/user/verify/${verifyEmailToken}`;

        const message = `
            <h1>This email was used to create an account on the Shorteener Url website</h1>
            <p>click on this link to confirm your registration</p>
            <a href=${confirmUrl} clicktracking=off>${confirmUrl}</a>
        `
        await emailSender({
            to: user.email,
            subject: "Confirm your account",
            text: message
        });
        
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

        if(!user.isVerified) return next(new ErrorResponse("Please verify your email", 403))

        const authToken = getAuthToken(user._id);
        const refreshToken = getRefreshToken(user._id);
        sendAuthTokenAndSetCookie(authToken, refreshToken, res, 200)


    } catch (error) {
        res.status(500).json({sucess: false, error: error.message})
    }

};

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('refreshtoken', {path: '/api/v1/auth/refresh'})
        res.clearCookie('aux', {path: '/'})
        return res.status(200).json({
            success: true,
            message: "user logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

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

exports.forgotpassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) return next(new ErrorResponse('Email could not be sent', 404))

        const resetToken = user.getResetPasswordToken();

        const resetUrl = `${process.env.FRONT_URL}/user/reset/${resetToken}`;

        const message = `
            <h1>A password reset was requested</h1>
            <p>Hello, ${user.fullname}</p>
            <p>this link is valid for only ${process.env.TOKEN_PASSWORD_EXPIRE}</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {
            await emailSender({
                to: user.email,
                subject: "Password Reset",
                text: message
            });
    
            res.status(200).json({
                success: true,
                message: "Email Sent"
            });

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new ErrorResponse("Email could not be send", 500))
        }

    } catch (error) {
        next(error);
    }
};

exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.tokenReset).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })
        if(!user) if(!user) return next(new ErrorResponse("Invalid Reset Token", 400))
        user.setNewPassword(req.body.password)
        res.status(201).json({success: true, message: "password reset successfully"})

    } catch (error) {
        next(error)
    }
};


const sendAuthTokenAndSetCookie = (authToken, refreshToken, res, statusCode ) => {

    res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/api/v1/auth/refresh', 
        maxAge: convertTimes(process.env.JWT_REFRESH_EXPIRE)
    })
    res.cookie('aux', true, {
        path: '/', 
        maxAge: convertTimes(process.env.JWT_REFRESH_EXPIRE)
    })
    
    let {exp} = jwt.decode(authToken)

    res.status(statusCode).json({
        success: true,
        authToken,
        exp,
    })
}
