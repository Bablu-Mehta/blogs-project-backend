const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const { default: mongoose } = require("mongoose");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Users.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    console.log("here");
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new Users({ email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "User Registered Successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, message: "Logged in succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.posts = async (req, res) => {
  try {
    // const posts = await Post.find({ author: req.params.id }).populate("author", "email");
    const posts = await Post.aggregate([
      { $match: { author: new mongoose.Types.ObjectId(req.params.id) } },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      {
        $project: {
          title: 1,
          "author.email": 1,
          commentCount: { $size: "$comments" },
        },
      },
    ]);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error, message: "server error" });
  }
};
