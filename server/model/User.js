const mongoose = require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email:{
        type: String,
        require: true,
        unique: true
    },
    phonenumber:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    role:{
        type: Number,
        require: true,
        enum: [0,1,2]
    },
    lastesttoken:{
        type: String
    },
    createAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users', UserSchema)