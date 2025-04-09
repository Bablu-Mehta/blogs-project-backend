const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"Users"},
    text:{type: String, required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:"Users"}],
    dislikes:[{type:mongoose.Schema.Types.ObjectId, ref:"Users"}],
    createdAt:{type: Date, default: Date.now}
})

module.exports = commentSchema;