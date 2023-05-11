import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import CandidateTable from '../components/CandidateTable';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);

  const quizId = useParams().id;

  useEffect(() => {
    const fetchCandidates = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      };
      try {
        const { data } = await axios.get(`/candidate/${quizId}`, config);
        setCandidates(data.candidates);
      } catch (error) {
        console.log(error.response.data.error);
        alert(error.response.data.error);
      }
    };
    fetchCandidates();
  }, [quizId]);

  return (
    <div className='w-full min-h-screen py-16 px-4 shadow-lg bg-slate-200 mt-20'>
      <div className='max-w-[1250px] mx-auto'>
        <h1 className='md:text-4xl text-3xl font-semibold text-slate-800 mt-2 mb-4 md:text-left text-center'>Candidates</h1>

        <CandidateTable quizId={quizId} candidates={candidates} />

      </div>
    </div>
  )
};

export default Candidates;
