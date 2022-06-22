const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require:true
    },
    lastName: {
        type: String,
        require: true
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        require: true
    },
    email: {
        type: String,   
        required: true,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
}, {timestamps: true})

module.exports = mongoose.model('author', authorSchema)