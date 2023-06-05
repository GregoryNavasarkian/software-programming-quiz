import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CandidateTable = ({ quizId, candidates }) => {
  const handleDelete = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios.delete(
        `https://software-programming-quiz-api.onrender.com/candidate/${id}`,
        config
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  return (
    <div className="mt-10 px-4 py-6 sm:px-6 lg:px-8 bg-slate-50 rounded-md shadow-md">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <Link to={`/add-candidate/${quizId}`}>
            <button
              type="button"
              className="relative inline-flex items-center rounded-md bg-slate-700 px-3 py-2 text-base font-semibold text-slate-50 shadow-sm hover:bg-slate-600 focus-visible:outline transition duration-300"
            >
              Add Candidate
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-slate-500">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-md font-semibold text-slate-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-md font-semibold text-slate-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-md font-semibold text-slate-900"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {candidates.map((candidate) => (
                  <tr key={candidate.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-md font-medium text-slate-900 sm:pl-0">
                      {candidate.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-slate-800">
                      {candidate.email}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-md font-medium sm:pr-0">
                      <button
                        type="button"
                        onClick={() => handleDelete(candidate._id)}
                        className="rounded-md bg-slate-600 px-6 py-2 text-base font-base text-slate-50 shadow-sm hover:bg-slate-500 focus-visible:outline transition duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateTable;
