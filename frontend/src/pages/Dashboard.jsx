import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
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
      }
    };
    fetchPrivateData();
  }, []); 
  
  return (
    <div className='w-full py-16 px-4 shadow-lg bg-slate-200 mt-20'>
      <div className='max-w-[1250px] mx-auto'>
        <h1 className='text-4xl font-semibold text-slate-800'>Dashboard</h1>
        <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-8'>
          <div className='bg-slate-100 rounded-md shadow-lg p-4 w-full'>
            This is the dashboard. Only visible if logged in.
            <br />
            {privateData}
            <p>{employer.name}</p>
            <p>{employer.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;