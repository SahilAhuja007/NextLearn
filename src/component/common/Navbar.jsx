import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoS from "../../assets/Logo/Logo-Small-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import {
  IoIosArrowDropdown,
  IoIosArrowDropdownCircle,
  IoIosSearch,
} from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import CTAButton from "../../component/core/Home/button";
import { useSelector } from "react-redux";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import Profile from "../core/auth/profile";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [activeButton, setActiveButton] = useState("");
  const [showCatalog, setShowCatalog] = useState(false);
  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      console.log("api:-", categories.CATEGORIES_API);
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.data);
    } catch (error) {
      console.error("Issue while fetching the category list:", error);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const handleButtonClick = (title) => {
    setActiveButton(title);
  };

  return (
    <div className="flex items-center justify-between px-10 py-4 bg-richblack-600 relative">
      <div className="flex items-center gap-2">
        <img src={logoS} alt="Logo" className="w-8 h-8" />
        <h1 className="text-white font-bold text-lg">StudyNotion</h1>
      </div>

      <div className="flex items-center gap-6">
        {NavbarLinks.map((navbar) => (
          <div
            key={navbar.title}
            className="relative"
            onMouseEnter={() =>
              navbar.title === "Catalog" && setShowCatalog(true)
            }
            onMouseLeave={() =>
              navbar.title === "Catalog" && setShowCatalog(false)
            }
            onClick={() => handleButtonClick(navbar.title)}
          >
            {navbar.title === "Catalog" ? (
              <div className="relative flex items-center gap-2 group">
                <p>{navbar.title}</p>
                <IoIosArrowDropdownCircle />
                <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[80%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                  <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5"></div>
                  {subLinks.length ? (
                    subLinks.map((subLink, index) => (
                      <Link to={`/catalog/${subLink.name} `} key={index}>
                        <p>{subLink.name}</p>
                      </Link>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            ) : (
              <CTAButton
                text={navbar.title}
                linkto={navbar.path}
                active={activeButton === navbar.title}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {user && user.accountType !== "Instructor" && (
          <Link to="/dashboard/cart" className="relative">
            <FaCartShopping />
            {totalItems > 0 && <span>{totalItems}</span>}
          </Link>
        )}
        {token == null && (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        {token == null && (
          <Link to="/signup">
            <button>Signup</button>
          </Link>
        )}
        {token !== null && <Profile />}
      </div>
    </div>
  );
};

export default Navbar;
