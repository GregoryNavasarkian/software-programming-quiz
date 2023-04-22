import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const { data } = await axios.post("/auth/login", { email, password }, config);
      localStorage.setItem("authToken", data.token);
      navigate('/dashboard');
      window.location.reload();
    } catch (error) {
      console.log(error.response.data.error);
      setPassword('');
      setError(true);
    }
  }
  
  return (
    <div className='bg-slate-200 md:py-10 py-4 px-12 rounded-md shadow-lg m-10'>
      <h1 className='md:text-4xl text-3xl text-slate-800 font-semibold'>Welcome Back</h1>
      {error ? <p className='font-bold text-lg text-red-600 md:mt-3 mt-2'>Invalid username or password.</p> : <p className='font-medium text-lg text-slate-800 md:mt-3 mt-2'>Please enter your details.</p>}
      <form className='md:mt-5 sm:mt-1' onSubmit={handleSubmit}>
        <div>
          <div className=''>
            <label className='text-slate-800 md:text-lg sm:text-base font-medium w-full' htmlFor="email">Email</label>
            <input className='w-full border-2 border-slate-300 text-slate-900 md:text-lg sm:text-base font-medium bg-slate-50 rounded p-1 px-2 mt-1'
              onChange={handleEmailChange}
              value={email}
              type="email"
              name="email"
              id="email"
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='md:mt-2 sm:mt-1'>
            <label className='text-slate-800 md:text-lg sm:text-base font-medium w-full' htmlFor="password">Password</label>
            <input className='w-full border-2 border-slate-300 text-slate-900 md:text-lg sm:text-base font-medium  bg-slate-50 rounded p-1 px-2 mt-1'
              onChange={handlePasswordChange}
              value={password}
              type="password"
              name="password"
              id="password"
              placeholder='Enter your password'
              required
            />
          </div>
          <div>
            <p className='text-slate-800 text-base font-medium mt-2'><Link to='/forgot-password' className='text-slate-700 hover:text-slate-900 hover:underline'>Forgot Password</Link></p>
            <button className='bg-slate-700 text-slate-100 rounded text-lg w-full md:mt-6 mt-4 px-6 md:py-2 sm:py-1 hover:bg-slate-600 transition duration-300 ease-in-out'>
              Login
            </button>
          </div>
          <div>
            <p className='text-slate-800 text-lg font-medium mt-4'>Don't have an account? <Link to='/get-started' className='text-slate-700 hover:text-slate-900 hover:underline'>Sign Up</Link></p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;
