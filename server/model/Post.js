const mongoose = require("mongoose");
const Schema = mongoose.Schema

const PostSchema = new Schema({
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category'
    },    
    title:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    requirement:{
        type: String,
        require: true,
    },
    salary:{
        type: Number,
        require: true,
    },
    location:{
        type: String,
        require: true,
    },
    status:{
        type:String,
        enum: ["pending","approved","rejected"],
    },
    dateRequest:{
        type: Date,
        default: Date.now()
    },
    dateEnd: {
        type: Date,
        require: true
    },
    dateApproved: {
        type: Date,
    }
    //ref Author và Censor và Category
    ,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'employer'
    },
    approver:{
        type: String
    }
    
})

module.exports = mongoose.model('post', PostSchema)