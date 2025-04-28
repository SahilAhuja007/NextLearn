import React, { useState } from "react";
// import signupImage from "../../assets/109abc82-fcef-469a-ba3b-1028fbe83eaa.png";

const Signup = () => {
  const [userType, setUserType] = useState("Student");

  return (
    <div className="flex min-h-screen items-center justify-center bg-richblack-900 p-6">
      <div className="flex w-full max-w-5xl items-center justify-between bg-richblack-800 p-8 rounded-lg">
        <div className="w-1/2 flex flex-col gap-6 text-white">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Join the millions learning to code with StudyNotion for free
            </h1>
            <p className="text-richblack-300 text-sm">
              Build skills for today, tomorrow, and beyond.{" "}
              <span className="text-blue-300 italic">
                Education to future-proof your career.
              </span>
            </p>
          </div>

          <div className="flex gap-2 bg-richblack-700 p-1 rounded-full w-fit">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                userType === "Student"
                  ? "bg-richblack-900 text-white"
                  : "text-richblack-300"
              }`}
              onClick={() => setUserType("Student")}
            >
              Student
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                userType === "Instructor"
                  ? "bg-richblack-900 text-white"
                  : "text-richblack-300"
              }`}
              onClick={() => setUserType("Instructor")}
            >
              Instructor
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex flex-col w-1/2">
                <label htmlFor="firstName" className="text-sm mb-1">
                  First Name <span className="text-pink-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className="p-3 rounded-md bg-richblack-700 text-white outline-none"
                />
              </div>

              <div className="flex flex-col w-1/2">
                <label htmlFor="lastName" className="text-sm mb-1">
                  Last Name <span className="text-pink-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className="p-3 rounded-md bg-richblack-700 text-white outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="p-3 rounded-md bg-richblack-700 text-white outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm mb-1">
                Phone Number <span className="text-pink-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  id="countryCode"
                  className="p-3 rounded-md bg-richblack-700 text-white outline-none w-1/4"
                  defaultValue="+91"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  id="phone"
                  type="text"
                  placeholder="12345 67890"
                  className="p-3 rounded-md bg-richblack-700 text-white outline-none w-3/4"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col w-1/2 relative">
                <label htmlFor="password" className="text-sm mb-1">
                  Create Password <span className="text-pink-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  className="p-3 rounded-md bg-richblack-700 text-white outline-none"
                />
                <div className="absolute right-3 top-11 text-richblack-300 cursor-pointer">
                  👁️
                </div>
              </div>

              <div className="flex flex-col w-1/2 relative">
                <label htmlFor="confirmPassword" className="text-sm mb-1">
                  Confirm Password <span className="text-pink-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Enter Password"
                  className="p-3 rounded-md bg-richblack-700 text-white outline-none"
                />
                <div className="absolute right-3 top-11 text-richblack-300 cursor-pointer">
                  👁️
                </div>
              </div>
            </div>

            <button className="bg-yellow-400 text-black font-bold w-full py-3 rounded-md mt-4 hover:bg-yellow-300 transition-all">
              Create Account
            </button>
          </div>
        </div>

        {/* <div className="w-1/2 flex justify-center items-center">
          <img
            src={signupImage}
            alt="Signup Visual"
            className="w-full max-w-sm object-cover rounded-md"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Signup;
