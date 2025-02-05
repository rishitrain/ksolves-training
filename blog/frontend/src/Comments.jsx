import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';  

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyto, setreplyto] = useState(null);

  //for getting and setting the userid 
  const [userId, setUserId] = useState(null);  

   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);  
    }
  }, []);

   useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/comments/${blogId}`);
        console.log(res.data)
        setComments(res.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [blogId]);

   const addcomment = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/comments', {
        blog_id: blogId,
        user_id: userId, 
        parent_comment_id: replyto,
        content: newComment,
      });

       setComments((prevComments) => [...prevComments, res.data]);
       //after creation of a comment just erase the state for the new one 
      setNewComment('');
      setreplyto(null);
    } catch (error) {
      console.log('Error adding comment:', error);
    }
  };

   const rendercomm = (comments) => {
    return comments.map((comment) => (
      <div key={comment.comment_id} className="ml-4 my-2 p-2 border-l-2 border-gray-200">
        <div className="text-gray-700">{comment.content}</div>
        <button
          onClick={() => setreplyto(comment.comment_id)}
          className="text-blue-500 text-sm"
        >
          Reply
        </button>
         {comment.replies && rendercomm(comment.replies)}
      </div>
    ));
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

       <div className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={replyto ? 'Write a reply...' : 'Write a comment...'}
          className="w-full p-2 border rounded-lg"
        />


        <button
          onClick={addcomment}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {replyto ? 'Reply' : 'Comment'}
        </button>


        {replyto && (
          <button
            onClick={() => setreplyto(null)}
            className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>

       {comments.length > 0 ? (rendercomm(comments)) : (<p className="text-gray-500">No comments yet. Be the first to comment!</p>)}
    </div>
  );
};

export default Comments;