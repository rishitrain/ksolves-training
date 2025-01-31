import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comments from './Comments';  

function BlogDisplay() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/display/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.log('Error fetching the blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">{blog.blog_name}</h1>
        <p className="text-lg text-gray-700">{blog.blog_content}</p>
      </div>

       <Comments blogId={id} />
    </div>
  );
}

export default BlogDisplay;