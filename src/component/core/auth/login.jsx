import React, { useState } from "react";

const Login = () => {
  const [userType, setUserType] = useState("Student");

  return (
    <div className="flex min-h-screen items-center justify-center bg-richblack-900 p-6">
      <div className="flex w-full max-w-5xl items-center justify-between bg-richblack-800 p-8 rounded-lg">
        {/* Left side - Form */}
        <div className="w-1/2 flex flex-col gap-6 text-white">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-richblack-300 text-sm">
              Build skills for today, tomorrow, and beyond.{" "}
              <span className="text-blue-300 italic">
                Education to future-proof your career.
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-md bg-richblack-700 text-white outline-none"
              />
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="password" className="text-sm mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="p-3 rounded-md bg-richblack-700 text-white outline-none"
              />
              <div className="absolute right-3 top-11 text-richblack-300 cursor-pointer">
                👁️
              </div>
            </div>

            <button className="bg-yellow-400 text-black font-bold w-full py-3 rounded-md mt-4 hover:bg-yellow-300 transition-all">
              Sign In
            </button>
          </div>
        </div>

        {/* Right side - Image */}
        {/* <div className="w-1/2 flex justify-center items-center">
          <img
            src={require("../../assets/109abc82-fcef-469a-ba3b-1028fbe83eaa.png")}
            alt="Login Visual"
            className="w-full max-w-sm object-cover rounded-md"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Login;
