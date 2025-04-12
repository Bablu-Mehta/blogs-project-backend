const Post = require("../models/Post");

exports.addPost = async (req, res) => {
  const { title, content } = req.body;

  const post = new Post({ title, content, author: req.user.userId });
  await post.save();

  res.status(201).json({ postData: post, message: "Post added successfully" });
};

exports.allPosts = async (req, res) => {
  const posts = await Post.find({});

  res.status(200).json({ posts, message: "Data fetched successfully" });
};
