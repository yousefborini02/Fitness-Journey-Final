import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert'; // Import SweetAlert
import bg from '../assets/img/gyms.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password,
      }, { withCredentials: true });

      alert(res.data.message); // Handle success response
      navigate('/'); // Redirect to home page on successful login

    } catch (err) {
      const errorMessage = err.response?.data.message || 'Login failed';

      if (errorMessage === 'This account is deactivated') {
        // Show SweetAlert if account is deactivated
        Swal('Error', 'This account is deactivated', 'error');
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bg})`  }}>
      <div className="relative w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3 backdrop-blur-lg border-2 border-white shadow-lg rounded-lg p-12 text-white bg-opacity-20">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-[#3CB347] w-36 h-16 rounded-b-2xl">
          <span className="text-2xl text-white">Login</span>
        </div>
        <form onSubmit={login} className="pt-10">
          {error && <p className="text-red-500">{error}</p>}
          <div className="relative flex flex-col my-6">
            <input 
              type="email" 
              placeholder='Email' 
              id="user" 
              className="w-full h-14 text-lg bg-transparent text-white px-5 border-2 border-gray-300 rounded-2xl outline-none peer" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <i className="bx bx-user absolute top-1/2 right-5 transform -translate-y-1/2 text-2xl"></i>
          </div>
          <div className="relative flex flex-col my-6">
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder='Password' 
              id="pass" 
              className="w-full h-14 text-lg bg-transparent text-white px-5 border-2 border-gray-300 rounded-2xl outline-none peer" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              autoComplete="off" 
              required 
            />
            <i className={`bx ${showPassword ? 'bx-show' : 'bx-hide'} absolute top-1/2 right-5 transform -translate-y-1/2 text-2xl cursor-pointer`} onClick={handleShowPassword}></i>
          </div>
          
          <div className="my-6">
            <input type="submit" className="w-full h-12 bg-[#3CB347] text-white text-lg font-medium rounded-2xl cursor-pointer hover:bg-[#36973e] transition-all" value="Login" />
          </div>
          <div className="text-center">
            <span>Don't have an account?  <Link to="/signup" className="text-[#3CB347] font-medium hover:underline">Register</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
