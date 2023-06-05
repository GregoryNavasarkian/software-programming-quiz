import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import QuizResultCard from "../components/QuizResultCard";

const QuizResults = () => {
  const [takenQuizzes, setTakenQuizzes] = useState([]);
  const [isQuizTaken, setIsQuizTaken] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get(
          `https://software-programming-quiz-api.onrender.com/candidate/${id}/taken`,
          config
        );
        if (data.candidates.length > 0) setIsQuizTaken(true);
        let sortedArr = data.candidates;
        // eslint-disable-next-line array-callback-return
        sortedArr.sort((a, b) => {
          // sort by score
          if (a.quizTaken[0].score > b.quizTaken[0].score) return -1;
          if (a.quizTaken[0].score < b.quizTaken[0].score) return 1;
        });
        setTakenQuizzes(sortedArr);
      } catch (error) {
        console.log(error.response.data.error);
        alert(error.response.data.error);
      }
    };
    fetchResults();
  }, [id]);

  return (
    <div className="w-full min-h-screen py-16 px-4 shadow-lg bg-slate-200 mt-20">
      <div className="max-w-[1250px] mx-auto">
        <h1 className="md:text-4xl text-3xl font-semibold text-slate-800 mt-2 md:text-left text-center">
          Results
        </h1>
        <p className="text-slate-900 text-lg mt-1">
          Note: Sort Answer Questions not counted in score.
        </p>
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-8">
          <div className="bg-slate-100 rounded-md shadow-lg py-8 w-full text-lg">
            <div className="text-center">
              {!isQuizTaken && (
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
                  <h3 className="mt-2 text-base font-semibold text-slate-900">
                    Quiz not taken by any candidates
                  </h3>
                </div>
              )}
              {isQuizTaken &&
                takenQuizzes.map((quiz, index) => (
                  <div key={index} className="p-3">
                    <QuizResultCard candidate={quiz} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
