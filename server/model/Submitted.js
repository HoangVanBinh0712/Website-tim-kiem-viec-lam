const mongoose = require("mongoose");
const Schema = mongoose.Schema

const SubmittedSchema = new Schema({
    currentSubmitted: {
        type:Number,
        default: 0
    },
    submitterEmail: {
        type: Number,
        require: true,
        unique: true,
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