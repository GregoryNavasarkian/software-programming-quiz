import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CandidateResult = () => {
  const [quiz, setQuiz] = useState({});
  const [candidate, setCandidate] = useState({});

  const { id, quizid } = useParams();

  useEffect(() => {
    const fetchQuizData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      };
      try {
        const { data } = await axios.get(`/quiz/${quizid}`, config);
        setQuiz(data.quiz);
      } catch (error) {
        console.log(error.response.data.error);
        alert(error.response.data.error);
      }
    };
    fetchQuizData();
  }, [id]);

  useEffect(() => {
    const fetchCandidateData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      };
      try {
        const { data } = await axios.get(`/candidate/${id}`, config);
        setCandidate(data.candidate);
      } catch (error) {
        console.log(error.response.data.error);
        alert(error.response.data.error);
      }
    };
    fetchCandidateData();
  }, [id]);
  
  return (
    <div className='w-full min-h-screen py-16 px-4 shadow-lg bg-slate-200 mt-20'>
      <div className='max-w-[1250px] mx-auto'>
        <h1 className='md:text-4xl text-3xl font-semibold text-slate-800 mt-2 mb-4 md:text-left text-center'>{quiz.title}</h1>
        <div className='flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-20'>
          <div className='bg-slate-100 rounded-md shadow-lg py-8 w-full text-lg'>
            {candidate.score === undefined ? (
              window.alert('The candidate has not yet completed this quiz.'),
              window.location.replace(`/candidates/${id}`)
            ) :
            <div>
            <div className='text-center'>
            <h1 className='text-2xl font-semibold text-slate-800 mb-4'>Quiz Score</h1>
            <p className='text-slate-800 mb-4'>{candidate.score}</p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-[90%] border-t border-slate-400 m-auto" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-100 px-3 text-xl font-semibold leading-6 text-slate-800">Questions</span>
            </div>
          </div>
          <div className='flex flex-col'>
              {quiz.questions && quiz.questions.map((question, index) => (
                <div key={index} className='mt-4'>
                  <div className="flex justify-center">
                    <div className=" flex-col m-auto">
                      <p className="px-3 mt-3 text-lg font-semibold leading-6 text-slate-800">Question {index + 1}: {question.questionText}</p>
                    </div>
                  </div>
                  
                  <div className='mt-4 justify-center'>
                    {question.choices && question.choices.map((choice, index) => (
                      <div key={index} className='flex items-center space-x-2 justify-center'>
                        <p className=''>Choice {index + 1}: {choice}</p>
                      </div>
                    ))}
                  </div>
                  {candidate.answers && candidate.answers.map((answer, index) => ( 
                    answer.map((choice, location) => (
                    question.correctAnswers && question.correctAnswers[index] === choice ? (
                    <div key={index} className='flex items-center space-x-2 justify-center border-green-500'>
                            <span className='absolute bottom-0 right-0 p-1 bg-white text-xs font-semibold text-green-500'>
                                correct!</span>
                        <p>Chosen Answer: {answer}</p>
                      </div>
                    ) : (
                    <div key={index} className='flex items-center space-x-2 justify-center border-red-500'>
                        <span className='absolute bottom-0 right-0 p-1 bg-white text-xs font-semibold text-red-500'>
                                incorrect!</span>
                        <p>Chosen Answer: {answer}</p>
                      </div>
                  )))))}
                <hr className='border-1 border-slate-300' />
                </div>
              ))}
            </div>
          </div>
             }
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateResult;
