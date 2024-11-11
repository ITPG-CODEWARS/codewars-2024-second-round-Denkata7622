const mongoose = require('mongoose')
const shortId = require('shortid')

// Blueprint for shortUrl Scheme
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        // If a custom short URL is provided, use that; otherwise, generate a short one
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    delete: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)