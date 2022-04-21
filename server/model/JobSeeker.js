const mongoose = require("mongoose");
const Schema = mongoose.Schema
const extendSchema = require('mongoose-extend-schema'); // not 'mongoose-schema-extend'
const User = require('./User')
const JobSeekerSchema = extendSchema(User.schema,{
    name: {
        type: String,
        require: true
    },
    birthday:{
        type: Date,
        require: true
    }
})

module.exports = mongoose.model('jobseeker',JobSeekerSchema)