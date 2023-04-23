import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const { data } = await axios.post("/auth/forgotpassword", { email }, config);
      console.log(data);
      setSubmitted(true);
    } catch (error) {
      alert(error.response.data.error);
      setEmail("");
    }
  }

  return (
    <div className='flex w-full h-screen bg-slate-800'>
      <div className='w-full flex items-center justify-center'>
        <div className='bg-slate-200 md:py-10 py-4 px-12 rounded-md shadow-lg m-10'>
          <h1 className='md:text-4xl text-3xl text-slate-800 font-semibold'>Forgot Password?</h1>
          {submitted
            ?
            <p className='font-medium text-lg text-slate-800 md:mt-3 mt-2'>Reset link has been sent to your account.</p>
            :
            <div>
              <p className='font-medium text-lg text-slate-800 md:mt-3 mt-2'>Enter you email below.</p><form className='mt-4' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                  <label className='text-slate-800 md:text-lg sm:text-base font-medium w-full' htmlFor="email">Email</label>
                  <input
                    type='email'
                    className='w-full border-2 border-slate-300 text-slate-900 md:text-lg sm:text-base font-medium bg-slate-50 rounded p-1 px-2 mt-1'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                  <button className='bg-slate-700 text-slate-100 rounded text-lg w-full md:mt-6 mt-4 px-6 md:py-2 sm:py-1 hover:bg-slate-600 transition duration-300 ease-in-out' type='submit'>
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;