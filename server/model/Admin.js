const mongoose = require("mongoose");
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
    },
    birthday: {
        type: String,
        require: true,
    },
    phonenumber: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true,
    },
    role: {
        type: Number,
        default: 2
    },
    lastesttoken: {
        type: String
    },
    timescensored: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('admin', AdminSchema)