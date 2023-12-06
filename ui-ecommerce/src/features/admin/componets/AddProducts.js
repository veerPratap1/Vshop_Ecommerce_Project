import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  fetchBrandAsync,
  fetchCatagoryAsync,
  fetchColourAsync,
  fetchSizeAsync,
  fetchSubCatagoryAsync,
  selectBrand,
  selectCatagory,
  selectColour,
  selectProductStatus,
  selectSize,
  selectSubCatagory,
} from "../../Product-list/ProductSlice";
import { useAlert } from "react-alert";

const AddProduct = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const status = useSelector(selectProductStatus);

  const categories = useSelector(selectCatagory);
  const brands = useSelector(selectBrand);
  const colour = useSelector(selectColour);
  const size = useSelector(selectSize);
  const subCategories = useSelector(selectSubCatagory);

  useEffect(() => {
    dispatch(fetchCatagoryAsync());
    dispatch(fetchSubCatagoryAsync());
    dispatch(fetchBrandAsync());
    dispatch(fetchColourAsync());
    dispatch(fetchSizeAsync());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const product = {
      ...data,
    };

    product.price = +product.price;
    product.stock = +product.stock;
    product.rating = 0;
    product.discountPercentage = +product.discountPercentage;

    const formData = new FormData();

    formData.append("title", product.title);
    formData.append("description", product.discription);
    formData.append("price", product.price);
    formData.append("discountPercentage", product.discountPercentage);
    formData.append("stock", product.stock);
    formData.append("rating", product.rating);
    formData.append("brand", product.brand);
    formData.append("colour", product.colour);
    formData.append("size", product.size);
    formData.append("category", product.category);
    formData.append("subCategory", product.SubCategory);
    formData.append("thumbnail", product.thumbnail[0]);
    formData.append("image1", product.Image_1[0]);
    formData.append("image2", product.Image_2[0]);
    formData.append("image3", product.Image_3[0]);
    formData.append("image4", product.Image_4[0]);

    dispatch(createProductAsync(formData));

    if(status === "idle"){
      alert.success("Product Created Successfully")
      reset();
    }
  };

  return (
    <>
      <>
        {/* component */}
        <div className="container p-5">
          <div className="dark:bg-gray-700 bg-white shadow-lg rounded-2xl">
            <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white dark:bg-gray-700 px-4 pb-[20px] pt-4 shadow-2xl dark:shadow-2xl dark:shadow-gray-500 shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
              
                <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                  Add Product
                </h4>
            </div>
            <div className="w-full flex justify-center mt-10 pb-10">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-2 w-full grid grid-cols-1 gap-x-6 gap-y-8"
              >
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium  text-gray-800 dark:text-gray-200"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    {...register("title", {
                      required: "Product title is Required",
                    })}
                    className="bg-gray-50 border border-gray-300 w-full text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Discription"
                    className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                  >
                    Discription
                  </label>
                  <textarea
                    rows={"3"}
                    {...register("discription", {
                      required: "Product discription is Required",
                    })}
                    placeholder="type here"
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.discription && (
                    <p className="text-red-500">{errors.discription.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Category"
                    className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                  >
                    Category
                  </label>
                  <select
                    type="text"
                    {...register("category", {
                      required: "Product Category is Required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  >
                    <option disabled>Choose option</option>

                    {categories &&
                      categories.map((cat, index) => (
                        <option key={index} value={cat.id}>{cat.value}</option>
                      ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500">{errors.category.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Sub-Category"
                    className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                  >
                    Sub-Category
                  </label>
                  <select
                    type="text"
                    {...register("SubCategory", {
                      required: "Product Sub-Category is Required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Choose Option"
                  >
                    <option disabled>Choose option</option>

                    {subCategories &&
                      subCategories.map((Subcat, index) => (
                        <option key={index} value={Subcat.id}>{Subcat.value}</option>
                      ))}
                  </select>
                  {errors.SubCategory && (
                    <p className="text-red-500">{errors.SubCategory.message}</p>
                  )}
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <label
                      htmlFor="Price"
                      className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      {...register("price", {
                        required: "Product Price is Required",
                        min: 1,
                      })}
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.price && (
                      <p className="text-red-500">{errors.price.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="discountPercentage"
                      className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      Discount Percantage
                    </label>
                    <input
                      type="number"
                      {...register("discountPercentage", {
                        required: "Product discount Percentage is Required",
                        min: 1,
                        max: 100,
                      })}
                      id="last_name"
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                    {errors.discountPercentage && (
                      <p className="text-red-500">
                        {errors.discountPercentage.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="Brand"
                      className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      {" "}
                      Brand{" "}
                    </label>
                    <select
                      type="text"
                      {...register("brand", {
                        required: "Product Brand is Required",
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    >
                      <option disabled>Choose option</option>

                      {brands &&
                        brands.map((brand, index) => (
                          <option key={index} value={brand.id}>{brand.value}</option>
                        ))}
                    </select>
                    {errors.brand && (
                      <p className="text-red-500">{errors.brand.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="Stock"
                      className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      {" "}
                      Stock{" "}
                    </label>
                    <input
                      type="number"
                      {...register("stock", {
                        required: "Product Stock is Required",
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                    {errors.stock && (
                      <p className="text-red-500">{errors.stock.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="Colour"
                      className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      {" "}
                      Colour
                    </label>
                    <select
                      type="text"
                      {...register("colour", {
                        required: "Product Colour is Required",
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    >
                      <option disabled>Choose option</option>
                      {colour &&
                        colour.map((colour, index) => (
                          <option key={index} value={colour.id}>{colour.value}</option>
                        ))}{" "}
                    </select>
                    {errors.colour && (
                      <p className="text-red-500">{errors.colour.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="Size"
                      className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      Size
                    </label>
                    <select
                      type="text"
                      {...register("size", {
                        required: "Product Size is Required",
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    >
                      <option disabled>Choose option</option>
                      {size &&
                        size.map((size, index) => (
                          <option key={index} value={size.id}>{size.value}</option>
                        ))}{" "}
                    </select>
                    {errors.size && (
                      <p className="text-red-500">{errors.size.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                      htmlFor="Thumbnail"
                    >
                      Thumbnail
                    </label>
                    <input
                      {...register("thumbnail", {
                        required: "Product Thumbnail is Required",
                      })}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      name="thumbnail"
                      type="File"
                    />
                    {errors.thumbnail && (
                      <p className="text-red-500">{errors.thumbnail.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                      htmlFor="Image 1"
                    >
                      Image 1
                    </label>
                    <input
                      {...register("Image_1", {
                        required: "Product Image 1 is Required",
                      })}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      type="File"
                    />
                    {errors.Image_1 && (
                      <p className="text-red-500">{errors.Image_1.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                      htmlFor="Image 2"
                    >
                      Image 2
                    </label>
                    <input
                      {...register("Image_2", {
                        required: "Product Image 2 is Required",
                      })}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="File_input"
                      type="File"
                    />
                    {errors.Image_2 && (
                      <p className="text-red-500">{errors.Image_2.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                      htmlFor="Image 2"
                    >
                      Image 3
                    </label>
                    <input
                      {...register("Image_3", {
                        required: "Product Image 3 is Required",
                      })}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="File_input"
                      type="File"
                    />
                    {errors.Image_3 && (
                      <p className="text-red-500">{errors.Image_3.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                      htmlFor="Image 4"
                    >
                      Image 4
                    </label>
                    <input
                      {...register("Image_4", {
                        required: "Product Image 4 is Required",
                      })}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="File_input"
                      type="File"
                    />
                    {errors.Image_4 && (
                      <p className="text-red-500">{errors.Image_4.message}</p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="outline-none uppercase font-sans text-xs font-bold text-white  bg-green-400 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/40	hover:border-none rounded-full px-4 py-2 focus:outline-none"
                >
                  Save
                </button>
              </form>
            </div>
            {errors.Category && (
              <p className="text-red-500">{errors.Category.message}</p>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default AddProduct;
