const mongoose = require('mongoose');
const commentSchema = require("./Comment");

const postSchema = new mongoose.Schema({
    title:{type: String, required:true},
    content:{type: String, required:true},
    author:{type: mongoose.Schema.Types.ObjectId, ref:"Users", required: true},
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:"Users"}],
    dislikes:[{type:mongoose.Schema.Types.ObjectId, ref:"Users"}],
    comments:[commentSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);

