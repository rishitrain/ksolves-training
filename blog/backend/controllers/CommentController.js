const db = require("../config/db");

exports.addComment = async (req, res) => {
  const { blog_id, user_id, parent_comment_id, content } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO comments (blog_id, user_id, parent_comment_id, content) VALUES ($1, $2, $3, $4) RETURNING *",
      [blog_id, user_id, parent_comment_id, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

exports.getCommentsByBlog = async (req, res) => {
  const { blog_id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM comments WHERE blog_id = $1 ORDER BY created_at ASC",
      [blog_id]
    );
    const comments = buildCommentTree(result.rows);
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

 function buildCommentTree(comments) {
  const commentMap = {};
  const rootComments = [];

   comments.forEach((comment) => {
    comment.replies = [];
    commentMap[comment.comment_id] = comment;
  });

   comments.forEach((comment) => {
    if (comment.parent_comment_id === null) {
      rootComments.push(comment);
    } else {
      if (commentMap[comment.parent_comment_id]) {
        commentMap[comment.parent_comment_id].replies.push(comment);
      }
    }
  });

  return rootComments;
}
