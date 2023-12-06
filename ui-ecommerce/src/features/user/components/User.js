import { useDispatch, useSelector } from "react-redux";
import { UpdateUserInfoAsync, selectUserInfo } from "../UserSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function UserProfile() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [editFormIndex, setEditFormIndex] = useState(-1);
  const [addNewAddreeForm, setAddNewAddreeForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (index, addressUpdate) => {
    const newUser = { ...user, addresses: [...user.addresses] };

    newUser.addresses.splice(index, 1, addressUpdate);

    dispatch(UpdateUserInfoAsync(newUser));
    setEditFormIndex(-1);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };

    newUser.addresses.splice(index, 1);

    dispatch(UpdateUserInfoAsync(newUser));
  };

  const handleEditForm = (index) => {
    setEditFormIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("PinCode", address.PinCode);
  };

  const handleNewaddress = (address) => {
    const newUser = { ...user, addresses: [...user.addresses] };

    newUser.addresses.push(address);

    dispatch(UpdateUserInfoAsync(newUser));
    setAddNewAddreeForm(false);
  };

  return (
    <>
      {user && <div className={`w-full ${user.role === "admin" && "p-2"}`}>
        <div className="h-full lg:p-5">
          <div className="bg-white dark:bg-gray-800  rounded-lg shadow-xl pb-8">
            <div className="w-full h-[250px]">
              <img alt="userImage"
                src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                className="w-full h-full rounded-tl-lg rounded-tr-lg"
              />
            </div>
            <div className="flex flex-col items-center -mt-20">
              <img alt="userImage"
                src={`/${user.profileImg}`}
                className="w-40 border-4 border-white rounded-full"
              />
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-2xl dark:text-white">{user.name}</p>
                <span className="bg-blue-500 rounded-full p-1" title="Verified">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-100 h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              </div>
              {user.role === "admin" ? (
                <p className="text-gray-700 mt-3 dark:text-gray-100">
                  Admin of this Application
                </p>
              ) : (
                <p className="text-gray-700 mt-3 dark:text-gray-100">
                  User of this Application
                </p>
              )}
              {/* <p className="text-sm text-gray-500">New York, USA</p> */}
            </div>
          </div>
          <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="w-full flex flex-col 2xl:w-1/3">
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
                <h4 className="text-xl text-gray-900 dark:text-gray-100 font-bold">
                  Personal Info
                </h4>
                <ul className="mt-2 text-gray-700 dark:text-gray-100">
                  <li className="flex border-y py-2">
                    <span className="font-bold w-24">Full name:</span>
                    <span className="text-gray-700 dark:text-gray-100">
                      {user.name}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Mobile:</span>
                    <span className="text-gray-700 dark:text-gray-100">
                      {user.mobile}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Email:</span>
                    <span className="text-gray-700 dark:text-gray-100">
                      {user.email}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Languages:</span>
                    <span className="text-gray-700 dark:text-gray-100">
                      English, Spanish
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl mt-4 p-8">
                <h4 className="text-xl text-gray-900 dark:text-gray-100 font-bold">
                All Existing Address :
                </h4>
                {addNewAddreeForm ? (
                  <form
                    className="border-b border-gray-900/10 pb-12"
                    onSubmit={handleSubmit((data) => {
                      handleNewaddress(data);
                      reset();
                    })}
                  >
                    <h2 className="text-base font-semibold leading-7 text-green-900 mt-3 dark:text-green-400">
                      Personal Information
                    </h2>

                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                        >
                          First name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "Name is required",
                            })}
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.name && (
                            <p className="text-red-500">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "Email is required",
                            })}
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.email && (
                            <p className="text-red-500">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                        >
                          Phone Number
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "Phone is required",
                            })}
                            type="tel"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.phone && (
                            <p className="text-red-500">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "street is required",
                            })}
                            id="street-address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.street && (
                            <p className="text-red-500">
                              {errors.street.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "city is required",
                            })}
                            id="city"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.city && (
                            <p className="text-red-500">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                        >
                          State
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "state is required",
                            })}
                            id="region"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.state && (
                            <p className="text-red-500">
                              {errors.state.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                        >
                          Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("PinCode", {
                              required: "Pin-Code is required",
                            })}
                            id="postal-code"
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.PinCode && (
                            <p className="text-red-500">
                              {errors.PinCode.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        onClick={() => setAddNewAddreeForm(false)}
                        className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Address
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setAddNewAddreeForm(true)}
                    className="rounded-md bg-green-500 px-3 py-2  mt-3 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add New Address
                  </button>
                )}
                <div className="my-6 items-center px-2 justify-between gap-x-6">
                  {user.addresses.map((address, index) => (
                    <div key={index}>
                      {editFormIndex === index ? (
                        <form
                          className="border-b border-gray-900/10 pb-12"
                          onSubmit={handleSubmit((data) => {
                            handleEdit(index, data);
                            reset();
                          })}
                        >
                          <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                            Edit Information
                          </h2>

                          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                              >
                                First name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("name", {
                                    required: "Name is required",
                                  })}
                                  id="first-name"
                                  autoComplete="given-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.name && (
                                  <p className="text-red-500">
                                    {errors.name.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                              >
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  {...register("email", {
                                    required: "Email is required",
                                  })}
                                  type="email"
                                  autoComplete="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.email && (
                                  <p className="text-red-500">
                                    {errors.email.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                              >
                                Phone Number
                              </label>
                              <div className="mt-2">
                                <input
                                  id="phone"
                                  {...register("phone", {
                                    required: "Phone is required",
                                  })}
                                  type="tel"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.phone && (
                                  <p className="text-red-500">
                                    {errors.phone.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="street-address"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("street", {
                                    required: "street is required",
                                  })}
                                  id="street-address"
                                  autoComplete="street-address"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.street && (
                                  <p className="text-red-500">
                                    {errors.street.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("city", {
                                    required: "city is required",
                                  })}
                                  id="city"
                                  autoComplete="address-level2"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.city && (
                                  <p className="text-red-500">
                                    {errors.city.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="region"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                              >
                                State
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("state", {
                                    required: "state is required",
                                  })}
                                  id="region"
                                  autoComplete="address-level1"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.state && (
                                  <p className="text-red-500">
                                    {errors.state.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="postal-code"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                              >
                                Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("PinCode", {
                                    required: "Pin-Code is required",
                                  })}
                                  id="postal-code"
                                  autoComplete="postal-code"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.PinCode && (
                                  <p className="text-red-500">
                                    {errors.PinCode.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                              type="button"
                              onClick={() => setEditFormIndex(-1)}
                              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Edit Address
                            </button>
                          </div>
                        </form>
                      ) : null}
                      <div className=" dark:bg-gray-700 bg-gray-200 mt-3 relative flex justify-center flex-wrap py-6 rounded ">
                        <div className="lg:w-1/2 lg:px-6 px-2  mt-4 lg:mt-0">
                          <h2 className="title-font font-semibold text-gray-900 dark:text-gray-100 tracking-widest text-xs">
                            ADDRESS
                          </h2>
                          <p className="mt-1 dark:text-gray-300">
                            {address.street}
                          </p>
                          <h2 className="title-font mt-2 font-semibold text-gray-900 dark:text-gray-100 tracking-widest text-xs">
                            STATE
                          </h2>
                          <p className="mt-1 dark:text-gray-300">
                            {address.state}
                          </p>
                        </div>
                        <div className=" lg:w-1/2 w-full lg:px-6 px-2  mt-4 lg:mt-0">
                          <h2 className="title-font font-semibold text-gray-900 dark:text-gray-100 tracking-widest text-xs">
                            EMAIL
                          </h2>
                          <p className="text-blue-500 pt-1 pb-2 leading-relaxed">
                            {address.email}
                          </p>
                          <h2 className="title-font font-semibold text-gray-900 dark:text-gray-100 tracking-widest text-xs mt-4">
                            PHONE
                          </h2>
                          <p className="leading-relaxed  dark:text-gray-300">{address.phone}</p>
                        </div>
                        <div className="mt-2">
                          <button onClick={()=>handleRemove(index)} className="middle none center me-3 rounded-full bg-amber-400 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Remove</button>
                          <button onClick={()=>handleEditForm(index)} className="middle none center rounded-full bg-orange-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Edit</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}
