const mongoose = require("mongoose");
const Schema = mongoose.Schema

const WPostSchema = new Schema({
    category:{
        type: Schema.type.ObjectId,
        ref: 'category'
    },    
    title:{
        type: String,
        require: true,
    },
    content:{
        type: String,
        require: true,
    },
    status:{
        type:Boolean,
        default: false,
    },
    dateRequest:{
        type: Date,
        default: Date.now()
    },
    dateEnd: {
        type: Date,
        require: true
    },
    dateAcepted: {
        type: Date,
    }
    //ref Author và Censor và Category
    ,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'employer'
    },
    censor:{
        type: Schema.Types.ObjectId,
        ref: 'admin'
    }
    
})

module.exports = mongoose.model('wpost', WPostSchema)