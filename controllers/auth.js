const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')



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

exports.refresh = (req, res, next) => {

}

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
    const authToken = user.getAuthToken();
    const refreshToken = user.getRefreshToken();
    res.status(statusCode).json({
        success: true,
        authToken,
        refreshToken,
    })
}
