import React from "react";
import { useState } from "react";
import axios from "axios";

const TrueFalse = ({ id }) => {
  const [questionText, setQuestionText] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const questionType = "true-false";
    const choices = ["True", "False"];
    const correctAnswers = [answer];
    const question = {
      questionType,
      questionText,
      choices,
      correctAnswers,
    };
    try {
      await axios.post(
        `https://software-programming-quiz-api.onrender.com/quiz/${id}/question`,
        question,
        config
      );
      setQuestionText("");
      setAnswer("");
      alert("Question created successfully");
    } catch (error) {
      console.log(error.response.data.error);
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col space-y-4 mt-4 text-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-2 md:w-[70%] w-[80%]">
          <label
            htmlFor="question"
            className="text-slate-800 font-semibold text-left"
          >
            Question
          </label>
          <input
            onChange={(e) => setQuestionText(e.target.value)}
            value={questionText}
            type="text"
            name="question"
            id="question"
            placeholder="Enter True/False statement"
            required
            className="border border-slate-800 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent"
          />
          <label
            htmlFor="answer"
            className="text-slate-800 font-semibold text-left"
          >
            Answer
          </label>
          <input
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            type="text"
            name="answer"
            id="answer"
            placeholder="Answer (enter True or False)"
            required
            className="border border-slate-800 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent"
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
  );
};

export default TrueFalse;
