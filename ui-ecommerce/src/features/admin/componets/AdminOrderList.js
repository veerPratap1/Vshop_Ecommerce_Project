import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrderStatus,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../orders/OrderSlice";
import { ITEMS_PAGE } from "../../../app/constant";
import {
  PencilIcon,
  EyeIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import ReactLoading from "react-loading";
import { Pagination } from "../../comman/Pagination";
import { Link } from "react-router-dom";

const AdminOrderList = () => {
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);

  let [sort, setSort] = useState({});

  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);

  const status = useSelector(selectOrderStatus);

  let [editStatusInput, setEditStatusInput] = useState(-1);


  const handleEdit = (order) => {
    setEditStatusInput(order.id);
  };

  const handleUpdateStatus = (e, order) => {
    const updatedStatus = e.target.value;
    const newOrder = { ...order, status: updatedStatus };
    dispatch(updateOrderAsync(newOrder));
    setEditStatusInput(-1);
  };

  const orderStatus = (status) => {
    switch (status) {
      case "pending":
        return "bg-pink-200 text-pink-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-pink-200 text-pink-600";
    }
  };

  const handlePage = (index) => {
    setPage(index);
  };

  const handleSort = (sortOption) => {
    const newSort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(newSort);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <>
      <div className="container p-5">
        <div className="flex flex-col justify-center items-center w-full ">
          <div className="relative flex w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white dark:bg-gray-700 bg-clip-border shadow-lg  dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white dark:bg-gray-700 px-4 pb-[20px] pt-4 shadow-2xl dark:shadow-2xl dark:shadow-gray-500 shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
              <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                Orders - {orders.length}
              </h4>
            </div>
            <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
              {status === "loading" ? (
                <div className="grid min-h-full place-items-center ps-6 py-24 sm:py-32 lg:ps-8 ">
                  <ReactLoading
                    type={"spinningBubbles"}
                    color={"#a4bbc9"}
                    height={100}
                    width={100}
                  />
                </div>
              ) : (
                <table className="w-full mb-3 min-w-[500px] overflow-x-scroll">
                  <thead>
                    <tr role="row">
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        style={{ cursor: "pointer" }}
                        onClick={(e) =>
                          handleSort({
                            sort: "id",
                            order: sort?._order === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide  text-gray-600  dark:text-white sm:text-xs lg:text-xs">
                          Order Number
                          {sort._sort === "id" && sort._order === "asc" ? (
                            <ArrowDownIcon className="w-4 h-4 inline me-3 rounded-full"></ArrowDownIcon>
                          ) : (
                            <ArrowUpIcon className="w-4 h-4 inline me-3 rounded-full "></ArrowUpIcon>
                          )}
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide  text-gray-600  dark:text-white sm:text-xs lg:text-xs">
                          Produts
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide  text-gray-600  dark:text-white sm:text-xs lg:text-xs">
                          Shipping Address
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        style={{ cursor: "pointer" }}
                        onClick={(e) =>
                          handleSort({
                            sort: "totalCost",
                            order: sort?._order === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide  text-gray-600  dark:text-white sm:text-xs lg:text-xs">
                          Total Amount
                          {sort._sort === "totalCost" &&
                          sort._order === "asc" ? (
                            <ArrowDownIcon className="w-4 h-4 inline me-3 rounded-full"></ArrowDownIcon>
                          ) : (
                            <ArrowUpIcon className="w-4 h-4 inline me-3 rounded-full "></ArrowUpIcon>
                          )}
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide  text-gray-600  dark:text-white sm:text-xs lg:text-xs">
                          Status
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide  text-gray-600  dark:text-white sm:text-xs lg:text-xs">
                          Actions
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="px-4">
                    {orders?.map((order, index) => (
                      <tr key={index}>
                        <td className="py-3 text-sm" role="cell">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-navy-700 dark:text-white">
                              {" "}
                              #{order.id}
                            </p>
                          </div>
                        </td>
                        <td className="text-left">
                          {order.products.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="text-sm w-15 h-15 font-medium text-navy-700 dark:text-white">
                                <img
                                  className="w-12 h-12 mr-2 rounded-md overflow-hidden"
                                  src={`/${item.product.thumbnail}`}
                                  alt={item.product.title}
                                />
                              </div>
                            </div>
                          ))}
                        </td>

                        <td className="text-left">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-navy-700 dark:text-white">
                              {order.address.city}
                            </div>
                            <div className="text-sm font-medium text-navy-700 dark:text-white">
                              {order.address.state}
                            </div>
                            <div className="text-sm font-medium text-navy-700 dark:text-white">
                              {order.address.PinCode}
                            </div>
                          </div>
                        </td>
                        <td className="text-left">
                          <div className="text-sm font-medium text-navy-700 dark:text-white">
                            $ {order.totalCost}
                          </div>
                        </td>
                        <td className="text-left">
                          {order.id === editStatusInput ? (
                            <>
                              <select
                                className="text-sm font-medium rounded-full text-navy-700 dark:text-black"
                                onChange={(e) => handleUpdateStatus(e, order)}
                              >
                                <option>Choose</option>
                                <option value="pending">Pending</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </>
                          ) : (
                            <>
                              <span
                                className={`${orderStatus(
                                  order.status
                                )} text-sm font-medium rounded-full px-3 py-2`}
                              >
                                {order.status}
                              </span>
                            </>
                          )}
                        </td>
                        <td className="text-left">
                          <div className="text-sm flex font-medium text-navy-700 dark:text-white">
                            <Link to={`/admin/orderDetail/${order.id}`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <EyeIcon
                                className="w-6 h-4 cursor-pointer"
                              ></EyeIcon>
                            </Link>
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <PencilIcon
                                className="w-6 h-4 ms-2 cursor-pointer"
                                onClick={() => handleEdit(order)}
                              ></PencilIcon>
                            </div>
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <Pagination
              handlePage={handlePage}
              page={page}
              totalItems={totalOrders}
            ></Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrderList;
