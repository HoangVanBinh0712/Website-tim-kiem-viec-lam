const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    owner_email: {
        type: String,
        require: true
    },
    phonenumber: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    birthday: {
        type: Date,
        require: true
    },
    introduce: {
        type: String,
        require: true
    },
    experience: {
        type: String,
        default: ""
    },
    degree: {
        type: String,
        default: ""
    }
    //Ref Jobseeker
    ,
    jobseeker:{
        type: Schema.Types.ObjectId,
        ref: 'jobseeker'
    }

})

module.exports = mongoose.model("profile", ProfileSchema)