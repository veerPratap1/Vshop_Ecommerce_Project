import React, { useState } from "react";
import "./admin.css";
import { Link } from "react-router-dom";
import useDarkSide from "../../../useDarkSide";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { selectAllProduct } from "../../Product-list/ProductSlice";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../user/UserSlice";
import logo from "../../comman/image/InShot_20231201_124429607.png";


const AdminNavbar = ({ children }) => {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const handleSelect = () => {
    const select_li = document.getElementById("desplegable");
    select_li.classList.toggle("hidden");
  };

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const products = useSelector(selectAllProduct);

  const user = useSelector(selectUserInfo);

  const DeletedProduct = products.filter((product) => product.deleted === true);

  return (
    <>
      {user && user.role === "admin" && (
        <div>
          <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-200 dark:bg-gray-600 text-black dark:text-white">
            {/* Header */}
            <div className="fixed w-full flex items-center justify-between h-14 text-white z-50">
              <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-cyan-800 dark:bg-gray-800 border-none">
                <img
                  className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
                  src={`/${user.profileImg}`}
                  alt="user"
                />
                <span className="hidden md:block">{user.name}</span>
              </div>
              <div className="flex justify-between items-center h-14 bg-cyan-800 dark:bg-gray-800 header-right">
                <div className="font-bold flex items-center text-white">
                  <Link to={"/"}>
                    <img className="h-7 w-8" src={logo} alt="Your Company" />
                  </Link>
                  <h1 className="text-white ms-2 text-3xl">VSHOP</h1>
                </div>
                <ul className="flex items-center">
                  <li>
                    <button
                      aria-hidden="true"
                      className="group transition-colors duration-200 p-1 rounded-full shadow-md bg-cyan-200 hover:bg-cyan-200 dark:bg-gray-700 dark:hover:bg-gray-500 text-gray-900 focus:outline-none"
                    >
                      <DarkModeSwitch
                        checked={darkSide}
                        onChange={toggleDarkMode}
                        size={24}
                      />
                    </button>
                  </li>
                  <li>
                    <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700" />
                  </li>
                  <li>
                    <Link
                      to="/logout"
                      className="flex items-center mr-4 hover:text-blue-100"
                    >
                      <span className="inline-flex mr-1">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                      </span>
                      Logout 
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* ./Header */}
            {/* Sidebar */}
            <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 z-50 bg-cyan-900 dark:bg-gray-800 h-full text-white transition-all duration-300 border-none z-10 sidebar">
              <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                <ul className="flex flex-col py-4 space-y-1">
                  <li className="px-5 hidden md:block">
                    <div className="flex flex-row items-center h-8">
                      <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                        Main
                      </div>
                    </div>
                  </li>

                  <li>
                    <Link
                      to={"/admin/AdminDashboard"}
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 dark:hover:border-gray-800 pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Dashboard
                      </span>
                    </Link>
                  </li>
                  <li className="focus:outline-none items-center hover:bg-cyan-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 dark:hover:border-gray-800">
                    <div
                      className="flex items-center justify-start p-2"
                      onClick={() => handleSelect()}
                    >
                      <i className="ms-3 fa-regular fa-file w-5 h-5"></i>
                      <span className="ms-1 text-sm w-44 tracking-wide truncate">
                        Catalogue
                      </span>
                      <i className="fas fa-chevron-down text-xs  mr-2" />
                    </div>
                    <ul className="hidden" id="desplegable">
                      <li className="focus:outline-none p-2 items-center hover:bg-cyan-500 dark:hover:bg-gray-700 text-white-600 hover:text-white-800 border-transparent hover:border-cyan-500 dark:hover:border-gray-800">
                        <Link
                          to={"/admin/addCategory"}
                          className="ml-2 text-sm tracking-wide truncate"
                        >
                          <i className="fas fa-chevron-right mr-2 text-xs" />
                          Add Categories
                        </Link>
                      </li>
                      <li className="focus:outline-none p-2 items-center hover:bg-cyan-500 dark:hover:bg-gray-700 text-white-600 hover:text-white-800 border-transparent hover:border-cyan-500 dark:hover:border-gray-800">
                        <Link
                          to={"/admin/addSubCategory"}
                          className="ml-2 text-sm tracking-wide truncate hover:bg-"
                        >
                          <i className="fas fa-chevron-right mr-2 text-xs" />
                          Add Sub-Categories
                        </Link>
                      </li>
                      <li className="focus:outline-none p-2 items-center hover:bg-cyan-500 dark:hover:bg-gray-700 text-white-600 hover:text-white-800 border-transparent hover:border-cyan-500 dark:hover:border-gray-800">
                        <Link
                          to={"/admin/CategoryList"}
                          className="ml-2 text-sm tracking-wide truncate hover:bg-"
                        >
                          <i className="fas fa-chevron-right mr-2 text-xs" />
                          Categories List
                        </Link>
                      </li>
                      <li className="focus:outline-none p-2 items-center hover:bg-cyan-500 dark:hover:bg-gray-700 text-white-600 hover:text-white-800 border-transparent hover:border-cyan-500 dark:hover:border-gray-800">
                        <Link
                          to={"/admin/SubCategoryList"}
                          className="ml-2 text-sm tracking-wide truncate hover:bg-"
                        >
                          <i className="fas fa-chevron-right mr-2 text-xs" />
                          Sub-Categories List
                        </Link>
                      </li>
                      <li className="focus:outline-none p-2 items-center hover:bg-cyan-500 dark:hover:bg-gray-700 text-white-600 hover:text-white-800 border-transparent hover:border-cyan-500 dark:hover:border-gray-800">
                        <Link
                          to={"/admin/addBrand"}
                          className="ml-2 text-sm tracking-wide truncate hover:bg-"
                        >
                          <i className="fas fa-chevron-right mr-2 text-xs" />
                          Add Brand
                        </Link>
                      </li>
                      <li className="focus:outline-none p-2 items-center hover:bg-cyan-500 dark:hover:bg-gray-700 text-white-600 hover:text-white-800 border-transparent hover:border-cyan-500 dark:hover:border-gray-800">
                        <Link
                          to={"/admin/brandList"}
                          className="ml-2 text-sm tracking-wide truncate hover:bg-"
                        >
                          <i className="fas fa-chevron-right mr-2 text-xs" />
                          Brands List
                        </Link>
                      </li>
                      <li className="focus:outline-none p-2 items-center hover:bg-cyan-500 dark:hover:bg-gray-700 text-white-600 hover:text-white-800 border-transparent hover:border-cyan-500 dark:hover:border-gray-800">
                        <Link
                          to={"/admin/addColour"}
                          className="ml-2 text-sm tracking-wide truncate hover:bg-"
                        >
                          <i className="fas fa-chevron-right mr-2 text-xs" />
                          Add Colours
                        </Link>
                      </li>
                      <li className="focus:outline-none p-2 items-center hover:bg-cyan-500 dark:hover:bg-gray-700 text-white-600 hover:text-white-800 border-transparent hover:border-cyan-500 dark:hover:border-gray-800">
                        <Link
                          to={"/admin/addSize"}
                          className="ml-2 text-sm tracking-wide truncate hover:bg-"
                        >
                          <i className="fas fa-chevron-right mr-2 text-xs" />
                          Add Sizes
                        </Link>
                      </li>
                      <li className="focus:outline-none p-2 items-center hover:bg-cyan-500 dark:hover:bg-gray-700 text-white-600 hover:text-white-800 border-transparent hover:border-cyan-500 dark:hover:border-gray-800">
                        <Link
                          to={"/admin/coloursList"}
                          className="ml-2 text-sm tracking-wide truncate hover:bg-"
                        >
                          <i className="fas fa-chevron-right mr-2 text-xs" />
                          Colours List
                        </Link>
                      </li>
                      <li className="focus:outline-none p-2 items-center hover:bg-cyan-500 dark:hover:bg-gray-700 text-white-600 hover:text-white-800 border-transparent hover:border-cyan-500 dark:hover:border-gray-800">
                        <Link
                          to={"/admin/sizeList"}
                          className="ml-2 text-sm tracking-wide truncate hover:bg-"
                        >
                          <i className="fas fa-chevron-right mr-2 text-xs" />
                          Sizes List
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      to={"/admin/addProduct"}
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 dark:hover:border-gray-800 pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Add Product
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/admin/productList"}
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 dark:hover:border-gray-800 pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <i className="w-5 h-4 fa-solid fa-list"></i>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Product List
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/admin/orderList"}
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 dark:hover:border-gray-800 pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <i className="fa-solid fa-dolly w-5 h-4"></i>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Order List
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/recycleBin"
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 dark:hover:border-gray-800 pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <i className="fas fa-trash-alt"></i>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Recycle Bin
                      </span>
                      {DeletedProduct && (
                        <span className=" hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                          {DeletedProduct.length}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className="px-5 hidden md:block">
                    <div className="flex flex-row items-center mt-5 h-8">
                      <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                        Settings
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/admin/profile"
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 dark:hover:border-gray-800 pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Profile
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/"}
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 dark:hover:border-gray-800 pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <i class="fa-regular fa-eye w-5 h-4"></i>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Visit As User
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/admin/AdminDashboard"}
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 dark:hover:border-gray-800 pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Settings
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="h-full ml-14 mt-14 mb-10 md:ml-64">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
