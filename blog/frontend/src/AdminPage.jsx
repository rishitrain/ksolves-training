import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [approvedblogs, setapprovedblogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/pending');   
        setPendingBlogs(response.data);   
      } catch (err) {
        setError('Error fetching pending blogs');
        console.error(err);
      }
    };

    const fetchapprovedblogs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/approved');   
        setapprovedblogs(response.data);   
      } catch (err) {
        setError('Error fetching approved blogs');
        console.error(err);
      }
    };

    fetchPendingBlogs();
    fetchapprovedblogs();   
  }, []);

  const wanttoapprov = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3001/api/wantoapprov/${id}`);
      
       const updatedPendingBlogs = pendingBlogs.filter(blog => blog.blog_id !== id);
      setPendingBlogs(updatedPendingBlogs);
      const approvedBlog = pendingBlogs.find(blog => blog.blog_id === id);
      setapprovedblogs([...approvedblogs, approvedBlog]);

    } catch (error) {
      console.log("Error approving blog", error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {error && <p className="error">{error}</p>}

      <div>
        <h2>Pending Blogs</h2>
        {pendingBlogs.length === 0 ? (
          <p>No pending blogs found</p>
        ) : (
          <div>
      <div className="container mx-auto p-4">
        <p className="text-2xl font-semibold text-center mb-6">Pending</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingBlogs.map((pendingBlog, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900">{pendingBlog.blog_name}</h3>
              <p className="mt-2 text-gray-700">{pendingBlog.blog_content}...</p>
              <button onClick={() => wanttoapprov(pendingBlog.blog_id)}>To Approve</button>
            </div>
          ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <h2>Approved Blogs</h2>
        {approvedblogs.length === 0 ? (
          <p>No approved blogs found</p>
        ) : (
          <div>
        <div className="container mx-auto p-4">
          <p className="text-2xl font-semibold text-center mb-6">Approved</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedblogs.map((approvedblog, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900">{approvedblog.blog_name}</h3>
                <p className="mt-2 text-gray-700">{approvedblog.blog_content}...</p>
              </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
