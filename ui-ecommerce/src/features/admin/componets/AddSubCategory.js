import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubCategoryAsync,
  fetchCatagoryAsync,
  selectCatagory,
  selectProductStatus,
} from "../../Product-list/ProductSlice";
import { useAlert } from "react-alert";

const AddSubCategories = () => {
  const categories = useSelector(selectCatagory);

  const dispatch = useDispatch();

  const status = useSelector(selectProductStatus);

  const alert = useAlert();

  useEffect(() => {
    dispatch(fetchCatagoryAsync());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formdata = new FormData();

    formdata.append("value", data.SubCategory);
    formdata.append("label", data.label[0]);
    formdata.append("category", data.Category);

    dispatch(createSubCategoryAsync(formdata));
    if (status === "idle") {
      alert.success("Sub-Category is Successfully added");
    }
    reset();
  };

  return (
    <>
      {/* component */}
      <div className="container p-5">
        <div className="dark:bg-gray-700 h-96 bg-white shadow-lg rounded-2xl">
          <div className="flex h-fit w-full items-center justify-between bg-white rounded-t-2xl dark:bg-gray-700 px-4 pb-[20px] pt-4 shadow-2xl dark:shadow-2xl dark:shadow-gray-500 shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
            <h4 className="text-lg font-bold text-navy-700 dark:text-white">
              Add Sub-Categories
            </h4>
          </div>
          <div className="w-full grid py-20 place-items-center">
            <form action="" className="min-w-[200px] max-w-[24rem]">
              <select
                className="text-gray-500 text-sm dark:border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("Category", {
                  required: "Please Select Category",
                })}
                required
              >
                <option>Select Catergory</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>{category.value}</option>
                ))}
              </select>
              {errors.Category && (
                <p className="text-red-500">{errors.Category.message}</p>
              )}

              <div className="relative mt-5 flex h-10 w-full min-w-[200px] max-w-[24rem]">
                <button
                  className="!absolute right-1 top-1 z-10 select-none rounded bg-pink-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                  type="button"
                  data-ripple-light="true"
                  onClick={handleSubmit(onSubmit)}
                >
                  Add
                </button>
                <input
                  type="text"
                  className="peer focus:ring-0 dark:text-white focus:border-2  h-full w-full rounded-[7px] bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 transition-all placeholder-shown:border  placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  {...register("SubCategory", {
                    required: "Please add Sub-Category",
                  })}
                  placeholder=" "
                />
                <label className="before:content[' '] after:content[' '] dark:text-white pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  SubCategory
                </label>
              </div>
              {errors.SubCategory && (
                <p className="text-red-500">{errors.SubCategory.message}</p>
              )}
              <div>
                <input
                  {...register("label", {
                    required: "Product label is Required",
                  })}
                  className="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  name="label"
                  type="File"
                />
                {errors.label && (
                  <p className="text-red-500">{errors.label.message}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubCategories;
