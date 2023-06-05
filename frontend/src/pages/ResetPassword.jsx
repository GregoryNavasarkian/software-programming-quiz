import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { resetToken } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [failure, setFailure] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setFailure(true);
      return setError("Passwords do not match.");
    }

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        `/auth/resetpassword/${resetToken}`,
        { password },
        config
      );
      console.log(data);
      setSubmitted(true);
    } catch (error) {
      setError(error.response.data.error);
      setFailure(true);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-slate-800">
      <div className="w-full flex items-center justify-center">
        <div className="bg-slate-200 md:py-10 py-4 px-12 rounded-md shadow-lg m-10">
          <h1 className="md:text-4xl text-3xl text-slate-800 font-semibold">
            Reset Password
          </h1>
          {submitted ? (
            <div>
              <p className="font-medium text-lg text-slate-800 md:mt-3 mt-2">
                Your password has be reset.{" "}
              </p>
              <Link to="/login">Login</Link>
            </div>
          ) : (
            <div>
              {failure ? (
                <p className="font-bold text-lg text-red-600 md:mt-3 mt-2">
                  {error}
                </p>
              ) : (
                <p className="font-medium text-lg text-slate-800 md:mt-3 mt-2">
                  Reset your password below.
                </p>
              )}
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label
                    className="text-slate-800 md:text-lg sm:text-base font-medium w-full"
                    htmlFor="password"
                  >
                    Password (minimum 6 characters)
                  </label>
                  <input
                    type="password"
                    className="w-full border-2 border-slate-300 text-slate-900 md:text-lg sm:text-base font-medium bg-slate-50 rounded p-1 px-2 mt-1"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <label
                    className="text-slate-800 md:text-lg sm:text-base font-medium w-full mt-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full border-2 border-slate-300 text-slate-900 md:text-lg sm:text-base font-medium bg-slate-50 rounded p-1 px-2 mt-1"
                    placeholder="Enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    className="bg-slate-700 text-slate-100 rounded text-lg w-full md:mt-6 mt-4 px-6 md:py-2 sm:py-1 hover:bg-slate-600 transition duration-300 ease-in-out"
                    type="submit"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
