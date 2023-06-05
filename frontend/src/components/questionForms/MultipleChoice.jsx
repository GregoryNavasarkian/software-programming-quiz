import React from "react";
import { useState } from "react";
import axios from "axios";

const MultipleChoice = ({ id }) => {
  const [questionText, setQuestionText] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const questionType = "multiple-choice";
    const choices = [option1, option2, option3, option4];
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
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
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
            placeholder="Enter question"
            required
            className="border border-slate-800 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent"
          />
          <label
            htmlFor="option1"
            className="text-slate-800 font-semibold text-left"
          >
            Option 1
          </label>
          <input
            onChange={(e) => setOption1(e.target.value)}
            value={option1}
            type="text"
            name="option1"
            id="option1"
            placeholder="Option 1"
            required
            className="border border-slate-800 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent"
          />
          <label
            htmlFor="option2"
            className="text-slate-800 font-semibold text-left"
          >
            Option 2
          </label>
          <input
            onChange={(e) => setOption2(e.target.value)}
            value={option2}
            type="text"
            name="option2"
            id="option2"
            placeholder="Option 2"
            required
            className="border border-slate-800 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent"
          />
          <label
            htmlFor="option3"
            className="text-slate-800 font-semibold text-left"
          >
            Option 3
          </label>
          <input
            onChange={(e) => setOption3(e.target.value)}
            value={option3}
            type="text"
            name="option3"
            id="option3"
            placeholder="Option 3"
            required
            className="border border-slate-800 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent"
          />
          <label
            htmlFor="option4"
            className="text-slate-800 font-semibold text-left"
          >
            Option 4
          </label>
          <input
            onChange={(e) => setOption4(e.target.value)}
            value={option4}
            type="text"
            name="option4"
            id="option4"
            placeholder="Option 4"
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
            placeholder="Answer (match case)"
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

export default MultipleChoice;
