import React from 'react'
import { useNavigate } from 'react-router-dom';


function Logout() {
    const navigate = useNavigate();   
    const logout=()=>{
        localStorage.clear()
        navigate('/login');
    }
  return (
    <div>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Logout;