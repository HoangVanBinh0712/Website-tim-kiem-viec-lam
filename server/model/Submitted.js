const mongoose = require("mongoose");
const Schema = mongoose.Schema

const SubmittedSchema = new Schema({
    submitterId: {
        type: Schema.Types.ObjectId,
        ref: 'jobseeker'
    },
    dateSubmitted: {
        type: Date,
        default: Date.now()
    }
    //Ref Post
    ,
    post:{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }
})

module.exports = mongoose.model('submitted', SubmittedSchema)