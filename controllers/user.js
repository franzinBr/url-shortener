const ErrorResponse = require("../utils/errorResponse")
const Url = require('../models/Url')

exports.getAllurlShortner = async (req, res, next) => {
    try {
        const urls = await Url.find({user: req.user}, '-_id completeUrl code clicks')
        if(!urls) return next(new ErrorResponse("this user has no url", 204))
        res.status(200).json({
            success: true,
            urls
        })
    } catch (error) {
        next(error)
    }
}