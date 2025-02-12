import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';

function PrivateRoute({ element: Element, ...rest }) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 200) {
          setAuthenticated(true);
        }
      } catch (error) {
         console.error('Authentication check failed:', error);
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>;  
  }

   return authenticated ? <Element {...rest} /> : <Navigate to="/login" />;
}

export default PrivateRoute;
