const Url = require('../models/Url');
const ErrorResponse = require('../utils/errorResponse');


exports.createUrlShortener = async (req, res, next) => {
    const { completeUrl } = req.body; 

    try {
        const url = await Url.create({completeUrl, user: req.user})

        res.status(200).json({
            success: true,
            url: {
                clicks: url.clicks,
                completeUrl: url.completeUrl,
                code: url.code,
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.getUrlShortener = async(req, res, next) => {
    const { code } = req.params;

    try {
        const url = await Url.findOne({code});
        if(!url) return next(new ErrorResponse("Invalid code", 404));
        url.updateClicks();
        res.status(200).json({
            success: true,
            completeUrl: url.completeUrl
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }

}


exports.deleteUrlShortener = async (req, res, next) => {
    const { code } = req.body;

    if(!code) return next(new ErrorResponse("Please provide a code", 400))

    try {
        const deletedUrl = await Url.findOneAndDelete({
            code,
            user: req.user
        })

        if(!deletedUrl) return next(new ErrorResponse("this URL does not exist or does not belong to your account", 404))

        res.status(200).json({
            success: true,
            message: "Url deleted"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}