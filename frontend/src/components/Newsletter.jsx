import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email }));
    try {
      const res = await fetch("/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      setEmail("");
      console.log(res.status);
      if (res.status === 201) {
        console.log("Email added to newsletter");
        setIsClicked(true);
      } else {
        alert("Email already exists or is invalid");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full py-16 text-slate-50 px-6 bg-slate-800">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
        <div className="lg:col-span-2 my-4">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Want to find better candidates?
          </h1>
          <p>Sign up to our newsletter and stay up to date.</p>
        </div>
        <div className="my-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
              <input
                className="p-2 flex w-full rounded text-slate-900 bg-slate-50"
                type="email"
                required
                onChange={handleEmailChange}
                value={email}
                placeholder="Enter your email"
              />
              {!isClicked ? (
                <button className="bg-slate-700 text-slate-100 rounded text-lg w-[200px] ml-2 my-6 px-6 py-2 hover:bg-slate-600 transition duration-300 ease-in-out">
                  Notify Me
                </button>
              ) : (
                <p className="text-slate-100 rounded text-lg w-[200px] ml-2 my-6 px-6 py-2">
                  Subscribed!
                </p>
              )}
            </div>
          </form>
          <p>
            We care about the protection of your data. Read our{" "}
            <Link href="/privacy">
              <span className="text-slate-50 hover:underline">
                Privacy Policy.
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
