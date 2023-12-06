import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserAsync, selectAllUser } from "../../user/UserSlice";
import { fetchAllOrdersAsync, selectOrders } from "../../orders/OrderSlice";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Line,
  LineChart,
  Area,
} from "recharts";
import {
  fetchAllProductAsync,
  selectAllProduct,
} from "../../Product-list/ProductSlice";
import { Link } from "react-router-dom";
import {
  fetchAllMessageAsync,
  selectAllMessages,
} from "../../Contact/ContactSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectAllUser);
  const orders = useSelector(selectOrders);

  const sales = orders?.reduce((sale, item) => item.totalCost + sale, 0);

  const delivedOrder = orders?.filter((order) => order.status === "delivered");
  const dispatchedOrder = orders?.filter(
    (order) => order.status === "dispatched"
  );
  const pendingOrder = orders?.filter((order) => order.status === "pending");
  const canceledOrder = orders?.filter((order) => order.status === "cancelled");

  useEffect(() => {
    const sort = { _sort: "id", _order: "desc" };
    const pagination = { _page: 1 };
    dispatch(fetchAllUserAsync());
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
    dispatch(fetchAllMessageAsync());
  }, [dispatch]);

  const data01 = [
    { name: "Dispatched", value: dispatchedOrder.length, colour: "yellow" },
    { name: "Delivered", value: delivedOrder.length },
    { name: "Pending", value: pendingOrder.length },
    { name: "Cancelled", value: canceledOrder.length },
  ];

  const COLORS = ["#ffe200", "#22c55e", "#ff7800", "#ef2727"];

  const get5order = orders.map((order) => order);

  function compareDates(a, b) {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  }

  get5order.sort(compareDates);

  const orderBydate = get5order?.map((order) => {
    const doc = {
      ...order,
      createdAt: new Date(order.createdAt).toString().substring(4, 15),
    };
    return doc;
  });

  const organizedData = orderBydate?.reduce((acc, order) => {
    const date = order.createdAt;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {});


  const groupOrder = Object.keys(organizedData).map((date) => {
    return {
      date,
      order: organizedData[date].length,
      sales: organizedData[date].reduce(
        (cost, item) => item.totalCost + cost,
        0
      ),
      productQuantity: organizedData[date].reduce(
        (num, order) => order.products.length + num,
        0
      ),
    };
  });


  let data = [...groupOrder.slice(0,5)];


  const products = useSelector(selectAllProduct);

  useEffect(() => {
    let admin = { admin: "true" };
    dispatch(fetchAllProductAsync(admin));
  }, [dispatch]);

  const inStock = products.filter((product) => product.stock > 0);

  const outOfStock = products.filter((product) => product.stock < 1);

  const COLORS2 = ["#22c55e", "#ef2727"];

  const data02 = [
    { name: "In Stock", value: inStock.length },
    { name: "Out Of Stock", value: outOfStock.length },
  ];

  const messages = useSelector(selectAllMessages);

  return (
    <>
      {users && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
          <div className="bg-cyan-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-cyan-600 dark:border-gray-600 text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-cyan-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">{users.length}</p>
              <p>Users</p>
            </div>
          </div>
          <div className="bg-cyan-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-cyan-600 dark:border-gray-600 text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-cyan-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="text-right">
              {orders && <p className="text-2xl">{orders.length}</p>}
              <p>Orders</p>
            </div>
          </div>
          <div className="bg-cyan-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-cyan-600 dark:border-gray-600 text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-cyan-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="text-right">
              {orders && <p className="text-2xl">${sales}</p>}
              <p>Sales</p>
            </div>
          </div>
          <div className="bg-cyan-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-cyan-600 dark:border-gray-600 text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <div
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-2xl text-cyan-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <i className="fa-solid fa-truck-fast"></i>
              </div>
            </div>
            <div className="text-right">
              {orders && <p className="text-2xl">{delivedOrder.length}</p>}
              <p>Deliverd Order</p>
            </div>
          </div>
        </div>
      )}
      {orders && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
            <div className="relative min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full  shadow-lg rounded">
              <div className="w-full flex justify-center">
                <h2 className=" text-3xl uppercase font-semibold text-left font-gray-500 dark:text-gray-400">
                  Order Status
                </h2>
              </div>
              <div className="absolute z-10 top-10">
                <div className="flex mb-2">
                  <div className=" rounded bg-[#22c55e] w-10 mx-2 flex-inline"></div>
                  {"  "}
                  <p className="text-xs">: Delivered</p>
                </div>
                <div className="flex mb-2">
                  <div className=" rounded bg-[#ffe200] w-10 mx-2 flex-inline"></div>
                  {"  "}
                  <p className="text-xs">: Dispatched</p>
                </div>
                <div className="flex mb-2">
                  <div className=" rounded bg-[#ff7800] w-10 mx-2 flex-inline"></div>
                  {"  "}
                  <p className="text-xs">: Pending</p>
                </div>
                <div className="flex mb-2 text-base">
                  <div className=" rounded bg-[#ef2727] w-10 mx-2 flex-inline"></div>
                  {"  "}
                  <p className="text-xs">: Canceled</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="91%">
                <PieChart
                  width="400px"
                  height="400px"
                  style={{ paddingTop: "20px" }}
                >
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data01}
                    cx="50%"
                    cy="50%"
                    outerRadius={"70%"}
                    fill="#8884d8"
                    label
                  >
                    {data01.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="relative min-w-0 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
              <div className="w-full flex justify-center">
                <h2 className=" text-3xl uppercase font-semibold text-left font-gray-500 dark:text-gray-400">
                  Orders By date
                </h2>
              </div>
              <ResponsiveContainer width="100%" height="91%">
                <ComposedChart
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis
                    dataKey="date"
                    scale="band"
                    style={{ border: "solid" }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="order" barSize={20} fill="#413ea0" />
                  <Area
                    type="monotone"
                    dataKey="productQuantity"
                    fill="#8884d8"
                    stroke="#8884d8"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
            <div className="relative min-w-0 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
              <div className="w-full flex justify-center">
                <h2 className=" text-3xl uppercase font-semibold text-left font-gray-500 dark:text-gray-400">
                  Stock Report
                </h2>
              </div>
              <div className="absolute z-10 top-10">
                <div className="flex mb-2">
                  <div className=" rounded bg-[#22c55e] w-10 mx-2 flex-inline"></div>
                  <p className="text-xs">: Product In Stock</p>
                </div>
                <div className="flex mb-2 text-base">
                  <div className=" rounded bg-[#ef2727] w-10 mx-2 flex-inline"></div>
                  <p className="text-xs">: Product Out of Stock</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="91%">
                <PieChart
                  width="400px"
                  height="400px"
                  style={{ paddingTop: "20px" }}
                >
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data02}
                    cx="50%"
                    cy="50%"
                    outerRadius={"70%"}
                    fill="#8884d8"
                    label
                  >
                    {data01.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS2[index % COLORS2.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="relative min-w-0 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
              <div className="w-full flex justify-center">
                <h2 className=" text-3xl uppercase font-semibold text-left font-gray-500 dark:text-gray-400">
                  sales revenue
                </h2>
              </div>
              <ResponsiveContainer width="100%" height="91%">
                <LineChart
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" scale="band" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
            <div className="rounded bg-red-600 dark:bg-gray-800 p-3">
              <div className="flex justify-between py-1 text-black dark:text-white">
                <h3 className="text-sm text-gray-100 font-semibold">
                  Product Out of Stock
                </h3>
                <svg
                  className="h-4 fill-current text-gray-200 dark:text-gray-500 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
                </svg>
              </div>
              <div className="text-sm text-black dark:text-gray-50 mt-2">
                {outOfStock ? (
                  outOfStock.map((product, index) => (
                    <Link key={index} to={"/admin/productList"}>
                      <div className="bg-white w-full dark:bg-gray-600 hover:bg-blue-100 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                        {product.title}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-sm w-full text-black dark:text-gray-50 mt-2 border border-white flex justify-center">
                    <p className="text-white font-semibold mt-3 dark:text-green-300 ">
                      No Product is Out of Stock
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="rounded bg-[#ffe200] dark:bg-gray-800 p-3">
              <div className="flex justify-between py-1 text-black dark:text-white">
                <h3 className="text-sm font-semibold">User Q/A</h3>
                <svg
                  className="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
                </svg>
              </div>
              {messages !== null ? (
                <div className="text-sm text-black dark:text-gray-50 mt-2">
                  {messages.map((message, index) => (
                    <div key={index} className="bg-white dark:bg-gray-600 hover:bg-blue-100 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900">
                      {message.subject}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm w-full text-black dark:text-gray-50 mt-2 flex justify-center">
                  <p className="text-amber-800 font-semibold mt-3 dark:text-green-300 ">
                    No Message form User
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminDashboard;
