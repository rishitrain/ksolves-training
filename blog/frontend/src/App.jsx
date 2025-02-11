// App.js
import { Routes, Route } from 'react-router-dom';
import './App.css';
 import Signup from './pages/Signup';
import Login from './pages/Login';
import BlogPage from './pages/BlogPage';
import PrivateRoute from './components/PrivateRoute';   
import Creation from './pages/Creation'
import AdminPage from './pages/AdminPage'
import BlogDisplay from './pages/Blogdisplay';
 
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Signup />} />
         <Route path="/login" element={<Login />} />

         <Route
          path="/blog"
          element={<PrivateRoute element={BlogPage} />}

        />

       <Route
       path='/blog/:id'
       element={<BlogDisplay/>}/>  


      <Route 
       path="/createblog"
       element={<PrivateRoute element={Creation}/>}
      />

     <Route path="/admin" element={<PrivateRoute element={AdminPage}/>}/>
      </Routes>
    </>
  );
}

export default App;
