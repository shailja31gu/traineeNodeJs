const mongoose = require('mongoose')

const mobileValidation = function (mobile) {
    let regexForMobile = /^([+]\d{2})?\d{10}$/
    return regexForMobile.test(mobile)
}

const adminSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: [mobileValidation, "please enter a valid mobile number"],
        trim: true 
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minLen: 8,
        maxLen: 15
    },
},{ timestamps: true})

module.exports = mongoose.model('Admin', adminSchema)