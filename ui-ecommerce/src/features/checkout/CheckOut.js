import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { deleteCartItemAsync, selectCartItem } from "../Cart/CartSlice";
import { useForm } from "react-hook-form";
import { addOrder, createOrderAsync, selectCurrentOrder } from "../orders/OrderSlice";
import { UpdateUserInfoAsync, selectUserInfo } from "../user/UserSlice";
import { discountedPrice } from "../../app/constant";


export default function CheckOut() {
  const items = useSelector(selectCartItem);
  const dispatch = useDispatch();
  const handleRemove = (itemId) => {
    dispatch(deleteCartItemAsync(itemId));
  };

  const navigate = useNavigate()

  const totalPrice = items.reduce(
    (amount, item) => amount + discountedPrice(item.product) * item.quantity,
    0
  );
  const totalItem = items.reduce((total, item) => total + item.quantity, 0);
  const [edit, setedit] = useState(false);
  const user = useSelector(selectUserInfo);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(
      UpdateUserInfoAsync({ ...user, addresses: [...user.addresses, data] })
    );
    reset();
  };

  let [selectAddress, setSelectAddress] = useState();

  let [payment, setPayment] = useState();

  const handleAddress = (e) => {
    const index = e.target.value;
    setSelectAddress(user.addresses[index]);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const currentOrder = useSelector(selectCurrentOrder);

  const handleOrder = () => {
    if (selectAddress && payment) {
      const orderDetail = {
        products: items,
        totalCost: totalPrice,
        quantity: totalItem,
        address: selectAddress,
        paymemtMode: payment,
        user: user.id,
        status: "pending",
      };
        dispatch(createOrderAsync(orderDetail));
    } else {
      alert("Please select the Address and Payemet mode");
    }
  };

  return (
    <>
      {!items.length && <Navigate to={"/"} replace={true}></Navigate>}
      {currentOrder && currentOrder.paymemtMode === "cash" && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      {currentOrder && currentOrder.paymemtMode === "card" && (
        <Navigate to={`/strip-checkout`} replace={true}></Navigate>
      )}
      {user && (
        <div className="mx-auto max-w-2xl py-0 sm:px-6 sm:py-10  lg:max-w-7xl lg:px-0">
          <div className="grid grid-cols-1 mx-4 lg:mx-0 lg:mt-0 mt-3 gap-x-8 gap-y-10 lg:grid-cols-5">
            <form
              className="bg-white dark:bg-gray-700 p-4 w-full rounded shadow-2xl lg:col-span-3 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="text-4xl font-bold tracking-tight dark:text-gray-200 text-gray-900">
                Checkout
              </h1>
              {edit ? (
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 dark:text-gray-200 text-gray-900">
                    Personal Information
                  </h2>

                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900"
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
                          className="block w-full rounded-md border-0 py-1.5 dark:text-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900"
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
                          className="block w-full rounded-md border-0 py-1.5 dark:text-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900"
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
                          className="block w-full rounded-md border-0 py-1.5 dark:text-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900"
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
                          className="block w-full rounded-md border-0 py-1.5 dark:text-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900"
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
                          className="block w-full rounded-md border-0 py-1.5 dark:text-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900"
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
                          className="block w-full rounded-md border-0 py-1.5 dark:text-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900"
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
                          className="block w-full rounded-md border-0 py-1.5 dark:text-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      onClick={() => {
                        setedit(false);
                      }}
                      className="text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="border-b  border-gray-900/10 pb-5 my-5">
                <div className="mt-6 flex items-center justify-between gap-x-6">
                  <div>
                    <h2 className="text-base font-semibold leading-7 dark:text-gray-200 text-gray-900">
                      Address
                    </h2>
                    <p className="my-2 text-sm leading-6 text-gray-600 dark:text-gray-200">
                      Choose from Existing Adress
                    </p>
                  </div>

                  <span
                    onClick={() => setedit(true)}
                    className="rounded-md cursor-pointer bg-indigo-600 px-3 py-2 text-sm  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add New
                  </span>
                </div>

                {user.addresses !== null ? (
                  <div
                    role="list"
                    className="divide-y border scroll-smooth rounded divide-gray-100"
                  >
                    {user.addresses.map((Address, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 px-3 py-5"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <input
                            id="cash"
                            name="address"
                            onChange={handleAddress}
                            value={index}
                            type="radio"
                            className="h-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900">
                              {Address.street}
                              {Address.city}
                              {Address.state}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-200 dark:text-gray-200">
                              {Address.phone}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 dark:text-gray-200 text-gray-900">
                            {Address.state}
                          </p>
                          <p className="text-sm leading-6 dark:text-gray-200 text-gray-900">
                            {Address.PinCode}
                          </p>
                        </div>
                      </li>
                    ))}
                  </div>
                ) : null}
                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900">
                      Payment Method
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-200">
                      Choose One
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payment"
                          onClick={handlePayment}
                          value={"cash"}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900"
                        >
                          Cash On Delivery
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          name="payment"
                          onClick={handlePayment}
                          value={"card"}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900"
                        >
                          Card
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </form>
            <div className="p-4 rounded bg-white dark:bg-gray-700 shadow-2xl  lg:col-span-2 ">
              <div className="mt-1">
                <h1 className="text-4xl font-bold tracking-tight dark:text-gray-200 text-gray-900">
                  Order
                </h1>
                <div className="flow-root">
                  <div role="list" className=" divide-y divide-gray-200">
                    {items.map((item, index) => (
                      <li key={index} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="h-full w-full object-fit object-contain"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium dark:text-gray-200 text-gray-900">
                              <h3>
                                <p>{item.product.title}</p>
                              </h3>
                              <p className="ml-4 line-through text-red-500">
                                $ {item.product.price}
                              </p>
                              <p className="ml-4">
                                $ {discountedPrice(item.product)}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500 dark:text-gray-200">
                              Qty : {item.quantity}
                            </p>

                            <div className="flex">
                              <button
                                type="button"
                                onClick={(e) => handleRemove(item.id)}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium dark:text-gray-200 text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {totalPrice}</p>
                </div>
                <div className="flex justify-between text-base font-medium dark:text-gray-200 text-gray-900">
                  <p>Total Items is cart</p>
                  {totalItem > 1 ? (
                    <p> {totalItem} items</p>
                  ) : (
                    <p> {totalItem} item </p>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-200">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pay to Order
                  </div>
                </div>
                <div className="mt-2 justify-center text-center text-sm text-gray-500 dark:text-gray-200">
                  <p>or</p>
                  <Link to={"/"}>
                    <button
                      type="button"
                      className="font-medium text-indigo-600 mt-2 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
