import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import { handleError, handleSuccess } from '../utils.js';
import axios from 'axios';

const Register = () => {
const[registerInfo, setRegisterInfo] = useState({name:'', email:'', password:'', confirmPassword:''});
const navigate = useNavigate();

const handleChange = (e) =>{
    const{name, value} = e.target;
    setRegisterInfo({...registerInfo, [name]: value});
}

const handleRegister = async(e) =>{
    e.preventDefault();

    const{name, email, password, confirmPassword} = registerInfo;

    if(!name || !email || !password || !confirmPassword){
        return handleError("all field required..");
    }
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//email validation
            if (!emailRegex.test(email)) {
                return handleError('Please enter a valid email address');
            }
            if (password.length < 3) {
                return handleError('Password must be at least 6 characters long');
            }
            if (password !== confirmPassword) {
                return handleError('Passwords do not match');
            }

            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}auth/register`, registerInfo);
            
                const { success, message } = response.data;
            
                if (success) { 
                    handleSuccess(message);
                    setTimeout(() => navigate('/login'), 2000); // 2 second wait & redirect
                } else {
                    handleError(message);
                }
            
            } catch (err) {
                return handleError("register user error...");
            }
            
}

  return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card p-4 shadow" style={{ maxWidth: "450px", width: "100%" }}>
            <h3 className="text-center mb-4">Register</h3>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  value={registerInfo.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
    
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={registerInfo.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
    
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={registerInfo.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
    
              <div className="mb-3">
                <label className="form-label">Confirm Password:</label>
                <input
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  value={registerInfo.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
              </div>
    
              <button type="submit" className="btn btn-success w-100">Register</button>
            </form>
    
            <p className="mt-3 text-center">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
    
          <ToastContainer />
        </div>
  );
};

export default Register