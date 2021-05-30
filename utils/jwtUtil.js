const jwt = require("jsonwebtoken")

exports.getAuthToken = (id) => {
    return authToken = jwt.sign(
        { 
            id,
            authToken: true 
        },
        process.env.JWT_AUTH_SECRET,
        {expiresIn: process.env.JWT_AUTH_EXPIRE}
        )
}

exports.getRefreshToken = (id) => {
    return refreshToken = jwt.sign(
        { 
            id, 
            refreshToken: true 
        },
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: process.env.JWT_REFRESH_EXPIRE}
        )
}
