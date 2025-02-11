const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController");

router.get("/getblogs", BlogController.getBlogs);
router.post("/createblog", BlogController.createBlog);
router.get("/approved", BlogController.getApprovedBlogs);
router.get("/pending", BlogController.getPendingBlogs);
router.post("/pending", BlogController.addPendingBlog);
router.patch("/wantoapprov/:id", BlogController.approveBlog);
router.get("/:id", BlogController.getBlogById);
router.delete("/:id", BlogController.deleteBlog);

module.exports = router;
