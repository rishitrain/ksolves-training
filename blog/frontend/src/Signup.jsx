import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();   

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/signup', { username, email, password });
      setMessage(response.data.message);

      alert('Signup successful!');   
      navigate('/login');   
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <>
      <div className="flex w-full max-w-xs mx-auto justify-center items-center min-h-screen">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl font-bold p-2">SignUp</h1>

          <div className='mb-4'>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className='mb-4'>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='mb-4'>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="bg-gray-700 hover:bg-gray-900 text-white p-1.5 rounded" type="submit">
            Signup
          </button>

          <div className='p-2'>
            Have an Account?
          </div>
          <Link to="/login" className="text-blue-800">
            Login
          </Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
