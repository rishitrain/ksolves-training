import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
   
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { username, password });
      setMessage(response.data.message);
      
      const token = response.data.token;
      localStorage.setItem('token', token);
  
       const decodedToken = jwtDecode(token);
        const isAdmin = decodedToken.isadmin;
        
       if (isAdmin) {
        navigate('/admin');  
      } else {
        navigate('/blog');
      }
      
    } catch (error) {
      console.log(error);
      
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };
  

  return (
    <>
        <div className="flex w-full max-w-xs mx-auto justify-center items-center min-h-screen">
  <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
    
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
      className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    <button
      type="submit"
      className="w-full py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
    >
      Login
    </button>

    <button onClick={handleSubmit}
      className=" p-2 m-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
      >Login for Admin</button>

    
    {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    <div>
    Don't have an Account ? 
  </div>
  <Link
  to="/"
  className="text-blue-800"
>
  Signup
  </Link>
  </form>

 
  
  </div>
</>

  );
}

export default Login;
