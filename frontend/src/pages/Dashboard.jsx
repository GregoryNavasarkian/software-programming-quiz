import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import DropDown from '../components/DropDown';
import QuizCard from '../components/QuizCard';

const Dashboard = () => {
  const [employer, setEmployer] = useState({});
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchEmployerData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      };
      try {
        const { data } = await axios.get('/auth', config);
        setEmployer(data.employer);
      } catch (error) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';        
      }
    };
    fetchEmployerData();

    const fetchQuizData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      };
      try {
        const { data } = await axios.get('/quiz', config);
        if (data.quizzes.length === 0) {
          setQuizzes(undefined);
        }
        setQuizzes(data.quizzes);
      } catch (error) {
        console.log(error.response.data.error);
        alert(error.response.data.error);
      }
    };
    fetchQuizData();
  }, []);

  return (
    <div className='w-full min-h-screen py-16 px-4 shadow-lg bg-slate-200 mt-20'>
      <div className='max-w-[1250px] mx-auto'>
        <h1 className='md:text-4xl text-3xl font-semibold text-slate-800 mt-2 mb-4'>Employer Dashboard | Welcome {employer.name}</h1>
        <div className='absolute'>
          <DropDown />
        </div>
        <div className='flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-20'>
          <div className='bg-slate-100 rounded-md shadow-lg py-8 w-full text-lg'>
            <div className='text-center'>
              {quizzes.length === 0 &&
                <div>
                  <svg
                    className="mx-auto h-12 w-12 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-base font-semibold text-slate-900">No quizzes</h3>
                </div>
              }
              <div className="mt-6">
                <Link to='/create-quiz'>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-slate-700 px-6 py-2 text-base font-semibold text-slate-100 shadow-sm hover:bg-slate-600 transition duration-300 ease-in-out"
                  >
                    Create Quiz
                  </button>
                </Link>
              </div>
            </div>
            {quizzes.map((quiz) => (
              <div key={quiz._id} className='max-w-[85%] mx-auto flex-row my-4'>
                <QuizCard quiz={quiz} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
