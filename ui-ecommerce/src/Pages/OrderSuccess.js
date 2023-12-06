import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/Cart/CartSlice";
import { resetOrder } from "../features/orders/OrderSlice";
import Navbar from "../features/navebar/Navebar"

const OrderSuccess = () => {
  const param = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCartAsync());

    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <>
      <Navbar>
        <main className="flex justify-center h-[550px] px-6 py-24 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-cyan-600">
              Order Successfully Placed
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Order Number #{param.id}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {"You can check your order in My Account > My order."}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={"/"}
                className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
      </Navbar>
    </>
  );
};

export default OrderSuccess;
