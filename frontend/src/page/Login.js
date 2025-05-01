import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import { handleError, handleSuccess } from '../utils.js';
import axios from 'axios';

const Login = () => {
const[loginInfo, setLoginInfo] = useState({email:'', password:''});
const navigate = useNavigate();

const handleChange = (e) =>{
    const{name, value} = e.target;
    setLoginInfo({...loginInfo, [name]: value});
}

const handleLogin = async(e) =>{
    e.preventDefault();

    const{email, password} = loginInfo;

    if(!email || !password){
        return handleError("all field required..");
    }

    try{

        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}auth/login`, loginInfo);
        
        const { success, message } = response.data;
        const jwtToken  = response.data.token;
       
        if (success) { 
            handleSuccess(message);
            localStorage.setItem('token', jwtToken); 
            setTimeout(() => navigate('/home'), 2000); 
        } else 
        {
            handleError(message); 
        }


    }catch(err){
        return handleError("error using loign..");
    }
}

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email address:</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={loginInfo.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={loginInfo.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login