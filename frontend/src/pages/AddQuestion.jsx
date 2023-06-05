import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import MultipleChoice from "../components/questionForms/MultipleChoice";
import TrueFalse from "../components/questionForms/TrueFalse";
import ShortAnswer from "../components/questionForms/ShortAnswer";
import SelectAll from "../components/questionForms/SelectAll";

const AddQuestion = () => {
  const navigate = useNavigate();

  const [questionType, setQuestionType] = useState("multiple-choice");
  const [multipleChoiceVisible, setMultipleChoiceVisible] = useState(true);
  const [trueFalseVisible, setTrueFalseVisible] = useState(false);
  const [shortAnswerVisible, setShortAnswerVisible] = useState(false);
  const [selectAllVisible, setSelectAllVisible] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    questionType === "multiple-choice"
      ? setMultipleChoiceVisible(true)
      : setMultipleChoiceVisible(false);
    questionType === "true-false"
      ? setTrueFalseVisible(true)
      : setTrueFalseVisible(false);
    questionType === "short-answer"
      ? setShortAnswerVisible(true)
      : setShortAnswerVisible(false);
    questionType === "select-all"
      ? setSelectAllVisible(true)
      : setSelectAllVisible(false);
  }, [questionType]);

  return (
    <div className="w-full py-16 px-4 shadow-lg bg-slate-200 mt-20">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="md:text-4xl text-3xl font-semibold text-slate-800 mt-2 mb-4 md:text-left text-center">
          Add Question
        </h1>
        <button
          className='className="mt-6 inline-flex items-center rounded-md bg-slate-700 px-4 py-1 text-base font-semibold text-slate-100 shadow-sm hover:bg-slate-600 transition duration-300 ease-in-out"'
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-10">
          <div className="bg-slate-100 rounded-md shadow-lg py-8 w-full text-lg">
            <div className="text-center">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800">
                  Question Options
                </h2>
                <div className="max-w-[50%] m-auto mb-6">
                  <label
                    htmlFor="location"
                    className="block text-lg font-medium leading-6 text-slate-900 text-left mt-4"
                  >
                    Question Type
                  </label>
                  <select
                    id="questionType"
                    name="questionType"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-600 sm:text-base sm:leading-6"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="select-all">Select All</option>
                    <option value="short-answer">Short Answer</option>
                    <option value="true-false">True/False</option>
                  </select>
                </div>
                {multipleChoiceVisible && <MultipleChoice id={id} />}
                {trueFalseVisible && <TrueFalse id={id} />}
                {shortAnswerVisible && <ShortAnswer id={id} />}
                {selectAllVisible && <SelectAll id={id} />}
                {/* <form className='flex flex-col space-y-4 mt-4 text-center items-center' onSubmit={handleSubmit}>
                  <div className='flex flex-col space-y-2 md:w-[70%] w-[80%]'>
                    
                    <div>
                      <button
                        type="submit"
                        className="mt-3 inline-flex items-center rounded-md bg-slate-700 px-6 py-2 text-base font-semibold text-slate-100 shadow-sm hover:bg-slate-600 transition duration-300 ease-in-out"
                      >
                        Add Question
                      </button>
                    </div>
                  </div>
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
