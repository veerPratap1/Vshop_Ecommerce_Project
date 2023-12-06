import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrandAsync,
  fetchCatagoryAsync,
  fetchColourAsync,
  fetchProductByIdAsync,
  fetchSizeAsync,
  fetchSubCatagoryAsync,
  selectBrand,
  selectCatagory,
  selectColour,
  selectProductById,
  selectSize,
  selectSubCatagory,
  updateProductAsync,
  updateProductImagesAsync,
  updateProductThumbnailAsync,
} from "../../Product-list/ProductSlice";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";

const AdminProductView = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const selectedProduct = useSelector(selectProductById);
  const colour = useSelector(selectColour);
  const size = useSelector(selectSize);
  const category = useSelector(selectCatagory);
  const subCategory = useSelector(selectSubCatagory);
  const brand = useSelector(selectBrand);

  let [addColour, setAddColour] = useState(false);
  let [addSize, setAddSize] = useState(false);

  const param = useParams();

  if (addColour === true || addSize === true) {
    window.scrollTo(0, 700);
  }

  useEffect(() => {
    dispatch(fetchProductByIdAsync(param.id));
    dispatch(fetchColourAsync());
    dispatch(fetchSizeAsync());
    dispatch(fetchCatagoryAsync());
    dispatch(fetchSubCatagoryAsync());
    dispatch(fetchBrandAsync());
  }, [dispatch, param.id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.colour) {
      if (
        selectedProduct?.colour?.findIndex(
          (colour) => colour.id === data.colour
        ) < 0
      ) {
        const colour = {
          id: selectedProduct?.id,
          colour: [
            ...selectedProduct?.colour.map((colour) => colour.id),
          ],
        };
        colour.colour.push(data.colour)
        dispatch(updateProductAsync(colour));

        setAddColour(false);
        reset();
      } else {
        alert.info("colour is Already Added");
      }
    }
    if (data.size) {
      if (
        selectedProduct?.size?.findIndex((size) => size.id === data.size) < 0
      ) {
        const size = {
          id: selectedProduct.id,
          size: [...selectedProduct.size.map((size) => size.id)],
        };
        size.size.push(data.size)
        dispatch(updateProductAsync(size));
        reset();
        setAddSize(false);
      } else {
        alert.info("Size is Already Added");
      }
    }
    if (data.title) {
      const title = { id: selectedProduct.id, title: data.title };

      dispatch(updateProductAsync(title));
      reset();
      setTitleInput(false);
    }
    if (data.description) {
      const description = {
        id: selectedProduct.id,
        description: data.description,
      };

      dispatch(updateProductAsync(description));
      reset();
      setDescriptionInput(false);
    }
    if (data.category) {
      const category = { id: selectedProduct.id, category: data.category };

      dispatch(updateProductAsync(category));
      reset();
      setcategoryInput(false);
    }
    if (data.subCategory) {
      const subCategory = {
        id: selectedProduct.id,
        subCategory: data.subCategory,
      };

      dispatch(updateProductAsync(subCategory));
      reset();
      setSubCategoryInput(false);
    }
    if (data.stock) {
      const stock = { id: selectedProduct.id, stock: data.stock };

      dispatch(updateProductAsync(stock));
      reset();
      setstockInput(false);
    }
    if (data.brand) {
      const brand = { id: selectedProduct.id, brand: data.brand };

      dispatch(updateProductAsync(brand));
      reset();
      setbrandInput(false);
    }
    if (data.price) {
      const price = { id: selectedProduct.id, price: data.price };

      dispatch(updateProductAsync(price));
      reset();
      setPriceInput(false);
    }
    if (data.discountPercentage) {
      const discountPercentage = {
        id: selectedProduct.id,
        discountPercentage: data.discountPercentage,
      };

      dispatch(updateProductAsync(discountPercentage));
      reset();
      setdiscountPercentageInput(false);
    }
    if (data.thumbnail) {
      const product = {
        ...selectedProduct,
      };

      const id = product.id;

      const formData = new FormData();

      formData.append("thumbnail", data.thumbnail[0]);

      dispatch(updateProductThumbnailAsync({ formData, id }));
      reset();
      setthumbnailInput(false);
    }
    if (data.image1) {
      const product = {
        ...selectedProduct,
      };

      const id = product.id;

      const index = 0;

      const formData = new FormData();

      formData.append("image", data.image1[0]);

      dispatch(updateProductImagesAsync({ formData, id, index }));

      reset();
      setimagesInput1(false);
    }
    if (data.image2) {
      const product = {
        ...selectedProduct,
      };

      const id = product.id;

      const index = 1;

      const formData = new FormData();

      formData.append("image", data.image2[0]);

      dispatch(updateProductImagesAsync({ formData, id, index }));

      reset();
      setimagesInput2(false);
    }
    if (data.image3) {
      const product = {
        ...selectedProduct,
      };

      const id = product.id;

      const index = 2;

      const formData = new FormData();

      formData.append("image", data.image3[0]);

      dispatch(updateProductImagesAsync({ formData, id, index }));

      reset();
      setimagesInput3(false);
    }
    if (data.image4) {
      const product = {
        ...selectedProduct,
      };

      const id = product.id;

      const index = 3;

      const formData = new FormData();

      formData.append("image", data.image4[0]);

      dispatch(updateProductImagesAsync({ formData, id, index }));

      reset();
      setimagesInput4(false);
    }
  };

  const handleRemoveColour = (index) => {
    const newproduct = {
      ...selectedProduct,
      colour: selectedProduct.colour.map((colour) => colour.id),
      size: selectedProduct.size.map((size) => size.id),
      category: selectedProduct.category.id,
      subCategory: selectedProduct.subCategory.id,
      brand: selectedProduct.brand.id,
    };

    newproduct.colour.splice(index, 1);

    dispatch(updateProductAsync(newproduct));
  };

  const handleRemoveSize = (index) => {
    const newproduct = {
      ...selectedProduct,
      colour: selectedProduct.colour.map((colour) => colour.id),
      size: selectedProduct.size.map((size) => size.id),
      category: selectedProduct.category.id,
      subCategory: selectedProduct.subCategory.id,
      brand: selectedProduct.brand.id,
    };

    newproduct.size.splice(index, 1);

    dispatch(updateProductAsync(newproduct));
  };

  let [titleInput, setTitleInput] = useState(false);
  let [DescriptionInput, setDescriptionInput] = useState(false);
  let [categoryInput, setcategoryInput] = useState(false);
  let [subCategoryInput, setSubCategoryInput] = useState(false);
  let [priceInput, setPriceInput] = useState(false);
  let [discountPercentageInput, setdiscountPercentageInput] = useState(false);
  let [stockInput, setstockInput] = useState(false);
  let [brandInput, setbrandInput] = useState(false);
  let [thumbnailInput, setthumbnailInput] = useState(false);
  let [imagesInput1, setimagesInput1] = useState(false);
  let [imagesInput2, setimagesInput2] = useState(false);
  let [imagesInput3, setimagesInput3] = useState(false);
  let [imagesInput4, setimagesInput4] = useState(false);

  return (
    <>
      {selectedProduct && (
        <>
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg m-3 shadow-xl p-2 md:p-8">
            <h4 className="text-xl text-amber-500 dark:text-gray-100 font-bold">
              Product Info
            </h4>
            <ul className="mt-2 text-gray-700 dark:text-gray-100">
              <li className="flex justify-between md:px-10 border-b py-2">
                <span className="font-bold w-24">Title :</span>
                <span className="text-gray-700 dark:text-gray-100">
                  {selectedProduct.title}
                </span>

                {titleInput ? (
                  <>
                    <form>
                      <div className="flex">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  ">
                          <input
                            type="text"
                            {...register("title", {
                              required: "Product title is Required",
                            })}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <i
                          onClick={() => setTitleInput(false)}
                          className="fa-regular fa-circle-xmark cursor-pointer text-orange-500 text-2xl ms-2 "
                        ></i>
                        <i
                          onClick={handleSubmit(onSubmit)}
                          className="fa-regular fa-circle-check text-green-500 cursor-pointer text-2xl ms-2"
                        ></i>
                      </div>
                      {errors.title && (
                        <p className="text-red-500 text-xs">
                          {errors.title.message}
                        </p>
                      )}
                    </form>
                  </>
                ) : (
                  <i
                    onClick={() => setTitleInput(true)}
                    className="fa-regular fa-pen-to-square cursor-pointer text-fuchsia-500 text-xl"
                  ></i>
                )}
              </li>
              <li className="flex justify-between md:px-10 border-b py-2">
                <span className="font-bold w-24">Description:</span>
                {selectedProduct.description && (
                  <span className="text-gray-700 dark:text-gray-100">
                    {selectedProduct.description.substring(0, 20)}....
                  </span>
                )}
                {DescriptionInput ? (
                  <>
                    <form>
                      <div className="flex">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  ">
                          <textarea
                            type="text"
                            {...register("description", {
                              required: "Product description is Required",
                            })}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <i
                          onClick={() => setDescriptionInput(false)}
                          className="fa-regular fa-circle-xmark cursor-pointer text-orange-500 text-2xl ms-2 "
                        ></i>
                        <i
                          onClick={handleSubmit(onSubmit)}
                          className="fa-regular fa-circle-check text-green-500 cursor-pointer text-2xl ms-2"
                        ></i>
                      </div>
                      {errors.description && (
                        <p className="text-red-500 text-xs">
                          {errors.description.message}
                        </p>
                      )}
                    </form>
                  </>
                ) : (
                  <i
                    onClick={() => setDescriptionInput(true)}
                    className="fa-regular fa-pen-to-square cursor-pointer text-fuchsia-500 text-xl"
                  ></i>
                )}
              </li>
              <li className="flex justify-between md:px-10 border-b py-2">
                <span className="font-bold w-24">Price :</span>
                <span className="text-gray-700 dark:text-gray-100">
                  {selectedProduct.price}
                </span>

                {priceInput ? (
                  <>
                    <form>
                      <div className="flex">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  ">
                          <input
                            type="text"
                            {...register("price", {
                              required: "Product price is Required",
                            })}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <i
                          onClick={() => setPriceInput(false)}
                          className="fa-regular fa-circle-xmark cursor-pointer text-orange-500 text-2xl ms-2 "
                        ></i>
                        <i
                          onClick={handleSubmit(onSubmit)}
                          className="fa-regular fa-circle-check text-green-500 cursor-pointer text-2xl ms-2"
                        ></i>
                      </div>
                      {errors.price && (
                        <p className="text-red-500 text-xs">
                          {errors.price.message}
                        </p>
                      )}
                    </form>
                  </>
                ) : (
                  <i
                    onClick={() => setPriceInput(true)}
                    className="fa-regular fa-pen-to-square cursor-pointer text-fuchsia-500 text-xl"
                  ></i>
                )}
              </li>
              <li className="flex justify-between md:px-10 border-b py-2">
                <span className="font-bold w-24">Discount Percentage :</span>
                <span className="text-gray-700 dark:text-gray-100">
                  {selectedProduct.discountPercentage}
                </span>

                {discountPercentageInput ? (
                  <>
                    <form>
                      <div className="flex">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  ">
                          <input
                            type="text"
                            {...register("discountPercentage", {
                              required:
                                "Product discountPercentage is Required",
                            })}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <i
                          onClick={() => setdiscountPercentageInput(false)}
                          className="fa-regular fa-circle-xmark cursor-pointer text-orange-500 text-2xl ms-2 "
                        ></i>
                        <i
                          onClick={handleSubmit(onSubmit)}
                          className="fa-regular fa-circle-check text-green-500 cursor-pointer text-2xl ms-2"
                        ></i>
                      </div>
                      {errors.discountPercentage && (
                        <p className="text-red-500 text-xs">
                          {errors.discountPercentage.message}
                        </p>
                      )}
                    </form>
                  </>
                ) : (
                  <i
                    onClick={() => setdiscountPercentageInput(true)}
                    className="fa-regular fa-pen-to-square cursor-pointer text-fuchsia-500 text-xl"
                  ></i>
                )}
              </li>
              <li className="flex justify-between md:px-10 border-b py-2">
                <span className="font-bold w-24">Category:</span>
                <span className="text-gray-700 dark:text-gray-100">
                  {selectedProduct?.category?.value}
                </span>
                {categoryInput ? (
                  <>
                    <form>
                      <div className="flex">
                        <div className="flex rounded-md shadow-sm ring-1 w-44 ring-inset ring-gray-300  ">
                          <select
                            type="text"
                            {...register("category", {
                              required: "Product category is Required",
                            })}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {category.map((category, index) => (
                              <option key={index} value={category.id}>
                                {category.value}
                              </option>
                            ))}
                          </select>
                        </div>

                        <i
                          onClick={() => setcategoryInput(false)}
                          className="fa-regular fa-circle-xmark cursor-pointer text-orange-500 text-2xl ms-2 "
                        ></i>
                        <i
                          onClick={handleSubmit(onSubmit)}
                          className="fa-regular fa-circle-check text-green-500 cursor-pointer text-2xl ms-2"
                        ></i>
                      </div>
                      {errors.category && (
                        <p className="text-red-500 text-xs">
                          {errors.category.message}
                        </p>
                      )}
                    </form>
                  </>
                ) : (
                  <i
                    onClick={() => setcategoryInput(true)}
                    className="fa-regular fa-pen-to-square cursor-pointer text-fuchsia-500 text-xl"
                  ></i>
                )}
              </li>
              <li className="flex justify-between md:px-10 border-b py-2">
                <span className="font-bold w-24">Sub-Category:</span>
                <span className="text-gray-700 dark:text-gray-100">
                  {selectedProduct?.subCategory?.value}
                </span>
                {subCategoryInput ? (
                  <>
                    <form>
                      <div className="flex">
                        <div className="flex rounded-md shadow-sm ring-1 w-44 ring-inset ring-gray-300  ">
                          <select
                            type="text"
                            {...register("subCategory", {
                              required: "Product subCategory is Required",
                            })}
                            className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {subCategory.map((subCategory, index) => (
                              <option key={index} value={subCategory.id}>
                                {subCategory.value}
                              </option>
                            ))}
                          </select>
                        </div>

                        <i
                          onClick={() => setSubCategoryInput(false)}
                          className="fa-regular fa-circle-xmark cursor-pointer text-orange-500 text-2xl ms-2 "
                        ></i>
                        <i
                          onClick={handleSubmit(onSubmit)}
                          className="fa-regular fa-circle-check text-green-500 cursor-pointer text-2xl ms-2"
                        ></i>
                      </div>
                      {errors.subCategory && (
                        <p className="text-red-500 text-xs">
                          {errors.subCategory.message}
                        </p>
                      )}
                    </form>
                  </>
                ) : (
                  <i
                    onClick={() => setSubCategoryInput(true)}
                    className="fa-regular fa-pen-to-square cursor-pointer text-fuchsia-500 text-xl"
                  ></i>
                )}
              </li>
              <li className="flex justify-between md:px-10 border-b py-2">
                <span className="font-bold w-24">Stock:</span>
                <span className="text-gray-700 dark:text-gray-100">
                  {selectedProduct.stock}
                </span>
                {stockInput ? (
                  <>
                    <form>
                      <div className="flex">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  ">
                          <input
                            type="number"
                            {...register("stock", {
                              required: "Product stock is Required",
                            })}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 dark:text-gray-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <i
                          onClick={() => setstockInput(false)}
                          className="fa-regular fa-circle-xmark cursor-pointer text-orange-500 text-2xl ms-2 "
                        ></i>
                        <i
                          onClick={handleSubmit(onSubmit)}
                          className="fa-regular fa-circle-check text-green-500 cursor-pointer text-2xl ms-2"
                        ></i>
                      </div>
                      {errors.stock && (
                        <p className="text-red-500 text-xs">
                          {errors.stock.message}
                        </p>
                      )}
                    </form>
                  </>
                ) : (
                  <i
                    onClick={() => setstockInput(true)}
                    className="fa-regular fa-pen-to-square cursor-pointer text-fuchsia-500 text-xl"
                  ></i>
                )}
              </li>
              <li className="flex justify-between md:px-10 border-b py-2">
                <span className="font-bold w-24">Brand:</span>
                <span className="text-gray-700 dark:text-gray-100">
                  {selectedProduct?.brand?.value}
                </span>
                {brandInput ? (
                  <>
                    <form>
                      <div className="flex">
                        <div className="flex rounded-md shadow-sm ring-1 w-44 ring-inset ring-gray-300  ">
                          <select
                            type="text"
                            {...register("brand", {
                              required: "Product brand is Required",
                            })}
                            className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {brand.map((brand, index) => (
                              <option key={index} value={brand.id}>
                                {brand.value}
                              </option>
                            ))}
                          </select>
                        </div>

                        <i
                          onClick={() => setbrandInput(false)}
                          className="fa-regular fa-circle-xmark cursor-pointer text-orange-500 text-2xl ms-2 "
                        ></i>
                        <i
                          onClick={handleSubmit(onSubmit)}
                          className="fa-regular fa-circle-check text-green-500 cursor-pointer text-2xl ms-2"
                        ></i>
                      </div>
                      {errors.brand && (
                        <p className="text-red-500 text-xs">
                          {errors.brand.message}
                        </p>
                      )}
                    </form>
                  </>
                ) : (
                  <i
                    onClick={() => setbrandInput(true)}
                    className="fa-regular fa-pen-to-square cursor-pointer text-fuchsia-500 text-xl"
                  ></i>
                )}
              </li>
              <li className="flex justify-between md:px-10 border-b py-2">
                <span className="font-bold w-24">Colour:</span>
                {selectedProduct?.colour?.map((colour, index) => (
                  <>
                    <span
                      key={index}
                      className="text-gray-700 dark:text-gray-100"
                    >
                      {colour.value}
                    </span>
                    <i
                      onClick={() => handleRemoveColour(index)}
                      className="fa-regular cursor-pointer fa-trash-can text-red-500 hover:text-red-400 ms-1"
                    ></i>
                  </>
                ))}
              </li>
              {addColour && (
                <form className="my-4 -ms-1 px-2">
                  <select
                    type="text"
                    {...register("colour", {
                      required: "Product Colour is Required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled>Choose option</option>
                    {colour &&
                      colour.map((colour, index) => (
                        <option key={index} value={colour.id}>
                          {colour.value}
                        </option>
                      ))}
                  </select>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className=" mt-2 select-none rounded bg-pink-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                  >
                    Add
                  </button>
                  {errors.colour && (
                    <p className="text-red-500">{errors.colour.message}</p>
                  )}
                </form>
              )}
              <li className="flex justify-between md:px-10 border-b py-2">
                <span className="font-bold w-24">Size:</span>
                {selectedProduct?.size?.map((size, index) => (
                  <>
                    <span
                      key={index}
                      className="text-gray-700 dark:text-gray-100"
                    >
                      {size.value}
                    </span>
                    <i
                      onClick={() => handleRemoveSize(index)}
                      className="fa-regular cursor-pointer fa-trash-can text-red-500 hover:text-red-400 ms-1"
                    ></i>
                  </>
                ))}
              </li>
              {addSize && (
                <form className="my-4 -ms-1 px-2">
                  <select
                    type="text"
                    {...register("size", {
                      required: "Product size is Required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled>Choose option</option>
                    {size &&
                      size.map((size, index) => (
                        <option key={index} value={size.id}>
                          {size.value}
                        </option>
                      ))}{" "}
                  </select>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className=" mt-2 select-none rounded bg-pink-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                  >
                    Add
                  </button>
                  {errors.size && (
                    <p className="text-red-500">{errors.size.message}</p>
                  )}
                </form>
              )}
              <li className="flex justify-between md:px-10 border-b py-2">
                <span className="font-bold w-24">Thumbnail :</span>
                <span className="text-gray-700  dark:text-gray-100">
                  <div className="text-sm w-15 h-15 font-medium text-navy-700 dark:text-white">
                    <img
                      src={`/${selectedProduct.thumbnail}`}
                      alt="product img"
                      className="w-12 md:w-12  mr-2 rounded-md overflow-hidden"
                    />
                  </div>
                </span>
                {thumbnailInput ? (
                  <>
                    <form>
                      <div className="flex">
                        <div className="flex w-44 rounded-md shadow-sm  ">
                          <input
                            className="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            name="thumbnail"
                            {...register("thumbnail", {
                              required: "Product thumbnail is Required",
                            })}
                            id="thumbnail"
                            type="File"
                          />
                        </div>

                        <i
                          onClick={() => setthumbnailInput(false)}
                          className="fa-regular fa-circle-xmark cursor-pointer text-orange-500 text-2xl ms-2 mt-2 "
                        ></i>
                        <i
                          onClick={handleSubmit(onSubmit)}
                          className="fa-regular fa-circle-check text-green-500 cursor-pointer text-2xl ms-2 mt-2"
                        ></i>
                      </div>
                      {errors.thumbnail && (
                        <p className="text-red-500 text-xs">
                          {errors.thumbnail.message}
                        </p>
                      )}
                    </form>
                  </>
                ) : (
                  <i
                    onClick={() => setthumbnailInput(true)}
                    className="fa-regular fa-pen-to-square cursor-pointer text-fuchsia-500 text-xl"
                  ></i>
                )}
              </li>
              {selectedProduct && (
                <>
                  <li className="flex justify-between md:px-10 border-b py-2">
                    <span className="font-bold w-24">Image 1:</span>
                    <span className="text-gray-700 dark:text-gray-100">
                      <div className="text-sm w-15 h-15 font-medium text-navy-700 dark:text-white">
                        <img
                          src={`/${selectedProduct?.images[0]}`}
                          alt="product img"
                          className="w-12 md:w-12  mr-2 rounded-md overflow-hidden"
                        />
                      </div>
                    </span>
                    {imagesInput1 ? (
                      <>
                        <form>
                          <div className="flex">
                            <div className="flex w-44 rounded-md shadow-sm ">
                              <input
                                className="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                name="image1"
                                {...register("image1", {
                                  required: "Product image1 is Required",
                                })}
                                id="image1"
                                type="File"
                              />
                            </div>

                            <i
                              onClick={() => setimagesInput1(false)}
                              className="fa-regular fa-circle-xmark cursor-pointer text-orange-500 text-2xl ms-2 mt-2 "
                            ></i>
                            <i
                              onClick={handleSubmit(onSubmit)}
                              className="fa-regular fa-circle-check text-green-500 cursor-pointer text-2xl ms-2 mt-2"
                            ></i>
                          </div>
                          {errors.image1 && (
                            <p className="text-red-500 text-xs">
                              {errors.image1.message}
                            </p>
                          )}
                        </form>
                      </>
                    ) : (
                      <i
                        onClick={() => setimagesInput1(true)}
                        className="fa-regular fa-pen-to-square cursor-pointer text-fuchsia-500 text-xl"
                      ></i>
                    )}
                  </li>
                  <li className="flex justify-between md:px-10 border-b py-2">
                    <span className="font-bold w-24">Image 2:</span>
                    <span className="text-gray-700 dark:text-gray-100">
                      <div className="text-sm w-15 h-15 font-medium text-navy-700 dark:text-white">
                        <img
                          src={`/${selectedProduct.images[1]}`}
                          alt="product img"
                          className="w-12 md:w-12  mr-2 rounded-md overflow-hidden"
                        />
                      </div>
                    </span>
                    {imagesInput2 ? (
                      <>
                        <form>
                          <div className="flex">
                            <div className="flex w-44 rounded-md shadow-sm ">
                              <input
                                className="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                name="image2"
                                {...register("image2", {
                                  required: "Product image2 is Required",
                                })}
                                id="image2"
                                type="File"
                              />
                            </div>

                            <i
                              onClick={() => setimagesInput2(false)}
                              className="fa-regular fa-circle-xmark cursor-pointer text-orange-500 text-2xl ms-2 mt-2 "
                            ></i>
                            <i
                              onClick={handleSubmit(onSubmit)}
                              className="fa-regular fa-circle-check text-green-500 cursor-pointer text-2xl ms-2 mt-2"
                            ></i>
                          </div>
                          {errors.image2 && (
                            <p className="text-red-500 text-xs">
                              {errors.image2.message}
                            </p>
                          )}
                        </form>
                      </>
                    ) : (
                      <i
                        onClick={() => setimagesInput2(true)}
                        className="fa-regular fa-pen-to-square cursor-pointer text-fuchsia-500 text-xl"
                      ></i>
                    )}
                  </li>
                  <li className="flex justify-between md:px-10 border-b py-2">
                    <span className="font-bold w-24">Image 3:</span>
                    <span className="text-gray-700 dark:text-gray-100">
                      <div className="text-sm w-15 h-15 font-medium text-navy-700 dark:text-white">
                        <img
                          src={`/${selectedProduct.images[2]}`}
                          alt="product img"
                          className="w-12 md:w-12  mr-2 rounded-md overflow-hidden"
                        />
                      </div>
                    </span>
                    {imagesInput3 ? (
                      <>
                        <form>
                          <div className="flex">
                            <div className="flex w-44 rounded-md shadow-sm ">
                              <input
                                className="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                name="image3"
                                {...register("image3", {
                                  required: "Product image3 is Required",
                                })}
                                id="image3"
                                type="File"
                              />
                            </div>

                            <i
                              onClick={() => setimagesInput3(false)}
                              className="fa-regular fa-circle-xmark cursor-pointer text-orange-500 text-2xl ms-2 mt-2 "
                            ></i>
                            <i
                              onClick={handleSubmit(onSubmit)}
                              className="fa-regular fa-circle-check text-green-500 cursor-pointer text-2xl ms-2 mt-2"
                            ></i>
                          </div>
                          {errors.image3 && (
                            <p className="text-red-500 text-xs">
                              {errors.image3.message}
                            </p>
                          )}
                        </form>
                      </>
                    ) : (
                      <i
                        onClick={() => setimagesInput3(true)}
                        className="fa-regular fa-pen-to-square cursor-pointer text-fuchsia-500 text-xl"
                      ></i>
                    )}
                  </li>
                  <li className="flex justify-between md:px-10 py-2">
                    <span className="font-bold w-24">Image 4:</span>
                    <span className="text-gray-700 dark:text-gray-100">
                      <div className="text-sm w-15 h-15 font-medium text-navy-700 dark:text-white">
                        <img
                          src={`/${selectedProduct.images[3]}`}
                          alt="product img"
                          className="w-12 md:w-12  mr-2 rounded-md overflow-hidden"
                        />
                      </div>
                    </span>
                    {imagesInput4 ? (
                      <>
                        <form>
                          <div className="flex">
                            <div className="flex w-44 rounded-md shadow-sm ">
                              <input
                                className="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                name="image4"
                                {...register("image4", {
                                  required: "Product image4 is Required",
                                })}
                                id="image4"
                                type="File"
                              />
                            </div>

                            <i
                              onClick={() => setimagesInput4(false)}
                              className="fa-regular fa-circle-xmark cursor-pointer text-orange-500 text-2xl ms-2 mt-2 "
                            ></i>
                            <i
                              onClick={handleSubmit(onSubmit)}
                              className="fa-regular fa-circle-check text-green-500 cursor-pointer text-2xl ms-2 mt-2"
                            ></i>
                          </div>
                          {errors.image4 && (
                            <p className="text-red-500 text-xs">
                              {errors.image4.message}
                            </p>
                          )}
                        </form>
                      </>
                    ) : (
                      <i
                        onClick={() => setimagesInput4(true)}
                        className="fa-regular fa-pen-to-square cursor-pointer text-fuchsia-500 text-xl"
                      ></i>
                    )}
                  </li>
                </>
              )}
              <p>*NOTE: Please select image one by one for update</p>
            </ul>
          </div>
          <div className="flex justify-center gap-2 mx-2">
            {addColour ? (
              <button
                onClick={(e) => setAddColour(false)}
                className="middle none center mt-2 md:mt-0 rounded-full bg-orange-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Cancle
              </button>
            ) : (
              <button
                onClick={(e) => setAddColour(true)}
                className="middle none center mt-2 md:mt-0 rounded-full bg-orange-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Add More Colour
              </button>
            )}
            {addSize ? (
              <button
                className="middle none center mt-2 md:mt-0 rounded-full bg-blue-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                onClick={(e) => setAddSize(false)}
              >
                Cancle
              </button>
            ) : (
              <button
                className="middle none center mt-2 md:mt-0 rounded-full bg-blue-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                onClick={(e) => setAddSize(true)}
              >
                Add More Size
              </button>
            )}
            <button
              onClick={handleSubmit(onSubmit)}
              className="middle none center mt-2 md:mt-0 rounded-full bg-fuchsia-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-fuchsia-500/20 transition-all hover:shadow-lg hover:shadow-fuchsia-500/40 focus:opacity-[0.85] focus:shadow-none   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              Update Product
            </button>
            <>{/* Modal */}</>
          </div>
        </>
      )}
    </>
  );
};

export default AdminProductView;
