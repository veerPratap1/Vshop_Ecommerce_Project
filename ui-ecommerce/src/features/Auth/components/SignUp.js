import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { increment, incrementAsync, selectCount } from "./counterSlice";

import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserAsync } from "../AuthSlice";
import { selectUserInfo } from "../../user/UserSlice";
import logo from "../../comman/image/InShot_20231201_124429607.png"


export default function SignUp() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();

    const role = "user";

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("mobile", data.phone);
    formData.append("profileImg", data.profileImg[0]);
    formData.append("role", role);

    dispatch(createUserAsync(formData));
  };


  let loadFile = function (event) {

    let output = document.getElementById("preview_img");

    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <>
      {user && <Navigate to={"/"} replace={true}></Navigate>}
      <div className="flex justify-center px-6 py-12 bg-white dark:bg-gray-600 lg:px-8">
        <div className="mt-5 w-[400px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-15 w-14"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
              Create a your account
            </h2>
          </div>
          <form
            noValidate
            className="pt-8 ms-4 lg:ms-0 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register("name", {
                    required: "Please enter your name",
                  })}
                  type="name"
                  className="block w-full rounded-md ps-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
              >
                Mobile Number
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register("phone", {
                    required: "Please enter your name",
                  })}
                  type="number"
                  className="block w-full rounded-md ps-3 border-0 py-1.5 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Please fill this fild",
                    pattern: {
                      value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Email is not valid",
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message: `- at least 8 characters \n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number \n
                      - Can contain special characters \n`,
                    },
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors?.password.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="Confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="Confirm-password"
                  {...register("confirmPassword", {
                    required: "Password is required",
                    validate: (value, formValues) =>
                      value === formValues.password || "password not match",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors?.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-6">
                <div className="shrink-0">
                  <img
                    id="preview_img"
                    className="h-16 w-16 object-cover rounded-full"
                    src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                    alt="Current profile"
                  />
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    {...register("profileImg", {
                      required: "Please choose profile image",
                    })}
                    onChange={(e) => loadFile(e)}
                    className="block w-full text-sm text-slate-500  file:mr-4 file:py-2 file:px-4  file:rounded-full file:border-0  file:text-sm file:font-semibold  file:bg-violet-50 file:text-violet-700  hover:file:bg-violet-100"
                  />
                </label>
              </div>
              {errors.profileImg && (
                <p className="text-red-500">{errors?.profileImg.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-200">
            Already a member?{" "}
            <Link
              to={"/login"}
              className="font-semibold leading-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
