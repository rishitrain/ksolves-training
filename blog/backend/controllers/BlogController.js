const db = require("../config/db");

exports.getBlogs = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blogt");

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

exports.createBlog = async (req, res) => {
  const { blogname, blogcontent } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO blogt (blog_name, blog_content) VALUES ($1, $2) RETURNING *",
      [blogname, blogcontent]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
};

exports.getApprovedBlogs = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blogt WHERE isapproved = TRUE");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching approved blogs:", error);
    res.status(500).json({ error: "Error fetching approved blogs" });
  }
};

exports.getPendingBlogs = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blogt WHERE isapproved = FALSE");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching pending blogs:", error);
    res.status(500).json({ error: "Error fetching pending blogs" });
  }
};

exports.addPendingBlog = async (req, res) => {
  const { blogname, blogcontent, id } = req.body;
  const isapproved = false;

  try {
    const result = await db.query(
      "INSERT INTO blogt (blog_name, blog_content, isapproved, id) VALUES ($1, $2, $3, $4) RETURNING *",
      [blogname, blogcontent, isapproved, id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating pending blog:", error);
    res.status(500).json({ error: "Failed to create pending blog" });
  }
};

exports.approveBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "UPDATE blogt SET isapproved=TRUE WHERE blog_id=$1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error approving blog:", error);
    res.status(500).json({ error: "Failed to approve blog" });
  }
};

exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("SELECT * FROM blogt WHERE blog_id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM blogt WHERE blog_id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
};
