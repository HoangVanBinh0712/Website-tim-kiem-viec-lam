const mongoose = require("mongoose");
const Schema = mongoose.Schema
const MarkedPostSchema = new Schema({
    //Email để móc đến bảng Jobseeker và Employer
    email: {
        type: String,
        require: true,
        
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
    

module.exports = mongoose.model('employer', MarkedPostSchema)