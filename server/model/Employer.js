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
//Example about method
EmployerSchema.statics.viewInfo = function (userId){
    return this.findOne({ _id: userId }, { _id: 0, password: 0, lastesttoken: 0, role: 0, createAt: 0 })
}

module.exports = mongoose.model('employer', EmployerSchema)