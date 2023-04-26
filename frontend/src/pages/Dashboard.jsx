import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import ExampleRadio from '../components/ExampleRadio';
import DropDown from '../components/DropDown';

function Dashboard() {
  const [employer, setEmployer] = useState({});
  const [privateData, setPrivateData] = useState('');
  
  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      };
      try {
        const { data } = await axios.get('/private', config);
        setPrivateData(data.data);
        setEmployer(data.employer);
      } catch (error) {
        localStorage.removeItem('authToken');
        alert('You are not authorized. Please login.');
        window.location.href = '/login';
      }
    };
    fetchPrivateData();
  }, []); 

    return (
        <div className='w-full py-16 px-4 shadow-lg bg-slate-200 mt-20'>
        <div className='max-w-[1000px] mx-auto'>
          <h1 className='text-4xl font-semibold text-slate-800'>Welcome {employer.name}</h1>
          <br/>
          <h2 className='text-2xl font-semibold text-slate-800'>Employer Dashboard</h2>
          <DropDown />
          <div className='flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-8'>
            <div className='bg-slate-100 rounded-md shadow-lg p-4 w-full text-lg'>
            <div className='text-center'>
            <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            >
            <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          {employer.quizId == undefined && 
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No quizzes</h3>
          }
          <div className="mt-6">
          <Link to='/newquiz'> 
          <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          Create Quiz
          </button>
          </Link>
            </div>
            </div>
            </div>
            <ExampleRadio />
          </div>
        </div>
        
      </div>
    );
    };    

export default Dashboard;