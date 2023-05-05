import React from 'react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

function Candidate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = new URLSearchParams(window.location.search);
    emailjs.send("service_2dy4rc3", "template_84omew6", {
      name: name,
      quizLink: 'test',
      accessKey: query.get('accesskey'),
      employerName: query.get('employer'),
      email: email
    }, "6l11s_2jpXNemZiWO")
      .then(
        window.alert("Your quiz link has been successfully sent"),
        window.location.replace(window.location.protocol + "//" + window.location.host + "/dashboard"))
  }

  return (
    <div className='flex items-center justify-center w-full min-h-screen py-16 px-4 shadow-lg bg-slate-200 mt-16'>
    <div className='bg-slate-100 py-10 px-20 rounded-md shadow-lg m-4' >
      <h1 className='md:text-4xl text-3xl text-slate-800 font-semibold'>Add Candidate</h1>
      <p className='font-medium text-lg text-slate-800 md:mt-3 mt-2'>Please enter a candidate name and email address and we will send the quiz link to your candidate.</p>
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
              placeholder='Enter the candidate name'
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
              placeholder='Enter the candidate email address'
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
    </div>
  )
}


export default Candidate;