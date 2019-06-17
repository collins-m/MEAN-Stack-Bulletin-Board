const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// forum schema
const ForumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        items: {
            type: String
        }
    }
});

const Forum = module.exports = mongoose.model('Forum', ForumSchema);

module.exports.getForumById = function(id, callback){
    Forum.findById(id, callback);
}

module.exports.addForum = function(newForum, callback){
        newForum.save(callback);
}