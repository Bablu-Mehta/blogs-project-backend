const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/addPost", authMiddleware, postController.addPost);
router.get("/allPosts", authMiddleware, postController.allPosts);
router.get("/post/:id", authMiddleware, postController.post);
router.put("/post/:id", authMiddleware, postController.updatePost);

module.exports = router;
