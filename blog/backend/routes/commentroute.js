const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");

router.post("/", CommentController.addComment);
router.get("/:blog_id", CommentController.getCommentsByBlog);

module.exports = router;
