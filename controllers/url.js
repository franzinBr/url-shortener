
exports.createUrlShortener = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Creating url shortener router"
    })
}

exports.getUrlShortener = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "get url shortener router"
    })
}


exports.deleteUrlShortener = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "delete url shortener router"
    })
}