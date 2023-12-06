import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCatagoryAsync,
  fetchCatagoryAsync,
  selectCatagory,
  selectProductStatus,
  updateCategoryAsync,
} from "../../Product-list/ProductSlice";
import ReactLoading from "react-loading";
import Modal from "../../comman/Modal";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

const CategoriesList = () => {
  const categories = useSelector(selectCatagory);

  const status = useSelector(selectProductStatus);

  const dispatch = useDispatch();

  const param = useParams();

  useEffect(() => {
    dispatch(fetchCatagoryAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCatagoryAsync(id));
  };

  const [openModal, setopenModal] = useState(null);

  const handleCancel = () => {
    setopenModal(null);
  };

  const alert = useAlert()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const item = {
      id: param.id,
      label: data.Category,
      value: data.Category,
    };
    dispatch(updateCategoryAsync(item));
    if(status === "idle"){
      alert.success("Category is Successfully Updated")
    }
    reset();
  };

  const searchInput = (e)=>{
  const title =  e.target.value

  const value = {value : title}

   dispatch(fetchCatagoryAsync(value))
  
  }

  return (
    <>
      <>
        {/* component */}
        <div className="container p-5">
          <div className="flex flex-col justify-center items-center w-full ">
            <div className="relative flex w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white dark:bg-gray-700 bg-clip-border shadow-lg  dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-gray-200 dark:shadow-none">
              <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white dark:bg-gray-700 px-4 pb-[20px] pt-4 shadow-2xl dark:shadow-2xl dark:shadow-2xl-white shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
                <h4 className="text-lg font-bold text-navy-700 dark:text-gray-200">
                  Categories - {categories.length}
                </h4>
                {param.id ? (
                  <form className="flex">
                    {errors.Category ? (
                      <p className="text-red-500 pt-2 me-2">
                        {errors.Category.message}
                      </p>
                    ) : null}
                    <div
                      className={`bg-white rounded-[20px] me-2 ${
                        errors.Category
                          ? "border-2 border-red-600 shadow-2xl shadow-red-700"
                          : "border"
                      }  flex items-center w-72  max-w-xl shadow-sm`}
                    >
                      <input
                        type="text"
                        {...register("Category", {
                          required: "Category is required",
                        })}
                        placeholder="Update Here"
                        className="w-full pl-3 border-transparent rounded-full focus:border-transparent focus:ring-0 text-sm text-black border-none outline-none  focus:outline-none bg-transparent"
                      />
                    </div>
                    <button
                      className="outline-none uppercase font-sans text-xs font-bold text-white  bg-green-400 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/40	hover:border-none rounded-full px-4 py-2 focus:outline-none"
                      onClick={handleSubmit(onSubmit)}
                    >
                      save
                    </button>
                  </form>
                ) : (
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
                      onChange={(e)=>searchInput(e)}
                      className="w-full pl-3 border-transparent focus:border-transparent focus:ring-0 text-sm text-black border-none outline-none  focus:outline-none bg-transparent"
                    />
                  </div>
                )}
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
                          <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide  text-gray-600  dark:text-gray-200 sm:text-xs lg:text-xs">
                            Categories
                          </div>
                        </th>

                        <th
                          colSpan={1}
                          role="columnheader"
                          title="Toggle SortBy"
                          style={{ cursor: "pointer" }}
                          className=" flex justify-center"
                        >
                          <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600  dark:text-gray-200 sm:text-xs lg:text-xs">
                            Action
                          </div>
                        </th>
                      </tr>
                    </thead>

                    <tbody  className="px-4">
                      {categories.map((category, index) => (
                        <>
                          <tr role="row" key={index}>
                            <td className={`py-3 text-sm flex`} role="cell">
                              {param.id === category.id && (
                                <div className="w-4 h-4 mx-2">
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <p
                                  id={"Catid" + index}
                                  className="text-sm font-medium text-navy-700 dark:text-gray-200"
                                >
                                  {category.value}
                                </p>
                              </div>
                            </td>

                            <td className="py-3 text-sm" role="cell">
                              <div className="flex font-bold justify-center">
                                <Modal
                                  title={`${category.label}`}
                                  message="Do You Want To Delete This Category From List ?"
                                  cancelOption="Cancel"
                                  dangerOption="Remove"
                                  dangerAction={(e) =>
                                    handleDelete(category.id)
                                  }
                                  cancelAction={(e) => handleCancel()}
                                  openModal={openModal === category.id}
                                ></Modal>
                                <button
                                  className="middle none center mr-4 rounded-full bg-red-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                  data-ripple-light="true"
                                  onClick={() => setopenModal(category.id)}
                                >
                                  Delete
                                </button>

                                {param.id === category.id ? (
                                  <Link
                                    to={`/admin/CategoryList`}
                                    className="middle none center rounded-full bg-amber-400 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                  >
                                    cancle
                                  </Link>
                                ) : (
                                  <Link
                                    to={`/admin/CategoryList/${category.id}`}
                                    className="middle none center rounded-full bg-orange-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                  >
                                    Update
                                  </Link>
                                )}
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default CategoriesList;
