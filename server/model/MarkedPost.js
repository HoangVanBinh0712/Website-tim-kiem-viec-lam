const mongoose = require("mongoose");
const Schema = mongoose.Schema
const MarkedPostSchema = new Schema({
    //Email để móc đến bảng Jobseeker và Employer
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'jobseeker'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    }

})
    

module.exports = mongoose.model('markpost', MarkedPostSchema)