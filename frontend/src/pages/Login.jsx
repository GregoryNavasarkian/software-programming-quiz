import React from 'react';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <div className='flex w-full min-h-screen bg-slate-800'>
      <div className='w-full flex items-center justify-center'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login;
