import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function RegisterEmployerForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ name, email, password }));
  }

  return (
    <div className='bg-slate-200 py-10 px-12 rounded-md shadow-lg m-4'>
      <h1 className='md:text-4xl text-3xl text-slate-800 font-semibold'>Create An Account</h1>
      <p className='font-medium text-lg text-slate-800 md:mt-3 mt-2'>Please enter your details.</p>
      <form className='md:mt-5 mt-4' onSubmit={handleSubmit}>
        <div>
          <div>
            <label className='text-slate-800 text-lg font-medium w-full' htmlFor="name">Name</label>
            <input className='w-full border-2 border-slate-300 text-slate-900 text-lg font-medium bg-slate-50 rounded p-1 px-2 mt-1'
              onChange={handleNameChange}
              value={name}
              type="text"
              name="name"
              id="name"
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='mt-2'>
            <label className='text-slate-800 text-lg font-medium w-full' htmlFor="email">Email</label>
            <input className='w-full border-2 border-slate-300 text-slate-900 text-lg font-medium bg-slate-50 rounded p-1 px-2 mt-1'
              onChange={handleEmailChange}
              value={email}
              type="email"
              name="email"
              id="email"
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mt-2'>
            <label className='text-slate-800 text-lg font-medium w-full' htmlFor="password">Password</label>
            <input className='w-full border-2 border-slate-300 text-slate-900 text-lg font-medium bg-slate-50 rounded p-1 px-2 mt-1'
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
            <button className='bg-slate-700 text-slate-100 rounded text-lg w-full mt-6 px-6 py-2 hover:bg-slate-600 transition duration-300 ease-in-out'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterEmployerForm;