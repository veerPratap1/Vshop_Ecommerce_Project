import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItem } from "../Cart/CartSlice";
import { selectUserInfo } from "../user/UserSlice";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../../useDarkSide";

import logo from "../comman/image/InShot_20231201_124429607.png";

const navigation = [
  { name: "Home", Link: "/", user: true },
  { name: "Home", Link: "/", admin: true },
  { name: "DashBoard", Link: "/admin/AdminDashboard", admin: true },
  { name: "Shop", Link: "/shop", user: true },
  { name: "Contact", Link: "/contact", user: true },
  { name: "Shop", Link: "/shop", admin: true },
  { name: "Contact", Link: "/contact", admin: true },
];
const NonUsernavigation = [
  { name: "Home", Link: "/" },
  { name: "Shop", Link: "/shop" },
  { name: "Contact", Link: "/contact" },
];
const userNavigation = [
  { name: "Your Profile", to: "/myProfile" },
  { name: "My Orders", to: "/MyOrders" },
  { name: "Sign out", to: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ children, onChange }) {
  const items = useSelector(selectCartItem);

  const user = useSelector(selectUserInfo);

  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  const getInputValue = (e) => {
    let enterdValue = e.target.value;
    onChange(enterdValue);
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure
          as="nav"
          className="dark:bg-gray-800 sticky z-50 top-0  bg-indigo-950 shadow-md"
        >
          {({ open }) => (
            <>
              <div className="flex dark:bg-gray-800 py-2 opacity-3 justify-between items-center lg:px-5 ps-1 pe-3 ">
                <div className="">
                  <Link to={"/"}>
                    <img className="h-7 w-8" src={logo} alt="Your Company" />
                  </Link>
                </div>
                <div className="bg-white rounded-full flex items-center w-full h-10 max-w-xl mr-4 ps-2 ms-2 md:ms-0 shadow-sm border-none">
                  <button className="outline-none focus:outline-none">
                    <svg
                      className="w-5 text-gray-600 h-5 me-2 cursor-pointer"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <input
                    type="search"
                    placeholder="I am looking For...."
                    onChange={(e) => getInputValue(e)}
                    className="w-full pl-3 border-transparent focus:border-transparent focus:ring-0 text-sm text-black border-none outline-none  focus:outline-none bg-transparent"
                  />
                </div>
                <div className="">
                  <div className=" flex items-center md:ml-6">
                    <button
                      aria-hidden="true"
                      className=" duration-200 lg:p-2 mt-1 rounded-full dark:bg-gray-500 hover:bg-indigo-500 dark:hover:bg-gray-700 text-white focus:outline-none"
                    >
                      <DarkModeSwitch
                        checked={darkSide}
                        onChange={toggleDarkMode}
                        size={24}
                        className="text-white"
                      />
                    </button>
                    <Link to={"/cart"}>
                      <button
                        type="button"
                        className="relative rounded-full hidden md:block mx-3 hover:bg-indigo-500 dark:bg-gray-500  dark:hover:bg-gray-700 p-2 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <ShoppingCartIcon
                          className="h-6 text-white w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </Link>
                    {items.length > 0 && (
                      <span className="inline-flex hidden md:block lg:block items-center rounded-md bg-red-50 px-1  mb-7 -ml-3 z-10 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {items.length}
                      </span>
                    )}

                    <Menu
                      as="div"
                      className="relative hidden md:block mx-3 ml-3"
                    >
                      {user && (
                        <div>
                          <Menu.Button className="relative flex w-10 h-10 items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="w-full h-full rounded-full"
                              src={`/${user.profileImg}`}
                              alt="user"
                            />
                          </Menu.Button>
                        </div>
                      )}
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.to}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md dark:bg-gray-800 ms-2 text-white hover:bg-violet-500 hover:text-red focus:outline-none ">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
              <div className="">
                <div className="antialiased bg-cyan-600 sticky top-0 z-40 dark:bg-gray-900">
                  <div className="w-full text-gray-700  dark:text-gray-200 dark:bg-gray-800">
                    <div className="flex px-4 justify-between items-center py-1">
                      <div className="font-bold text-white">
                        <h1 className="text-white text-3xl">VSHOP</h1>
                      </div>
                      <div>
                        {navigation.map((item) =>
                          item[user?.role] ? (
                            <Link
                              key={item.name}
                              to={item.Link}
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-100 hover:text-cyan-200 dark:text-gray-200 dark:hover:text-gray-300 font-semibold uppercase",
                                " py-2 md:text-sm text-xs mx-3 md:mx-5 font-semibold"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          ) : null
                        )}
                        {!user && NonUsernavigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.Link}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-100 hover:text-cyan-200 dark:text-gray-200 dark:hover:text-gray-300 font-semibold uppercase",
                              " py-2 text-sm mx-5 md:mx-5 font-semibold"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden dark:bg-gray-700">
                <div className=" pb-3 pt-4">
                  <div className="flex items-center  px-5">
                    {user && (
                      <>
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`/${user.profileImg}`}
                            alt="user"
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">
                            {user.name}
                          </div>
                          <div className="text-sm font-medium mt-2 leading-none text-gray-200">
                            {user.email}
                          </div>
                        </div>
                      </>
                    )}
                    <Link to={"/cart"}>
                      <button
                        type="button"
                        className="relative ms-20 flex-shrink-0 rounded-full p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </Link>

                    {items.length > 0 && (
                      <span className="inline-flex items-center rounded-md bg-red-50 px-1  mb-7 -ml-3 z-10 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {items.length}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Link to={item.to} key={item.name}>
                        <Disclosure.Button
                          as="a"
                          className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <main>
          <div className="w-full h-full bg-gray-200 dark:bg-gray-400">{children}</div>
        </main>
      </div>
    </>
  );
}
