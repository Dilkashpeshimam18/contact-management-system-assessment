const mongoose = require('mongoose')

const phoneRegExp = /^\d{10}$/;

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    },
    phoneNumber: {
        type: String,
        required: true,
        match: [phoneRegExp, 'Please enter a valid 10-digit phone number.'],
    }
})

module.exports = mongoose.model('Contact', contactSchema)