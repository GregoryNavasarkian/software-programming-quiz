import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import EmployerDashboard from '../components/EmployerDashboard';

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
        window.location.href = '/login';
      }
    };
    fetchPrivateData();
  }, []); 
  
  return (
   EmployerDashboard(employer, privateData)
  )
}

export default Dashboard;