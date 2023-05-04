import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const ShortAnswer = ({ id }) => {
  const [questionText, setQuestionText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      },
    };
    const questionType = 'short-answer';
    const choices = [];
    const correctAnswers = [];
    const question = {
      questionType,
      questionText,
      choices,
      correctAnswers
    };
    try {
      await axios.post(`/quiz/${id}/question`, question, config);
      setQuestionText('');
      alert('Question created successfully');
    } catch (error) {
      console.log(error.response.data.error);
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <form className='flex flex-col space-y-4 mt-4 text-center items-center' onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-2 md:w-[70%] w-[80%]'>
          <label htmlFor='question' className='text-slate-800 font-semibold text-left'>Question</label>
          <input
            onChange={(e) => setQuestionText(e.target.value)}
            value={questionText}
            type='text'
            name='question'
            id='question'
            placeholder='Enter prompt'
            required
            className='border border-slate-800 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent'
          />
          <div>
            <button
              type="submit"
              className="mt-3 inline-flex items-center rounded-md bg-slate-700 px-6 py-2 text-base font-semibold text-slate-100 shadow-sm hover:bg-slate-600 transition duration-300 ease-in-out"
            >
              Add Question
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ShortAnswer;
