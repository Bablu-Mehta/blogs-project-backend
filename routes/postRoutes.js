const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/addPost", authMiddleware, postController.addPost);
router.get("/allPosts", authMiddleware, postController.allPosts);

module.exports = router;
