const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const UrlSchema = mongoose.Schema({
    completeUrl: {
        type: String,
        required: [true, "completeUrl field is required"],
        match: [
            /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
            "Invalid URL" 
        ]
    },
    code: {
        type: String,
        default: () => nanoid(12)
    },
    clicks: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true});


UrlSchema.methods.updateClicks = function(password) {
    this.clicks++
    this.save()
};


const Url = mongoose.model('Url', UrlSchema);

module.exports = Url;