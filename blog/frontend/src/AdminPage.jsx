import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/pending');  // Fetch pending blogs
        setPendingBlogs(response.data);  // Store pending blogs in state
      } catch (err) {
        setError('Error fetching pending blogs');
        console.error(err);
      }
    };

    fetchPendingBlogs();  // Fetch pending blogs on component mount
  }, []);

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {error && <p className="error">{error}</p>}

      <div>
        <h2>Pending Blogs</h2>
        
        {/* Check if there are no pending blogs */}
        {pendingBlogs.length === 0 ? (
          <p>No pending blogs found</p>
        ) : (
          <div>
            {/* Manually display the blog name and content without mapping directly */}
            {pendingBlogs && pendingBlogs.length > 0 && (
              <>
                <div>
                  <strong>{pendingBlogs[0]?.blog_name}</strong> {/* Display blog name */}
                  <br />
                  <p>{pendingBlogs[0]?.blog_content}</p> {/* Display blog content */}
                </div>

                 {pendingBlogs.length > 1 && (
                  <>
                    <div>
                      <strong>{pendingBlogs[1]?.blog_name}</strong>
                      <br />
                      <p>{pendingBlogs[1]?.blog_content}</p>
                    </div>
                  </>
                )}

                
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
