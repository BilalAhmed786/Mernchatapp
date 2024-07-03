const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

    username: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    status: {
        type:String,
        default: 'offline', 
    },
    socketid: {
        type: String,
        required:true
    },
    password: {
        type:String,
        required: true
    },
    retypepassword: {
        type:String,
        required: true
    },




})

const User = mongoose.model('user', Schema);



module.exports = User