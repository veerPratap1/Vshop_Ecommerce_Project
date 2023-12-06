import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { checkUserAsync, selectError, selectLoginUser } from "../AuthSlice";
import { fetchLogedInUserAsync, selectUserInfo } from "../../user/UserSlice";
import { useEffect } from "react";
import logo from "../../comman/image/InShot_20231201_124429607.png"

export default function Login() {
  const user = useSelector(selectLoginUser);
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const userInfo = useSelector(selectUserInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(checkUserAsync({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    dispatch(fetchLogedInUserAsync());
  }, [dispatch]);

  return (
    <>
      {user && userInfo && userInfo.role === "user" ? (
        <Navigate to={"/"} replace={true}></Navigate>
      ) : (
        user &&
        userInfo &&
        userInfo.role === "admin" && (
          <Navigate to={"/admin/AdminDashboard"} replace={true}></Navigate>
        )
      )}
      <div className="flex justify-center py-20 dark:bg-gray-600">
        <div className=" w-[400px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-15 w-14"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
              Sign in to your account
            </h2>
          </div>
          <form className="pt-10 ms-8 md:ms-0 space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("email", { required: "Enter your Email" })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <div className="text-sm">
                  <Link
                    to={"/forget-password"}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", { required: "Enter your password" })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}{" "}
              </div>
              {error && (
                <p className="text-red-500 mt-3">{error || error.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-200">
            Not a member?{" "}
            <Link
              to={"/signUp"}
              className="font-semibold leading-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              Create a new Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
