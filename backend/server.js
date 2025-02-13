const express = require("express");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
const pool = require('../backend/config/db')
const app = express();
app.use(cors());
app.use(express.json());

 

const storage = multer.memoryStorage();
const upload = multer({ storage });

 app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imgbuffer = req.file.buffer;  
    await pool.query("INSERT INTO images (image_data) VALUES ($1)", [imgbuffer]);
    res.json({ message: "Image uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

 app.get("/images", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, encode(image_data, 'base64') AS image FROM images");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});


app.get("/image/:id", async (req, res) => {
  try {
    const { id } = req.params;

     const result = await pool.query(
      "SELECT id, encode(image_data, 'base64') AS image FROM images WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json(result.rows[0]);  
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

 const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
