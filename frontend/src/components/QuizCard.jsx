import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const QuizCard = ({ quiz }) => {  

  const formatDate = (date) => {
    const date1 = date.split('T')[0];
    const date2 = date1.split('-').join('/');
    const year = date2.split('/')[0];
    const month = date2.split('/')[1];
    const day = date2.split('/')[2];
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="bg-slate-200 px-4 py-5 sm:px-6 rounded-md shadow-md">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="flex-row ml-4 mt-2">
          <Link to={`/quiz/${quiz._id}`}>
            <h3 className="text-lg font-semibold leading-6 text-gray-900 hover:underline">{quiz.title}</h3>
          </Link>
          <p className='text-base'>{formatDate(quiz.createdAt)}</p>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <Link to={`/candidates/${quiz._id}`}>
            <button
              type="button"
              className="relative inline-flex items-center rounded-md bg-slate-700 px-3 py-2 text-base font-semibold text-slate-50 shadow-sm hover:bg-slate-600 focus-visible:outline transition duration-300"
            >
              Candidates
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default QuizCard;
