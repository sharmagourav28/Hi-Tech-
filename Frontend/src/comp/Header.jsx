import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = location.state || { role: "Guest" };

  const handleLogoutClick = () => {
    navigate("/"); // Navigate to the login page
  };

  return (
    <header className="border-b py-4 bg-white tracking-wide fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl w-full mx-auto flex flex-wrap items-center gap-4 px-4 sm:px-10">
        <a href="javascript:void(0)">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-40"
          />
        </a>
        <div id="collapseMenu" className="max-lg:hidden lg:!block">
          <ul className="lg:flex lg:ml-12 lg:gap-x-6">
            {role === "Admin" && (
              <li>
                <Link
                  to="/admin"
                  className="hover:text-blue-600 block font-bold transition-all"
                >
                  ADMIN
                </Link>
              </li>
            )}
            {role === "PDI Tester" && (
              <li>
                <Link
                  to="/pdi"
                  className="hover:text-blue-600 block font-bold transition-all"
                >
                  PDI
                </Link>
              </li>
            )}
            {role === "Hydro Tester" && (
              <li>
                <Link
                  to="/hydro"
                  className="hover:text-blue-600 block font-bold transition-all"
                >
                  HYDRO
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex ml-auto">
          <button
            onClick={handleLogoutClick}
            className="bg-blue-100 hover:bg-blue-200 flex items-center transition-all font-semibold rounded-md px-5 py-3"
          >
            LogOut
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[14px] fill-current ml-2"
              viewBox="0 0 492.004 492.004"
            >
              <path d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
