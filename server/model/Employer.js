const mongoose = require("mongoose");
const Schema = mongoose.Schema
const extendSchema = require('mongoose-extend-schema'); // not 'mongoose-schema-extend'
const User = require('./User')
const EmployerSchema = extendSchema(User.schema, {
    companyname: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('employer', EmployerSchema)