import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createPdfAsync,
  fetchOrderByIdAsync,
  selectOrdersById,
  seletctCreatedPdf,
} from "../../orders/OrderSlice";
import logo from "../../comman/image/InShot_20231201_124429607.png";
import { discountedPrice } from "../../../app/constant";
import axios from "axios";
import { saveAs } from "file-saver";

const OrderDetailInvoice = () => {
  const dispatch = useDispatch();

  const order = useSelector(selectOrdersById);

  const pdf = useSelector(seletctCreatedPdf)

  const param = useParams();

  const id = param.id;

  useEffect(() => {
    dispatch(fetchOrderByIdAsync(id));
  }, [dispatch, id]);

  const handleInvoice = async () => {
    let data = { ...order, logo: logo };

    dispatch(createPdfAsync(data));

    if(pdf){
      const blob = new Blob([pdf],{type: "invoice/pdf"})

      saveAs(blob, `invoice${order.id}.pdf`)
    }
  };


  return (
    <>
      {/* Invoice */}
      {order && (
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
          <div className="sm:w-11/12 lg:w-3/4 mx-auto">
            {/* Card */}
            <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-gray-800">
              {/* Grid */}
              <div className="flex justify-between">
                <div>
                  <div>
                    <Link to={"/admin/AdminDashboard"}>
                      <img
                        className="h-13 w-14"
                        src={logo}
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <h1 className="-ms-1.5 text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
                    VSHOP
                  </h1>
                </div>
                {/* Col */}
                <div className="text-end">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                    Invoice #
                  </h2>
                  <span className="mt-1 block text-gray-500">{order.id}</span>
                  <address className="mt-4 not-italic text-gray-800 dark:text-gray-200">
                    14 Vijay Pratap
                    <br />
                    VSHOP
                    <br />
                    Karanl, Harayan
                    <br />
                    India
                    <br />
                  </address>
                </div>
                {/* Col */}
              </div>
              {/* End Grid */}
              {/* Grid */}
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Bill to:
                  </h3>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {order.address.name}
                  </h3>
                  <address className="mt-2 not-italic text-gray-500">
                    {order.address.street},
                    <br />
                    {order.address.phone}, OR {order.address.PinCode},
                    {order.address.state}
                    <br />
                    India
                    <br />
                  </address>
                </div>
                {/* Col */}
                <div className="sm:text-end space-y-2">
                  {/* Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                        Invoice date:
                      </dt>
                      <dd className="col-span-2 text-gray-500">
                        {new Date(order.createdAt).toString().substring(3, 15)}
                      </dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                        Due date:
                      </dt>
                      <dd className="col-span-2 text-gray-500">
                        {new Date(order.createdAt).toString().substring(3, 15)}
                      </dd>
                    </dl>
                  </div>
                  {/* End Grid */}
                </div>
                {/* Col */}
              </div>
              {/* End Grid */}
              {/* Table */}
              <div className="mt-6">
                <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
                  <div className="hidden sm:grid sm:grid-cols-7">
                    <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                      Item
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      size
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      colour
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Rate
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </div>
                  </div>
                  <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700" />
                  {order?.products?.map((item) => (
                    <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                      <div className="col-span-full sm:col-span-2">
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                          Item
                        </h5>
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {item.product.title}
                        </p>
                      </div>
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                          Qty
                        </h5>
                        <p className="text-gray-800 dark:text-gray-200">
                          {item.quantity}
                        </p>
                      </div>
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                          size
                        </h5>
                        <p className="text-gray-800 dark:text-gray-200">
                          {item.size.value}
                        </p>
                      </div>
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                          colour
                        </h5>
                        <p className="text-gray-800 dark:text-gray-200">
                          {item.colour.value}
                        </p>
                      </div>
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                          Rate
                        </h5>
                        <p className="text-gray-800 dark:text-gray-200">
                          ${discountedPrice(item.product)}
                        </p>
                      </div>
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                          Amount
                        </h5>
                        <p className="sm:text-end text-gray-800 dark:text-gray-200">
                          ${item.quantity * discountedPrice(item.product)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="sm:hidden border-b border-gray-200 dark:border-gray-700" />
                </div>
              </div>
              {/* End Table */}
              {/* Flex */}
              <div className="mt-8 flex sm:justify-end">
                <div className="w-full max-w-2xl sm:text-end space-y-2">
                  {/* Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                        Subtotal:
                      </dt>
                      <dd className="col-span-2 text-gray-500">
                        ${order.totalCost}.00
                      </dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                        Total:
                      </dt>
                      <dd className="col-span-2 text-gray-500">
                        ${order.totalCost}.00
                      </dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                        Total Quantity:
                      </dt>
                      <dd className="col-span-2 text-gray-500">
                        {order.quantity}
                      </dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                        Payment Mode:
                      </dt>
                      <dd className="col-span-2 text-gray-500">
                        {order.paymemtMode}
                      </dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                        Due balance:
                      </dt>
                      {order.paymemtMode === "cash" ? (
                        <dd className="col-span-2 text-gray-500">
                          ${order.totalCost}.00
                        </dd>
                      ) : order.paymemtMode === "card" ? (
                        <dd className="col-span-2 text-gray-500">$.00</dd>
                      ) : null}
                    </dl>
                  </div>
                  {/* End Grid */}
                </div>
              </div>
              {/* End Flex */}
              <div className="mt-8 sm:mt-12">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Thank you!
                </h4>
                <p className="text-gray-500">
                  If you have any questions concerning this invoice, use the
                  following contact information:
                </p>
                <div className="mt-2">
                  <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                    vijayrana81203@gmail.com
                  </p>
                  <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                    +91 7206613057, 9896080492
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm text-gray-500">© 2023 VSHOP.</p>
            </div>
            {/* End Card */}
            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-x-3">
              <button
                onClick={(e) => handleInvoice()}
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1={12} x2={12} y1={15} y2={3} />
                </svg>
                Invoice PDF
              </button>
            </div>
            {/* End Buttons */}
          </div>
        </div>
      )}
      {/* End Invoice */}
    </>
  );
};

export default OrderDetailInvoice;
