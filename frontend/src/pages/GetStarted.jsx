import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function GetStarted() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  return (
    <div className='flex w-full min-h-screen bg-slate-800'>
      <div className='w-full flex items-center justify-center'>
        <div className='bg-slate-200 md:py-10 py-4 px-12 rounded-md shadow-lg m-10'>
          <h1 className='md:text-4xl text-3xl text-slate-800 font-semibold'>Are you an employer?</h1>
          <p className='font-medium text-lg text-slate-800 md:mt-3 mt-2'>Click the button below to register an account.</p>
          <Link to='/register'>
            <button className='bg-slate-700 text-slate-100 rounded text-lg w-full md:mt-6 mt-4 px-6 md:py-2 sm:py-1 hover:bg-slate-600 transition duration-300 ease-in-out'>
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GetStarted;