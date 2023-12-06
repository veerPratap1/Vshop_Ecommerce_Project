import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReviewAsync,
  fetchProductByIdAsync,
  selectProductById,
  selectProductError,
  selectProductStatus,
} from "../ProductSlice";
import { useNavigate, useParams } from "react-router-dom";
import { addToCartByIdAsync, selectCartItem } from "../../Cart/CartSlice";
import { discountedPrice } from "../../../app/constant";
import { useAlert } from "react-alert";
import ReactLoading from "react-loading";
import { Carousel, IconButton } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { selectUserInfo } from "../../user/UserSlice";
import {
  Bar,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const params = useParams();

  const items = useSelector(selectCartItem);

  const user = useSelector(selectUserInfo);

  const navigatetoLogin = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  const product = useSelector(selectProductById);

  const compairDate = (a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (dateA < dateB) {
      return +1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  };

  const productReviews = product?.reviews.slice().sort(compairDate);

  let [quantity, setQuantity] = useState(1);

  const handleQuantity = (e) => {
    const value = e.target.value;

    setQuantity(value);
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };
  const descrease = () => {
    setQuantity(quantity - 1);
  };

  const status = useSelector(selectProductStatus);
  const handleCart = (e) => {
    e.preventDefault();

    if (!user) {
      navigatetoLogin("/login");
    } else if (product.stock <= 0) {
      alert.error("Product is Out of Stock");
    } else {
      if (items.findIndex((item) => item.product.id === product.id) < 0) {
        if (quantity > 0 && activeColour && activeSize) {
          const newItem = {
            quantity: quantity,
            product: product.id,
            size: activeSize,
            colour: activeColour,
          };
          dispatch(addToCartByIdAsync(newItem));
          if (status === "idle") {
            alert.success("Product added to Cart");
          }
        } else {
          alert.error("Quantity, size, colour Not Valid");
        }
      } else {
        alert.error("Product already added to Cart");
      }
    }
  };

  let [activeSize, setActiveSize] = useState();
  let [activeColour, setActiveColour] = useState();

  const handlesize = (e) => {

    const value = e.target.value;

    setActiveSize(value);
  };
  const handleColour = (e) => {

    const value = e.target.value;

    setActiveColour(value);
  };

  const error = useSelector(selectProductError);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    if (!user) {
      navigatetoLogin("/login");
    } else {
      if (product.reviews.findIndex((review) => review.user === user.id) < 0) {
        const review = {
          id: product.id,
          rating: +data.star,
          comment: data.comment,
        };

        dispatch(createReviewAsync(review));

        if (status === "idle") {
          alert.success("Sub-Category is Successfully added");
        }
        reset();
      } else {
        alert.error("Already Reviewed");
      }
    }
  };

  const allProduct = { ...product };

  const star5 = allProduct?.reviews?.filter((review) => review.rating === 5);
  const star4 = allProduct?.reviews?.filter((review) => review.rating === 4);
  const star3 = allProduct?.reviews?.filter((review) => review.rating === 3);
  const star2 = allProduct?.reviews?.filter((review) => review.rating === 2);
  const star1 = allProduct?.reviews?.filter((review) => review.rating === 1);

  const Percentage5 = (star5?.length * 100) / allProduct.numReviews;
  const Percentage4 = (star4?.length * 100) / allProduct.numReviews;
  const Percentage3 = (star3?.length * 100) / allProduct.numReviews;
  const Percentage2 = (star2?.length * 100) / allProduct.numReviews;
  const Percentage1 = (star1?.length * 100) / allProduct.numReviews;

  const data = [
    {
      name: "5 stars",
      Percentage: Percentage5,
    },
    {
      name: "4 stars",
      Percentage: Percentage4,
    },
    {
      name: "3 stars",
      Percentage: Percentage3,
    },
    {
      name: "2 stars",
      Percentage: Percentage2,
    },
    {
      name: "1 stars",
      Percentage: Percentage1,
    },
  ];

  return (
    <>
      {product && (
        <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-700">
          <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4 md:w-1/2 ">
                {product.images && (
                  <div className="sticky top-0 z-30 overflow-hidden ">
                    <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                      <Carousel
                        className="rounded-lg z-30 bg-gray-100 items-center mt-8 h-full sm:h-48 md:h-60 lg:h-full"
                        transition={{ duration: 1 }}
                        prevArrow={({ handlePrev }) => (
                          <IconButton
                            variant="text"
                            color="gray"
                            size="lg"
                            onClick={handlePrev}
                            className="!absolute top-2/4 left-4 -translate-y-2/4"
                          >
                            <i className="fa-solid fa-chevron-left text-2xl"></i>
                          </IconButton>
                        )}
                        nextArrow={({ handleNext }) => (
                          <IconButton
                            variant="text"
                            color="gray"
                            size="lg"
                            onClick={handleNext}
                            className="!absolute top-2/4 !right-4 -translate-y-2/4"
                          >
                            <i className="fa-solid fa-chevron-right text-2xl"></i>
                          </IconButton>
                        )}
                        navigation={({
                          setActiveIndex,
                          activeIndex,
                          length,
                        }) => (
                          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                            {new Array(length).fill("").map((_, index) => (
                              <span
                                key={index}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                  activeIndex === index
                                    ? "w-8 bg-gray-600"
                                    : "w-4 bg-gray-300"
                                }`}
                                onClick={() => setActiveIndex(index)}
                              />
                            ))}
                          </div>
                        )}
                      >
                        <div className="relative bg-white h-full w-full">
                          <img
                            src={`/${product.thumbnail}`}
                            alt="product 1"
                            className="h-full w-full object-fit"
                          />
                        </div>
                        {product.images &&
                          product.images.map((images, index) => (
                            <div key={index} className="relative h-full w-full">
                              <img
                                src={`/${images}`}
                                alt="product 2"
                                className="h-full w-full object-fit"
                              />
                            </div>
                          ))}
                      </Carousel>
                    </div>
                    <div className="flex-wrap hidden md:flex ">
                      <div className="w-1/2 p-2 sm:w-1/4">
                        <span className="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                          <img
                            src={`/${product.images[0]}`}
                            alt=""
                            className="object-cover w-full lg:h-20"
                          />
                        </span>
                      </div>
                      <div className="w-1/2 p-2 sm:w-1/4">
                        <span className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                          <img
                            src={`/${product.images[1]}`}
                            alt=""
                            className="object-cover w-full lg:h-20"
                          />
                        </span>
                      </div>
                      <div className="w-1/2 p-2 sm:w-1/4">
                        <span className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                          <img
                            src={`/${product.images[2]}`}
                            alt=""
                            className="object-cover w-full lg:h-20"
                          />
                        </span>
                      </div>
                      <div className="w-1/2 p-2 sm:w-1/4">
                        <span className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                          <img
                            src={`/${product.images[3]}`}
                            alt=""
                            className="object-cover w-full lg:h-20"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full px-4 md:w-1/2 ">
                <div className="lg:pl-20">
                  <div className="mb-8 ">
                    <span className="text-lg font-medium text-rose-500 dark:text-rose-200">
                      New
                    </span>
                    <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                      {product.title}
                    </h2>
                    <div className="flex items-center mb-6">
                      <ul className="flex mr-2">
                        <li>
                          <div className="w-5 -mt-1 mr-1 text-yellow-400 dark:text-yellow-500">
                            <i
                              className={
                                product.rating >= 1
                                  ? "fas fa-star"
                                  : product.rating >= 0.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            ></i>
                          </div>
                        </li>
                        <li>
                          <div className="w-5 -mt-1 mr-1 text-yellow-400 dark:text-yellow-500">
                            <i
                              className={
                                product.rating >= 2
                                  ? "fas fa-star"
                                  : product.rating >= 1.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            ></i>
                          </div>
                        </li>
                        <li>
                          <div className="w-5 -mt-1 mr-1 text-yellow-400 dark:text-yellow-500">
                            <i
                              className={
                                product.rating >= 3
                                  ? "fas fa-star"
                                  : product.rating >= 2.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            ></i>
                          </div>
                        </li>
                        <li>
                          <div className="w-5 -mt-1 mr-1 text-yellow-400 dark:text-yellow-500">
                            <i
                              className={
                                product.rating >= 4
                                  ? "fas fa-star"
                                  : product.rating >= 3.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            ></i>
                          </div>
                        </li>
                        <li>
                          <div className="w-5 -mt-1 mr-1 text-yellow-400 dark:text-yellow-500">
                            <i
                              className={
                                product.rating >= 5
                                  ? "fas fa-star"
                                  : product.rating >= 4.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            ></i>
                          </div>
                        </li>
                      </ul>
                      <p className="text-xs dark:text-gray-400 ">
                        {product.numReviews}
                      </p>
                    </div>
                    <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                      {product.description}
                    </p>
                    <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                      <span>${discountedPrice(product)}</span>
                      <span className="text-base font-normal text-red-500 ms-2 line-through dark:text-red-400">
                        ${product.price}
                      </span>
                    </p>
                    {product.stock > 0 && (
                      <p className="text-green-600 dark:text-green-300 ">
                        {product.stock} in stock
                      </p>
                    )}
                    {product.stock <= 0 && (
                      <p className="text-red-600 font-bold dark:text-green-300 ">
                        Out of stock
                      </p>
                    )}
                  </div>
                  <div className="flex items-center mb-8">
                    <h2 className="w-16 mr-6 text-xl font-bold dark:text-gray-400">
                      Colors:
                    </h2>
                    <div className="flex flex-wrap">
                      {product?.colour?.map((colour) => (
                        <>
                          <label
                            htmlFor={colour.id}
                            className={`${
                              activeColour === colour.id
                                ? "border-2 border-blue-500 dark:border-gray-400"
                                : "dark:border-gray-800 dark:hover:border-gray-400"
                            } me-2  `}
                          >
                            <div
                              htmlFor={colour.id}
                              className={`w-6 h-6 border border-gray-500 ${
                                colour.value === "white"
                                  ? `bg-${colour.value} `
                                  : `bg-${colour.value}-400`
                              }`}
                            />
                          </label>
                          <input
                            type="radio"
                            id={colour.id}
                            name="colour"
                            className="hidden"
                            value={colour.id}
                            onClick={(e) => handleColour(e)}
                          />
                        </>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center mb-8">
                    <h2 className="w-16 text-xl font-bold dark:text-gray-400">
                      Size:
                    </h2>
                    {product.size &&
                      product.size.map((size, index) => (
                        <div key={index} className="flex flex-wrap">
                          <label
                            htmlFor={size.id}
                            className={`flex justify-center items-center mr-1 border ${
                              activeSize === size.id
                                ? "border-2 border-blue-500 dark:border-gray-200 dark:text-white"
                                : null
                            } w-10 h-8 hover:border-blue-400 font-lg dark:border-gray-400 hover:text-gray-800 dark:hover:border-gray-300 dark:text-gray-400`}
                          >
                            {size.value}
                          </label>
                          <input
                            type="radio"
                            id={size.id}
                            name="size"
                            className="hidden"
                            value={size.id}
                            onClick={(e) => handlesize(e)}
                          />
                        </div>
                      ))}
                  </div>
                  <div className="w-32 mb-8 ">
                    <label
                      htmlFor=""
                      className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400"
                    >
                      Quantity
                    </label>
                    <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                      <button
                        onClick={(e) => descrease()}
                        className="w-20 h-full text-gray-600 bg-gray-100 dark:bg-gray-700 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 hover:bg-gray-400"
                      >
                        <span className="m-auto text-2xl font-thin">-</span>
                      </button>
                      <input
                        type="text"
                        className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-200 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                        placeholder={quantity}
                        onChange={(e) => handleQuantity(e)}
                      />
                      <button
                        onClick={(e) => increase()}
                        className="w-20 h-full text-gray-600 bg-gray-100 dark:bg-gray-700 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400  hover:text-gray-700 hover:bg-gray-400"
                      >
                        <span className="m-auto text-2xl font-thin">+</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap w-full justify-center ">
                    {status === "loading" ? (
                      <span className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                        <ReactLoading
                          type={"spinningBubbles"}
                          color={"#a4bbc9"}
                          height={30}
                          width={30}
                        />
                      </span>
                    ) : (
                      <button
                        className="w-full px-4 mb-4 lg:w-full lg:mb-0 p-4 text-white border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-500 hover:border-blue-600 hover:text-white bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300"
                        onClick={(e) => handleCart(e)}
                      >
                        <p>Add to Cart</p>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {product && (
        <section className="flex items-center py-16 bg-gray-100 font-poppins dark:bg-gray-700 ">
          <div className="justify-center flex-1 max-w-6xl px-4 py-6 mx-auto lg:py-4 md:px-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="p-6 mb-6 bg-gray-50 dark:bg-gray-900">
                <h2 className="mb-6 text-4xl font-semibold text-left font-gray-600 dark:text-gray-400">
                  Ratings &amp; Reviews
                </h2>
                <div className="flex justify-start ">
                  <div className="flex items-center mb-2 space-x-2 text-4xl leading-none text-gray-600 dark:text-gray-400 ">
                    <div className="items-center font-bold ">
                      {product.rating.toString().substring(0, 3)}/5
                    </div>
                    <div className="items-center">
                      <ul className="flex items-center">
                        <li>
                          <div className=" text-yellow-400 text-2xl dark:text-yellow-500">
                            <i
                              className={
                                product.rating >= 1
                                  ? "fas fa-star"
                                  : product.rating >= 0.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            ></i>
                          </div>
                        </li>
                        <li>
                          <div className=" text-yellow-400 text-2xl dark:text-yellow-500">
                            <i
                              className={
                                product.rating >= 2
                                  ? "fas fa-star"
                                  : product.rating >= 1.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            ></i>
                          </div>
                        </li>
                        <li>
                          <div className=" text-yellow-400 text-2xl dark:text-yellow-500">
                            <i
                              className={
                                product.rating >= 3
                                  ? "fas fa-star"
                                  : product.rating >= 2.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            ></i>
                          </div>
                        </li>
                        <li>
                          <div className=" text-yellow-400 text-2xl dark:text-yellow-500">
                            <i
                              className={
                                product.rating >= 4
                                  ? "fas fa-star"
                                  : product.rating >= 3.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            ></i>
                          </div>
                        </li>
                        <li>
                          <div className=" text-yellow-400 text-2xl dark:text-yellow-500">
                            <i
                              className={
                                product.rating >= 5
                                  ? "fas fa-star"
                                  : product.rating >= 4.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            ></i>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mb-6 text-base dark:text-gray-400">
                  {product.numReviews} customer reviews
                </div>
                <div className="w-100% h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      layout="vertical"
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
                      <XAxis
                        type="number"
                        stroke="#ffff"
                        style={{ display: "none" }}
                      />
                      <YAxis dataKey="name" type="category" scale={""} />
                      <Tooltip />
                      <Bar
                        dataKey="Percentage"
                        label={{ position: "right" }}
                        barSize={20}
                        fill="#facc15"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="items-center mt-1 ">
                  <button className="px-4 py-2 text-xs text-gray-100 bg-cyan-500 hover:bg-cyan-600 ">
                    View all reviews
                  </button>
                </div>
              </div>
              <div className="p-6 mb-6 bg-white dark:bg-gray-900">
                <h2 className="mb-6 text-xl font-semibold text-left font-cyan-500 text-cyan-500 dark:text-gray-400">
                  Leave a comment
                </h2>
                <form action="" className="">
                  <div className="mb-6 ">
                    <select
                      className="block w-full px-4 leading-tight text-gray-700 bg-gray-100 border rounded dark:placeholder-gray-500 py-2 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800"
                      {...register("star", {
                        required: "Please Select star ",
                      })}
                    >
                      <option value="">Select</option>
                      <option value="1">1- Bad</option>
                      <option value="2">2- Fair</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very good</option>
                      <option value="5">5- Excelent</option>
                    </select>
                  </div>
                  <div className="mb-4 ">
                    <textarea
                      type="text"
                      placeholder="write a comment"
                      {...register("comment", {
                        required: "Please Enter Comments ",
                      })}
                      className="block w-full px-4 leading-tight text-gray-700 bg-gray-100 border rounded dark:placeholder-gray-500 py-7 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800 "
                    />
                  </div>
                  {errors.star && (
                    <p className="text-red-500 mb-4">{errors.star.message}</p>
                  )}
                  {errors.comment && (
                    <p className="text-red-500 mb-4">
                      {errors.comment.message}
                    </p>
                  )}
                  {error && (
                    <p className="text-red-500 mb-4">{errors.message}</p>
                  )}
                  <div className="">
                    <button
                      onClick={handleSubmit(onSubmit)}
                      className="px-4 py-2 text-xs font-medium text-gray-100 bg-cyan-500 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-700"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {productReviews &&
              productReviews.slice(0, 3).map((review, index) => (
                <div key={index} className="p-6 dark:bg-gray-900 bg-gray-50">
                  <div className="flex flex-wrap items-center mb-4 space-x-2">
                    <div className="flex self-start flex-shrink-0 cursor-pointer">
                      <img
                        src={`/${review.profileImg}`}
                        alt=""
                        className="object-fill w-16 h-16 rounded-full"
                      />
                    </div>
                    <div className="flex items-center justify-center space-x-2 ">
                      <div className="block">
                        <div className="w-auto px-2 pb-2 ">
                          <div className="font-medium flex">
                            <div className="text-lg font-semibold dark:text-gray-400 hover:underline">
                              <small>{review.name}</small>
                            </div>
                            <div className="items-center ms-2 pt-1">
                              <ul className="flex items-center">
                                <li>
                                  <div className=" text-yellow-400 text-base dark:text-yellow-500">
                                    <i
                                      className={
                                        review.rating >= 1
                                          ? "fas fa-star"
                                          : review.rating >= 0.5
                                          ? "fas fa-star-half-alt"
                                          : "far fa-star"
                                      }
                                    ></i>
                                  </div>
                                </li>
                                <li>
                                  <div className=" text-yellow-400 text-base dark:text-yellow-500">
                                    <i
                                      className={
                                        review.rating >= 2
                                          ? "fas fa-star"
                                          : review.rating >= 1.5
                                          ? "fas fa-star-half-alt"
                                          : "far fa-star"
                                      }
                                    ></i>
                                  </div>
                                </li>
                                <li>
                                  <div className=" text-yellow-400 text-base dark:text-yellow-500">
                                    <i
                                      className={
                                        review.rating >= 3
                                          ? "fas fa-star"
                                          : review.rating >= 2.5
                                          ? "fas fa-star-half-alt"
                                          : "far fa-star"
                                      }
                                    ></i>
                                  </div>
                                </li>
                                <li>
                                  <div className=" text-yellow-400 text-base dark:text-yellow-500">
                                    <i
                                      className={
                                        review.rating >= 4
                                          ? "fas fa-star"
                                          : review.rating >= 3.5
                                          ? "fas fa-star-half-alt"
                                          : "far fa-star"
                                      }
                                    ></i>
                                  </div>
                                </li>
                                <li>
                                  <div className=" text-yellow-400 text-base dark:text-yellow-500">
                                    <i
                                      className={
                                        review.rating >= 5
                                          ? "fas fa-star"
                                          : review.rating >= 4.5
                                          ? "fas fa-star-half-alt"
                                          : "far fa-star"
                                      }
                                    ></i>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {review.comment}
                          </div>
                        </div>
                        <div className="flex items-center justify-start w-full text-xs">
                          <div className="flex items-center justify-center px-2 space-x-1 font-semibold text-gray-700 dark:text-gray-400">
                            <span className="self-center">.</span>
                            <div className="hover:underline">
                              {new Date(review.createdAt).getMilliseconds() ===
                              new Date().getMilliseconds() ? (
                                <span> Just Now </span>
                              ) : (
                                new Date(review.createdAt)
                                  .toDateString()
                                  .substring(0, 9)
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
