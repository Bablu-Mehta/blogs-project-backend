const Post = require("../models/Post");
const multer = require("multer");
const path = require("path");
const File = require("../models/File");

exports.addPost = async (req, res) => {
  const { title, content } = req.body;

  const post = new Post({ title, content, author: req.user.userId });
  await post.save();

  res.status(201).json({ postData: post, message: "Post added successfully" });
};

exports.allPosts = async (req, res) => {
  const posts = await Post.find({}).populate("uploads");

  res.status(200).json({ posts, message: "Data fetched successfully" });
};

exports.post = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.status(200).json({ post });
};

exports.updatePost = async (req, res) => {
  const updatePost = req.body;
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatePost, {
    new: true,
    runValidators: true,
  });

  if (!updatedPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  res
    .status(200)
    .json({ post: updatedPost, message: "Post updated successfully" });
};

exports.addComment = async (req, res) => {
  const { text } = req.body;

  const comment = {
    text,
    user: req.user.userId,
    likes: [],
    dislikes: [],
    createdAt: new Date(),
  };

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: comment },
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "message not found!" });
    }

    res
      .status(200)
      .json({ post: updatedPost, message: "comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.uploadFile = async (req, res) => {

  // return res.json({data: req.file});
  // try {
    const fileData = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimeType: req.file.mimetype,
      post: req.params.id,
    });
    
    await fileData.save();
    await Post.findByIdAndUpdate(req.params.id, {uploads: fileData._id})
    res
      .status(201)
      .json({ message: "file uploaded succesfully", file: fileData });
  // } catch (error) {
  //   res.status(500).json({ message: "server error" });
  // }
};
