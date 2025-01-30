import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';   

function BlogDisplay() {
  const { id } = useParams();   
  const [blog, setBlog] = useState(null);
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [parentCommentId, setParentCommentId] = useState(null);

   const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');  
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded.userId);
      return decoded.userId;   
    }
    return null;   
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/display/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.log("Error fetching the blog:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/comments/${id}`);
        setComments(res.data);
        console.log("this",res);//all comments that we fetch
        
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    fetchBlog();
    fetchComments();
  }, [id]);




  const handleCommentSubmit = async () => {
    const user_id = getUserIdFromToken(); 
    console.log(user_id);
      
 
      try {
        await axios.post('http://localhost:3000/comments', {
          blog_id: id,
          user_id,
          parent_comment_id: parentCommentId,
          content: newComment,
        });

        //after one comment we should 
        //make the new comment state again to empty 
        //for new comment
        
        setNewComment('');
        setParentCommentId(null);  
        const res = await axios.get(`http://localhost:3000/comments/${id}`);
      
        setComments(res.data);
      } catch (error) {
        console.log("Error posting comment:", error);
      }

  };

  const commenttree = (comments, parentId = null) => {
      
       let filtercomm=comments.filter(comment=>comment.parent_comment_id===parentId);
       let printedcomm=filtercomm.map(comment=>({
        ...comment,replies:commenttree(comments,comment.comment_id)
       }))    
       return printedcomm;
  
  };

  const commentTree = commenttree(comments);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">{blog.blog_name}</h1>
        <p className="text-lg text-gray-700">{blog.blog_content}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div>
          {commentTree.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            commentTree.map(comment => (
              <div key={comment.comment_id} className="mb-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p><strong>User {comment.user_id}</strong></p>
                  <p>{comment.content}</p>
                  
                </div>
                {comment.replies.length > 0 && (
                  <div className="ml-8 mt-4">
                    {comment.replies.map(reply => (
                      <div key={reply.comment_id} className="p-4 bg-gray-200 rounded-lg mb-2">
                        <p><strong>User {reply.user_id}</strong></p>
                        <p>{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded-md"
            rows="4"
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogDisplay;