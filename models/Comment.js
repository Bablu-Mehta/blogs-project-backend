const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    text:{type: String, required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    dislikes:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    createdAt:{type: Date, default: Date.now}
})

module.exports = commentSchema;