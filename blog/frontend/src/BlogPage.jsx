import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 

function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
     axios.get('http://localhost:3001/blogs/getblogs')
      .then(res => {
        console.log(res.data);
        setBlogs(res.data);
      })
      .catch(error => {
        console.error('There was an error fetching the blogs:', error);
      });
  }, []);

  return (
    <>
    <div className="container mx-auto p-4">
      <p className="text-2xl font-semibold text-center mb-6">Welcome to Your Blog Page</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog,index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900">{blog.blog_name}</h3>
            <p className="mt-2 text-gray-700">{blog.blog_content}...</p>
           </div>
        ))}
      </div>
     </div>
      <div className="mb-6 text-center">
      <Link
        to="/createblog"
        className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
      >
        Create New Blog
      </Link>
    </div>
    </>
  );
}

export default BlogPage;
