import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserOrderByIdAsync,
  selectUserOrderStatus,
  selectUserOrders,
} from "../UserSlice";
import { discountedPrice } from "../../../app/constant";
import ReactLoading from "react-loading";

const UserOrders = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchUserOrderByIdAsync());
  }, [dispatch]);

  const order = useSelector(selectUserOrders);

  const status = useSelector(selectUserOrderStatus);

  return (
    <>
      {status === "loading" ? (
        <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#a4bbc9"}
            height={100}
            width={100}
          />
        </div>
      ) : (
        order.map((orders, index) => (
          <div key={index} className="mx-auto bg-white dark:bg-gray-700 max-w-2xl shadow-2xl rounded-lg px-4  py-1 md:py-5 mb-5 pt-10 lg:max-w-7xl lg:px-8">
            <div className="mt-5">
              <h1 className="text-base md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                Orders # {orders.id}
              </h1>
              <h3 className="text-4sm mt-2 font-bold tracking-tight text-red-600">
                Orders Status : {orders.status}
              </h3>
              <div className="flow-root">
                <div role="list" className=" divide-y divide-gray-200">
                  {orders?.products?.map((item ,index) => (
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
                          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                            <h3>
                              <p>{item.product.title}</p>
                            </h3>
                            <p className="ml-4 line-through text-red-500">
                              ${item.product.price}
                            </p>
                            <p className="ml-4">${discountedPrice(item.product)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500 dark:text-gray-300">Qty {orders.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                <p>Subtotal</p>
                <p>${orders.totalCost}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                <p>Total items in Cart </p>
                <p>{orders.quantity} Items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-300">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
            <div className="mt-6 items-center border rounded px-2 justify-between gap-x-6">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">
                  Shipping Address :
                </h2>
              </div>
              <div className="flex justify-between gap-x-6 px-3 py-3">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto ">
                    <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                      {orders.address.street},{orders.address.city},
                      {orders.address.state}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-300">
                      {orders.address.phone}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900 dark:text-gray-200">
                    {orders.address.state}
                  </p>
                  <p className="text-sm leading-6 text-gray-900 dark:text-gray-200">
                    {orders.address.PinCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default UserOrders;
