import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
            />
        </Routes>
      </Router>
  )
}

export default App
