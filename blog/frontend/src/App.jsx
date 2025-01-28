// App.js
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import BlogPage from './BlogPage';
import PrivateRoute from './PrivateRoute';   
import Creation from './Creation'
import AdminPage from './AdminPage'
 
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

         <Route
          path="/blog"
          element={<PrivateRoute element={BlogPage} />}
        />

      <Route 
       path="/createblog"
       element={<PrivateRoute element={Creation}/>}
      />

     <Route path="/admin" element={<AdminPage/>} />
      </Routes>
    </>
  );
}

export default App;
