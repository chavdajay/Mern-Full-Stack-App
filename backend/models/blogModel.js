const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    },
    img:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Blog', blogSchema);