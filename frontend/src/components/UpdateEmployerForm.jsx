import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateEmployerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [failure, setFailure] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployerData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get("/auth", config);
        setName(data.employer.name);
        setEmail(data.employer.email);
      } catch (error) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }
    };
    fetchEmployerData();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const submit = await axios.put("/auth/update", { name, email }, config);
      if (submit) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setFailure(true);
      setError("Failed to update profile. Please try again later.");
    }
  };

  return (
    <div className="bg-slate-200 py-10 px-12 rounded-md shadow-lg m-4">
      <h1 className="md:text-4xl text-3xl text-slate-800 font-semibold">
        User Profile
      </h1>
      {failure ? (
        <p className="font-bold text-lg text-red-600 md:mt-3 mt-2">{error}</p>
      ) : (
        <p className="font-medium text-lg text-slate-800 md:mt-3 mt-2">
          Please update the information you would like to change
        </p>
      )}
      <form className="md:mt-5 mt-4" onSubmit={handleSubmit}>
        <div>
          <div>
            <label
              className="text-slate-800 text-lg font-medium w-full"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full border-2 border-slate-300 text-slate-900 text-lg font-medium bg-slate-50 rounded p-1 px-2 mt-1"
              onChange={handleNameChange}
              value={name}
              type="text"
              name="name"
              id="name"
              required
            />
          </div>
          <div className="mt-2">
            <label
              className="text-slate-800 text-lg font-medium w-full"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full border-2 border-slate-300 text-slate-900 text-lg font-medium bg-slate-50 rounded p-1 px-2 mt-1"
              onChange={handleEmailChange}
              value={email}
              type="email"
              name="email"
              id="email"
              required
            />
          </div>
          <p className="text-slate-800 text-base font-medium mt-2">
            <Link
              to="/forgot-password"
              className="text-slate-700 hover:text-slate-900 hover:underline"
            >
              Reset Password
            </Link>
          </p>
          <div>
            <button className="bg-slate-700 text-slate-100 rounded text-lg w-full mt-6 px-6 py-2 hover:bg-slate-600 transition duration-300 ease-in-out">
              Update
            </button>
          </div>
          <div>
            <p className="text-slate-800 text-lg font-medium mt-4">
              Return to your dashboard here:{" "}
              <Link
                to="/dashboard"
                className="text-slate-700 hover:text-slate-900 hover:underline"
              >
                My Dashboard
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployerForm;
