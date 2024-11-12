const mongoose = require('mongoose')
const shortId = require('shortid')
const User = require('./User')

// Blueprint for shortUrl Scheme
const shortUrlSchema = new mongoose.Schema({
    // Creator field used to assosiate different URLs to different accounts
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true  // Ensure that a user is always associated
      },
        full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        // If There is no custom URL, then generate a random one
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

// Export ShortUrl model
module.exports = mongoose.model('ShortUrl', shortUrlSchema)