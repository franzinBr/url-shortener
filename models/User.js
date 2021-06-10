const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const { convertTimes } = require('../utils/convertTimes');

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'fullname field is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email field is required"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Invalid email",
        ]
    },
    password: {
        type: String,
        required: [true, "password field is required"],
        select: false,
        minlength: 8,
  
    },
    role: {
        type: String,
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyEmailToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date

}, {timestamps: true} );


UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {next();}


   let passwordRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
   if(!passwordRegex.test(this.password)) return next(new ErrorResponse("the password must contain at least 8 characters, with at least one digit, one lowercase letter, one uppercase letter and one special character", 400))
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();

});

UserSchema.methods.getVerifyEmailToken = function()
{
    if(this.isVerified === false)
    {
        const verifyToken = crypto.randomBytes(64).toString("hex")
        this.verifyEmailToken = crypto.createHash("sha256").update(verifyToken).digest("hex")
        this.save()
        return verifyToken
    }
    return false
}

UserSchema.methods.getResetPasswordToken = function ()
{
    const resetToken = crypto.randomBytes(100).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + convertTimes(process.env.TOKEN_PASSWORD_EXPIRE)
    this.save();
    return resetToken;
}

UserSchema.methods.comparePasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.setNewPassword = function(newPassword)
{
    this.password = newPassword
    this.resetPasswordToke = undefined;
    this.resetPasswordExpire = undefined;
    this.save();
}


const User = mongoose.model("User", UserSchema)

module.exports = User;