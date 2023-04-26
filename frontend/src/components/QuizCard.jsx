import React from 'react';
import { Link } from 'react-router-dom';

const QuizCard = () => {
  return (
    <div className="bg-slate-200 px-4 py-5 sm:px-6 rounded-md shadow-md">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="flex-row ml-4 mt-2">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">Quiz Name</h3>
          <p className='text-base'>2023/04/25</p>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <Link to='/'>
            <button
              type="button"
              className="relative inline-flex items-center rounded-md bg-slate-700 px-3 py-2 text-base font-semibold text-slate-50 shadow-sm hover:bg-slate-600 focus-visible:outline transition duration-300"
            > 
              Add Candidates
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default QuizCard;
