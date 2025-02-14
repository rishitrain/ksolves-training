import React from 'react'
import { useState } from 'react';
import axios from 'axios'

function ImageUplaod() {

    const [image, setimage] = useState("");

    const handleuplaod = async()=>{
        if (!image) {
            alert("Please select an image first!");
            return;
          }
      
          const formData = new FormData();
          formData.append("image", image);
      
          try {
            await axios.post("http://localhost:3000/images", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
      
            alert("Image uploaded successfully!");
             
          } catch (error) {
            console.log(error);
            alert("Upload failed!");
    }
}

const handleFileChange = (e)=>{
    setimage(e.target.files[0]);
}
  return (
    <>
     <h2>Upload an Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleuplaod}>Upload</button>
    </>
  )
}

export default ImageUplaod