import React, { useState, useEffect } from "react";
import axios from "axios";

function Gallery() {
  const [images, setImages] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
   const limit = 2;
  const sortOrder = "ASC";  

  useEffect(() => {
    fetchImages();
  }, [page]);  

  const fetchImages = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(`http://localhost:3000/images?page=${page}&limit=${limit}&sort=${sortOrder}`);
    
      console.log(res.data);
      
      setImages(res.data.images || []);
      setTotalPages(res.data.totalPages);
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gallery-container" style={{ padding: "20px" }}>
      <div className="images-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
        {isLoading ? (
          <p>Loading images...</p>
        ) : images.length > 0 ? (
          images.map((item) => (
            <img
              key={item.id}
              src={item.image_data}  
              alt={`Image ${item.id}`}
              width="150"
              loading="lazy"
              style={{ margin: "10px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
            />
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <button
            disabled={page === 1 || isLoading}
            onClick={() => setPage(page - 1)}
            style={{ padding: "5px 10px", cursor: page === 1 ? "not-allowed" : "pointer" }}
          >
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            disabled={page >= totalPages || isLoading}
            onClick={() => setPage(page + 1)}
            style={{ padding: "5px 10px", cursor: page >= totalPages ? "not-allowed" : "pointer" }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Gallery;
