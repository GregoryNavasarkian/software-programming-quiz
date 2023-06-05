import React from "react";
import { Link } from "react-router-dom";

const QuizResultCard = ({ candidate }) => {
  const formatDate = (date) => {
    const date1 = date.split("T")[0];
    const date2 = date1.split("-").join("/");
    const year = date2.split("/")[0];
    const month = date2.split("/")[1];
    const day = date2.split("/")[2];
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="bg-slate-200 px-4 py-5 sm:px-6 rounded-md shadow-md">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="flex-row ml-4 mt-2">
          <Link
            to={`/quiz-results-detail/${candidate._id}/${candidate.quizTaken[0].quizId}`}
          >
            <h3 className="text-lg text-left font-semibold leading-6 text-gray-900 hover:underline">
              {candidate.name}
            </h3>
          </Link>
          <p className="text-base">
            {formatDate(candidate.quizTaken[0].takenAt)}
          </p>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <p className="font-semibold">Score: {candidate.quizTaken[0].score}</p>
        </div>
      </div>
    </div>
  );
};

export default QuizResultCard;
