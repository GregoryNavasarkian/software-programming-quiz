import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [quizId, setQuizId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    };
    let questions = [];
    try {
      const { data } = await axios.post('/quiz', { title, timeLimit, accessKey, questions }, config);
      setQuizId(data.data._id);
      setSubmitted(true);
    } catch (error) {
      console.log(error.response.data.error);
      alert(error.response.data.error);
    }
  };

  return (
    <div className='w-full py-16 px-4 shadow-lg bg-slate-200 mt-20'>
      <div className='max-w-[1000px] mx-auto'>
        <h1 className='md:text-4xl text-3xl font-semibold text-slate-800 mt-2 mb-4 md:text-left text-center'>Create Quiz</h1>
        <div className='flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-10'>
          <div className='bg-slate-100 rounded-md shadow-lg py-8 w-full text-lg'>
            <div className='text-center'>
              {submitted ?
                <div>
                  <h2 className='md:text-3xl text-2xl font-semibold text-slate-800'>Submitted!</h2>
                  <Link to={`/add-question/${quizId}`}>
                    <button
                      type="button"
                      className="mt-6 inline-flex items-center rounded-md bg-slate-700 px-6 py-2 text-base font-semibold text-slate-100 shadow-sm hover:bg-slate-600 transition duration-300 ease-in-out"
                    >
                      Add Questions
                    </button>
                  </Link>
                </div>
                :
                <div>
                  <h2 className='text-2xl font-semibold text-slate-800'>Quiz Options</h2>
                  <form className='flex flex-col space-y-4 mt-4 text-center items-center' onSubmit={handleSubmit}>
                    <div className='flex flex-col space-y-2 md:w-[70%] w-[80%]'>
                      <label htmlFor='quizTitle' className='text-slate-800 font-semibold text-left'>Quiz Title</label>
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        type='text'
                        name='quizTitle'
                        id='quizTitle'
                        placeholder='Enter quiz title'
                        required
                        className='border border-slate-800 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent'
                      />
                      <label htmlFor='timeLimit' className='text-slate-800 font-semibold text-left'>Time Limit</label>
                      <input
                        onChange={(e) => setTimeLimit(e.target.value)}
                        value={timeLimit}
                        type='text'
                        name='timeLimit'
                        id='timeLimit'
                        placeholder='Enter time limit in minutes'
                        required
                        className='border border-slate-800 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent'
                      />
                      <label htmlFor='accessKey' className='text-slate-800 font-semibold text-left'>Access Key</label>
                      <input
                        onChange={(e) => setAccessKey(e.target.value)}
                        value={accessKey}
                        type='text'
                        name='accessKey'
                        id='accessKey'
                        placeholder='Enter access key'
                        required
                        className='border border-slate-800 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent'
                      />
                      <div>
                        <button
                          type="submit"
                          className="mt-3 inline-flex items-center rounded-md bg-slate-700 px-6 py-2 text-base font-semibold text-slate-100 shadow-sm hover:bg-slate-600 transition duration-300 ease-in-out"
                        >
                          Add Quiz
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateQuiz;
