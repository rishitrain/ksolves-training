import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout'
import {jwtDecode} from 'jwt-decode'


function BlogPage() {
  const [blogs, setBlogs] = useState([]);
 
  // const[username,setusername]=useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/approved')
      .then(res => {
        console.log(res.data);
        setBlogs(res.data);

        // const token =localStorage.getItem('token')
        //  const decodedToken = jwtDecode(token);
        //  console.log(decodedToken);
         
        //   const name = decodedToken.username;
        //   console.log(name)
        //   setusername(name);
        //   console.log(username);
          
           
      })
      .catch(error => {
        console.error('There was an error fetching the blogs:', error);
      });
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
    <p className="text-2xl font-semibold text-center">Welcome to Your Blog Page</p>
    <div className='bg-gray-700 text-white w-max m-1.5 p-1.5 hover:shadow-xl transition-shadow duration-200'>
        <Logout />
    </div>
      </div>
         
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
            key={blog.blog_id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/blog/${blog.blog_id}`} className="block">
                 
                <h3 className="text-xl font-bold text-gray-900">{blog.blog_name}</h3>
                <p className="mt-2 text-gray-700">{blog.blog_content.substring(0, 100)}...</p>

              </Link>
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
