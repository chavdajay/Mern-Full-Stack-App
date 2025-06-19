import React from 'react'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import ProtectedRoute from './components/ProtectedRoute';
import { fetchBlog } from './Api';

const App = () => {

  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);

  const fetchData = async () => {
    try {
      const data = await fetchBlog();
      setBlogs(data);
    } catch (err) {
      alert('Failed to fetch blogs');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={
              <ProtectedRoute>
                <Home />
                 <div className="container mt-4">
                  <h2 className="text-center mb-4">Simple Blog CRUD</h2>
                  <BlogForm fetchData={fetchData} editBlog={editBlog} setEditBlog={setEditBlog} />
                  <BlogList blogs={blogs} fetchData={fetchData} setEditBlog={setEditBlog} />
                </div>
              </ProtectedRoute>
            } 
            />
        </Routes>
      </Router>
  )
}

export default App
