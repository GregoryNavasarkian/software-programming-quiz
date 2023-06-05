import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CandidateResult = () => {
  const [quiz, setQuiz] = useState({});
  const [candidate, setCandidate] = useState({});
  const [quizTaken, setQuizTaken] = useState({});
  const [score, setScore] = useState(0);

  const { candidateId, quizId } = useParams();

  useEffect(() => {
    const fetchCandidateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get(
          `https://software-programming-quiz-api.onrender.com/candidate/${quizId}/taken`,
          config
        );
        for (let i = 0; i < data.candidates.length; i++) {
          if (data.candidates[i]._id === candidateId) {
            setCandidate(data.candidates[i]);
            setQuizTaken(data.candidates[i].quizTaken[0]);
            setScore(data.candidates[i].quizTaken[0].score);
          }
        }
        if (quizTaken === undefined) {
          window.alert("The candidate has not yet taken this quiz.");
          window.location.replace(`/dashboard`);
        }
      } catch (error) {
        console.log(error.response.data.error);
        window.alert(error.response.data.error);
      }
    };
    fetchCandidateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateId, quizId]);

  useEffect(() => {
    const fetchQuizData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get(
          `https://software-programming-quiz-api.onrender.com/quiz/${quizId}`,
          config
        );
        setQuiz(data.quiz);
      } catch (error) {
        console.log(error.response.data.error);
        alert(error.response.data.error);
      }
    };
    fetchQuizData();
  }, [quizId]);

  return (
    <div className="w-full min-h-screen py-16 px-4 shadow-lg bg-slate-200 mt-20">
      <div className="max-w-[1250px] mx-auto">
        <h1 className="md:text-4xl text-3xl font-semibold text-slate-800 mt-2 mb-4 md:text-left text-center">
          {quiz.title} Results | {candidate.name}
        </h1>
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-10">
          <div className="bg-slate-100 rounded-md shadow-lg py-8 w-full text-lg">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800 mb-4 px-10">
                Quiz Score: {score}
              </h1>
              <div className="relative mt-5">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-[90%] border-t border-slate-400 m-auto" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-slate-100 mb-4 px-3 text-xl font-semibold leading-6 text-slate-800">
                    Candidate Answers
                  </span>
                </div>
              </div>
              {quizTaken.answers &&
                quizTaken.answers.map((answer, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 justify-center"
                  >
                    <p className="">
                      Answer {index + 1}:{" "}
                      <span className="font-semibold">{answer.answer}</span>
                    </p>
                  </div>
                ))}
              <div className="relative mt-5">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-[90%] border-t border-slate-400 m-auto" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-slate-100 px-3 text-xl font-semibold leading-6 text-slate-800">
                    Questions
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                {quiz.questions &&
                  quiz.questions.map((question, index) => (
                    <div key={index} className="mt-4">
                      <div className="flex justify-center">
                        <div className=" flex-col m-auto">
                          <p className="px-3 mt-3 text-lg font-semibold leading-6 text-slate-800">
                            Question {index + 1}: {question.questionText}
                          </p>
                          <p className="px-3 text-base font-base leading-6 text-slate-800 text-center">
                            {question.questionType}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 justify-center">
                        {question.choices &&
                          question.choices.map((choice, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 justify-center"
                            >
                              <p className="">
                                Choice {index + 1}: {choice}
                              </p>
                            </div>
                          ))}
                      </div>
                      {question.correctAnswers &&
                        question.correctAnswers.map((answer, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 justify-center"
                          >
                            <p>Correct Answer: {answer}</p>
                          </div>
                        ))}
                      <hr className="border-1 border-slate-300" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateResult;
