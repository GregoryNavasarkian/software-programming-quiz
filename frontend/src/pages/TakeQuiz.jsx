import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TakeQuiz = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState([]);  
  const [timeRemaining, setTimeRemaining] = useState(100);  
  const [questionIndex, setIndex] = useState(1);
  const [checkedItems, setCheckedItems] = useState([]);
  
  const { id } = useParams();

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
        setDataLoaded(true);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizData();    
  }, [id]);

  useEffect(() => {
        const intervalId = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1)
    }, 60000);

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
    if (dataLoaded) {   
    setTimeRemaining(quiz.timeLimit);
    setCurrentQuestion(quiz.questions[0]);
  }}, [dataLoaded, quiz.timeLimit, quiz.questions]);

  const handleSubmit = event => {
    event.preventDefault();
    setIndex(prevIndex => prevIndex + 1);
    if (checkedItems.length !== 0) {
      setAnswer(checkedItems);
      setCheckedItems([]);
    };
    if (questionIndex === quiz.questions.length){
        setCurrentQuestion('done');
    } else {
        setCurrentQuestion(quiz.questions[questionIndex]);
    }
    setAnswer([]);  
//implement saveAnswer(currentQuestion.id, answer);
  }

  
  return (
    <div className='w-full py-16 px-4 shadow-lg bg-slate-200 mt-20'>
      <div className='max-w-[1250px] mx-auto'>
        <h1 className='md:text-4xl text-3xl font-semibold text-slate-800 mt-2 mb-4 md:text-left text-center'>{quiz.title}</h1>
        <div className='flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-20'>
          <div className='bg-slate-100 rounded-md shadow-lg py-8 w-full text-lg'>
            <div className="relative">
              </div>
            <div className='bg-slate-100 py-10 px-20 rounded-md shadow-lg m-4'>
              {currentQuestion !== undefined && currentQuestion === 'done' ? (
                    <div className='text-center max-w-[1000px] mx-auto'>
                    <h1 className='text-slate-800 md:text-4xl text-2xl font-bold'>Quiz Completed!</h1>
                    <button className='bg-slate-700 text-slate-100 rounded text-lg mt-6 px-6 py-2 hover:bg-slate-600 transition duration-300 ease-in-out'>
                       Send results to your potential employer!
                    </button>
                    </div>
              ) : currentQuestion !== undefined ? (
                <div>
                <p className='text-slate-800 mb-4'>Time Remaining: {timeRemaining}</p>
                <form className='md:mt-5 mt-4' onSubmit={handleSubmit}>
                    <p className='font-medium text-lg text-slate-800 md:mt-3 mt-2'>{currentQuestion.questionText}</p>
                    <div className='mt-4 justify-center'>
                    {currentQuestion.choices[0] === undefined ? (
                      <div className='flex items-center space-x-2 justify-center'>
                      <textarea className='w-full border-2 border-slate-300 text-slate-900 text-lg font-medium bg-slate-50 rounded p-1 px-2 mt-1'
                      placeholder="Enter your answer here"
                      type="text"
                      rows="4"
                      name="answer"
                      id="answer"
                      onChange={event => setAnswer(event.target.value)}
                      required
                      />
                      </div>
                    ) : currentQuestion.questionType === 'multiple-choice' ? 
                      currentQuestion.choices.map((choice, index) => (
                      <div key={index} className='flex items-center space-x-2 justify-center'>
                        <input className='border-2 border-slate-300 text-slate-900 text-lg font-medium bg-slate-50 rounded '
                           type="checkbox"
                           id={choice}
                           name="answer"
                           value={choice}
                           checked={checkedItems.includes(choice)}
                           onChange={event => {
                            if (event.target.checked) {
                            setCheckedItems([...checkedItems, event.target.value]);
                          } else {
                            setCheckedItems(checkedItems.filter((item) => item !== event.target.value));
                          } }}
                        />
                        <label className='text-slate-800 text-lg font-medium w-full' htmlFor={index+1}>{choice}</label>
                      </div>
                    )) : currentQuestion.choices && currentQuestion.choices.map((choice, index) => (
                      <div key={index} className='flex items-center space-x-2 justify-center'>
                        <input className='border-2 border-slate-300 text-slate-900 text-lg font-medium bg-slate-50 rounded '
                           type="radio"
                           id={choice}
                           name="answer"
                           value={choice}
                           checked={answer === choice}
                           onChange={event => setAnswer(event.target.value)}
                           required
                        />
                        <label className='text-slate-800 text-lg font-medium w-full' htmlFor={index+1}>{choice}</label>
                      </div>
                    ))}
                   <button className='bg-slate-700 text-slate-100 rounded text-lg mt-6 px-6 py-2 hover:bg-slate-600 transition duration-300 ease-in-out' disabled={currentQuestion.questionType === 'multiple-choice' && checkedItems.length === 0}>
                   Submit
                  </button>
                  </div>
                </form>
                </div>
              ) : <p>Quiz Loading...</p>}
              </div>   
            </div>
          </div>
        </div>
    </div>
  )
}

export default TakeQuiz;
