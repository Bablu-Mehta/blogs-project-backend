const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const postController = require("../controllers/postController");
const multer = require('multer');
const storage = require("../utils/multerStoragetSetUp");
const upload = multer({ storage });

const router = express.Router();

router.post("/addPost", authMiddleware, postController.addPost);
router.get("/allPosts", authMiddleware, postController.allPosts);
router.get("/post/:id", authMiddleware, postController.post);
router.put("/post/:id", authMiddleware, postController.updatePost);
router.post("/post/:id/comment", authMiddleware, postController.addComment);
router.post(
  "/post/upload/:id",
  authMiddleware,
  upload.single("file"),
  postController.uploadFile
);

module.exports = router;
