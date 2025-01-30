const express=require("express")
const router=express.Router()
const db=require('../db')


router.get('/comments/:blog_id', async (req, res) => {
    const { blog_id } = req.params;

    try {
         const result = await db.query(
            `WITH RECURSIVE comment_tree AS (
                SELECT * FROM comments WHERE blog_id = $1
                UNION ALL
                SELECT c.* FROM comments c
                INNER JOIN comment_tree ct ON c.parent_comment_id = ct.comment_id
            )
            SELECT * FROM comment_tree`,
            [blog_id]
        );

         const buildCommentTree = (comments, parentId = null) => {
            return comments
                .filter(comment => comment.parent_comment_id === parentId)
                .map(comment => ({
                    ...comment,
                    replies: buildCommentTree(comments, comment.comment_id),
                }));
        };

         const commentTree = buildCommentTree(result.rows);

        res.json(commentTree);
    } catch (error) {
        console.error("Error getting comments:", error);
        res.status(500).json({ message: "Error getting comments" });
    }
});

router.post('/comments', async (req, res) => {
    const { blog_id, user_id, parent_comment_id, content } = req.body;
  
    try {
      const result = await db.query(
        'INSERT INTO comments (blog_id, user_id, parent_comment_id, content) VALUES ($1, $2, $3, $4) RETURNING *',
        [blog_id, user_id, parent_comment_id || null, content]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create comment' });
    }
  });


module.exports=router