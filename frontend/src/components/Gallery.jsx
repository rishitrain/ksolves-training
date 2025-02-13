import React from 'react'
import { useState ,useEffect } from 'react';
import axios from 'axios'

function Gallery() {

    const [uplaodedimage, setuplaodedimage] = useState([])

    useEffect(() => {
        fetchImages();
      }, []);

    const fetchImages = async () => {
        try {
          const res = await axios.get("http://localhost:3000/images");
          setuplaodedimage(res.data);
        } catch (err) {
          console.error(err);
          alert("Failed to fetch images");
        }
      };
  return (
    <>
     {
        uplaodedimage.map((item)=>{
          return(
            <img
            key={item.id}
            src={`data:image/png;base64,${item.image}`}
            alt="Uploaded"
            width="150"
             style={{ margin: "10px", borderRadius: "5px" }}
            />
          )
        })
     }
    </>
  )
}

export default Gallery