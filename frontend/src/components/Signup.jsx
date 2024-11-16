import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate to redirect after successful signup

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:4000/api/auth/register', {
        name: formValues.username,
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
      });
      console.log(res.data); // Handle success response
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response.data.message); // Handle error response
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="bg-opacity-20 backdrop-blur-lg border-2 bg-opacity-20 border-white shadow-lg rounded-lg p-12 w-full max-w-lg mx-4 lg:mx-0 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-[#3CB347] w-36 h-16 rounded-b-2xl">
          <span className="text-2xl text-white">Sign Up</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 mt-12">
          {/* Username input */}
          <div className="relative flex flex-col my-6">
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={formValues.username}
              onChange={handleInputChange}
              className="w-full h-14 text-lg bg-transparent text-white px-5 border-2 border-gray-300 rounded-2xl outline-none peer" 
              required 
            />
          </div>
          
          {/* Email input */}
          <div className="relative flex flex-col my-6">
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formValues.email}
              onChange={handleInputChange}
              className="w-full h-14 text-lg bg-transparent text-white px-5 border-2 border-gray-300 rounded-2xl outline-none peer" 
              required 
            />
          </div>
          
          {/* Password input */}
          <div className="relative flex flex-col my-6">
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password"
              placeholder="Password" 
              value={formValues.password}
              onChange={handleInputChange}
              className="w-full h-14 text-lg bg-transparent text-white px-5 border-2 border-gray-300 rounded-2xl outline-none peer" 
              autoComplete="off" 
              required 
            />
          </div>

          {/* Confirm Password input */}
          <div className="relative flex flex-col my-6">
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="confirmPassword"
              placeholder="Confirm Password" 
              value={formValues.confirmPassword}
              onChange={handleInputChange}
              className="w-full h-14 text-lg bg-transparent text-white px-5 border-2 border-gray-300 rounded-2xl outline-none peer" 
              autoComplete="off" 
              required 
            />
          </div>

          {error && <div className="text-red-500">{error}</div>}
          
          <div>
            <input type="submit" value="Sign Up" className="w-full h-12 bg-[#3CB347] text-white text-lg font-medium rounded-2xl cursor-pointer hover:bg-[#36973e] transition-all" />
          </div>
          <div className="text-center">
            <span>You already have an account?  <Link to="/login" className="text-[#3CB347] font-medium hover:underline">Login</Link></span>
          </div>
          
          
        </form>
        
      </div>
      
    </div>
  );
};

export default SignUp;
