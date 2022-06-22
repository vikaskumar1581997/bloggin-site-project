const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require:true
    },
    body: {
        type: String,
        require: true
    },
    authorId: {
        type: ObjectId,
        ref: "author"
    },
    tags:[{
        type: String
    }],
    category: {
        type: String,  
        required: true,
    },
    subcategory: [{
        type: String
    }],
    deletedAt: String,
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: String,
    isPublished: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

module.exports = mongoose.model('blog', blogSchema)