import React, { useEffect } from "react";
import {
  fetchAllProductAsync,
  selectAllProduct,
  selectProductStatus,
  updateProductAsync,
} from "../../Product-list/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { useAlert } from "react-alert";

const RecycleBin = () => {
  const products = useSelector(selectAllProduct);

  const DeletedProduct = products.filter((product) => product.deleted === true);

  const status = useSelector(selectProductStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    const admin = { admin: true };
    dispatch(fetchAllProductAsync(admin));
  }, [dispatch]);

  const handleDelete = (id) => {
    const product = DeletedProduct.filter((item) => item.id === id);

    const newProduct = {
      ...product[0],
      colour: product[0].colour.map((colour)=>colour.id),
      size: product[0].size.map((size) => size.id),
      category: product[0].category.id,
      subCategory: product[0].subCategory.id,
      brand: product[0].brand.id,
      deleted: false,
    };


    dispatch(updateProductAsync(newProduct));
    alert.success("Product is Restored Successfully");
  };

  const alert = useAlert();

  const serachInput = (e) => {
    const title = e.target.value;

    const newtitle = { title: title };

    dispatch(fetchAllProductAsync(newtitle));
  };

  return (
    <>
      <>
        {/* component */}
        {DeletedProduct && (
          <div className="container p-5">
            <div className="flex flex-col justify-center items-center w-full ">
              <div className="relative flex w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white dark:bg-gray-700 bg-clip-border shadow-lg  dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white dark:bg-gray-700 px-4 pb-[20px] pt-4 shadow-2xl dark:shadow-2xl dark:shadow-gray-500 shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
                  <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                    Recycle - {DeletedProduct.length}
                  </h4>

                  <div className="bg-white rounded-[20px] flex items-center w-72  max-w-xl mr-4 ps-2 shadow-sm border-none">
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
                      placeholder="Search"
                      className="w-full pl-3 border-transparent focus:border-transparent focus:ring-0 text-sm text-black border-none outline-none  focus:outline-none bg-transparent"
                      onChange={(e) => serachInput(e)}
                    />
                  </div>
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
                    <table
                      role="table"
                      className="w-full min-w-[500px] overflow-x-scroll"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            colSpan={1}
                            role="columnheader"
                            title="Toggle SortBy"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide  text-gray-600  dark:text-white sm:text-xs lg:text-xs">
                              Title
                            </div>
                          </th>
                          <th
                            colSpan={1}
                            role="columnheader"
                            title="Toggle SortBy"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide  text-gray-600  dark:text-white sm:text-xs lg:text-xs">
                              Deleted
                            </div>
                          </th>

                          <th
                            colSpan={1}
                            role="columnheader"
                            title="Toggle SortBy"
                            style={{ cursor: "pointer" }}
                            className=" flex justify-center"
                          >
                            <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600  dark:text-white sm:text-xs lg:text-xs">
                              Action
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="px-4">
                        {DeletedProduct.map((product, index) => (
                          <tr role="row" key={index}>
                            <td className="py-3 text-sm" role="cell">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-navy-700 dark:text-white">
                                  {product.title}
                                </p>
                              </div>
                            </td>
                            <td className="py-3 text-sm" role="cell">
                              <div className="flex items-center pt-1 gap-2">
                                <div className="text-sm font-medium text-navy-700 dark:text-white">
                                  {product.deleted === false ? (
                                    <p className="text-green-500 ps-1">FALSE</p>
                                  ) : (
                                    <p className="text-red-500 ps-1">TRUE</p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 text-sm" role="cell">
                              <div className="flex font-bold justify-center">
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="middle none center rounded-full bg-orange-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                  data-ripple-light="true"
                                >
                                  Restore
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default RecycleBin;
