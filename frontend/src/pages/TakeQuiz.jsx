import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TakeQuiz = () => {
  const [quiz, setQuiz] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState("");  

  const { id } = useParams();
  var index = 0;

  useEffect(() => {
    const fetchQuizData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      };
      try {
        const { data } = await axios.get(`/quiz/${id}`, config);
        setQuiz(data.quiz);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizData();
  }, [id]);

  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      window.alert("Your time is up!")
      window.location.replace("/")
    }
  }, [timeRemaining]);

  useEffect(() => {
    setCurrentQuestion(quiz.questions[index]);
    index =+ 1;
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    setCurrentQuestion(quiz.questions[index]);
    setAnswer("");
  }
//implement saveAnswer(currentQuestion.id, answer);

    
  
  return (
    <div className='w-full py-16 px-4 shadow-lg bg-slate-200 mt-20'>
      <div className='max-w-[1250px] mx-auto'>
        <h1 className='md:text-4xl text-3xl font-semibold text-slate-800 mt-2 mb-4 md:text-left text-center'>{quiz.title}</h1>
        <div className='flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-20'>
          <div className='bg-slate-100 rounded-md shadow-lg py-8 w-full text-lg'>
            <div className='text-center'>
              <h1 className='text-2xl font-semibold text-slate-800 mb-4'>Quiz Questions</h1>
              <p className='text-slate-800 mb-4'>Time Remaining: {timeRemaining}</p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-[90%] border-t border-slate-400 m-auto" />
              </div>
            </div>

            <div className='bg-slate-100 py-10 px-20 rounded-md shadow-lg m-4'>
              {currentQuestion ? (
                <form className='md:mt-5 mt-4' onSubmit={handleSubmit}>
                    <p className='font-medium text-lg text-slate-800 md:mt-3 mt-2'>{currentQuestion.questionText}</p>
                    <div className='mt-4 justify-center'>
                    {currentQuestion.choices && currentQuestion.choices.map((choice, index) => (
                      <div key={index} className='flex items-center space-x-2 justify-center'>
                        <input className='w-full border-2 border-slate-300 text-slate-900 text-lg font-medium bg-slate-50 rounded p-1 px-2 mt-1'
                           type="radio"
                           id={index + 1}
                           name="answer"
                           value={index + 1}
                           checked={answer === index + 1}
                           onChange={event => setAnswer(event.target.value)}
                        />
                        <label className='text-slate-800 text-lg font-medium w-full' htmlFor={index+1}>{choice}</label>
                      </div>
                    ))}
                   <button className='bg-slate-700 text-slate-100 rounded text-lg w-full mt-6 px-6 py-2 hover:bg-slate-600 transition duration-300 ease-in-out'>
                   Submit
                  </button>
                  </div>
                </form>
              ) : (
                <p className="px-3 text-base font-base leading-6 text-slate-800 text-center">Quiz Completed!</p>
              )}
              </div>   


            </div>
          </div>
        </div>
    </div>
  )
}

export default TakeQuiz;
