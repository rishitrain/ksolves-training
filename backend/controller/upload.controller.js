const { client } = require("../config/db");
 

exports.uplaodimage=async ()=>{
    try {
        const imageBuffer = req.file.buffer;
        const result = await  client.query(
          "INSERT INTO images (image_data) VALUES ($1) RETURNING id",
          [imageBuffer]
        );
        res.json({ id: result.rows[0].id });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Upload failed" });
      }
}


exports.getimages=async()=>{
    try {
        const result = await client.query(
            "SELECT * FROM images"
        )

        res.json(result.rows)
    } catch (err) {
        console.log(err);
        res.status(500).json("failed to fetch");
        
    }
}