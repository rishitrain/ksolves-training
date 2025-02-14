const pool = require("../config/db");  
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadImage = async (req, res) => {
  try {
    const imgbuffer = req.file.buffer;  
    await pool.query("INSERT INTO images (image_data) VALUES ($1)", [imgbuffer]);
    res.json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Upload failed" });
  }
};

exports.getImages = async (req, res) => {
  try {
    let { page, limit, sort } = req.query;
    
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page - 1) * limit;
    
     sort = sort && sort.toUpperCase() === "DESC" ? "DESC" : "ASC";

     const countResult = await pool.query("SELECT COUNT(*) FROM images");
    const totalImages = parseInt(countResult.rows[0].count);

     const result = await pool.query(
      `SELECT id, encode(image_data, 'base64') AS image 
       FROM images 
       ORDER BY upload_time ${sort} 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

     const processedImages = result.rows.map(img => ({
      id: img.id,
      image_data: `data:image/jpeg;base64,${img.image}`
    }));

    res.json({
      page,
      limit,
      totalImages,
      totalPages: Math.ceil(totalImages / limit),
      images: processedImages,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

