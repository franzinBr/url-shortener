const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

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

UserSchema.methods.comparePasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
};


const User = mongoose.model("User", UserSchema)

module.exports = User;