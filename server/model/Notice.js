const mongoose = require("mongoose");
const Schema = mongoose.Schema

const NocticeSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    //Email để móc đến bảng Jobseeker và Employer
    email: {
        type: String,
        require: true,
        
    },
    isnew: {
        type: Boolean,
        default: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model("notice",NocticeSchema)