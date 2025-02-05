import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';   
import { jwtDecode } from "jwt-decode";

function Creation() {
  const [blogname, setBlogname] = useState('');
  const [blogcontent, setBlogcontent] = useState('');
  const navigate = useNavigate();   

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = localStorage.getItem("token");
    const decodedToken = jwtDecode(res);
    console.log(decodedToken);
    const id = decodedToken.userId;
    console.log(id);   
  
    try {
      await axios.post('http://localhost:3000/api/pending', { blogname, blogcontent, id });
      alert("Thank You for creating Blog , Wait till the Admin Approves it !!")
      navigate('/blog');   
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };
  

  return (
    <>
  <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    <form onSubmit={handleSubmit}>
       <input
        type="text"
        placeholder="Blog Name"
        value={blogname}
        onChange={(e) => setBlogname(e.target.value)}
        required
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
       <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
        Your Message
      </label>
      <textarea
        placeholder="Blog Content"
        value={blogcontent}
        onChange={(e) => setBlogcontent(e.target.value)}
        required
        id="message"
        rows="4"
        className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
      
       <button
        type="submit"
        className="w-full mt-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
      >
        Create
      </button>
    </form>
  </div>
</>

  );
}

export default Creation;
