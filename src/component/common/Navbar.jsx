import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoS from "../../assets/Logo/Logo-Small-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { IoIosSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import CTAButton from "../../component/core/Home/button";

const Navbar = () => {
  const [activeButton, setActiveButton] = useState("");

  const handlebuttonClick = (title) => {
    setActiveButton(title);
  };
  return (
    <div className="flex items-center justify-between px-10 py-4 bg-richblack-600">
      <div className="flex items-center gap-2">
        <img src={logoS} alt="Logo" className="w-8 h-8" />
        <h1 className="text-white font-bold text-lg">StudyNotion</h1>
      </div>

      <div className="flex items-center gap-6">
        {NavbarLinks.map((navbar) => (
          <div
            key={navbar.title}
            onClick={() => handlebuttonClick(navbar.title)}
          >
            <CTAButton
              text={navbar.title}
              linkto={navbar.path}
              active={activeButton === navbar.title}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="text-white text-xl">
          <IoIosSearch />
        </button>
        <button className="text-white text-xl">
          <FaCartShopping />
        </button>
        <Link to="/signup">
          <button className="text-white border border-richblack-700 px-4 py-2 rounded-md hover:bg-richblack-700 transition-all">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="text-white border border-richblack-700 px-4 py-2 rounded-md hover:bg-richblack-700 transition-all">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
