import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProductAsync,
  selectAllProduct,
  selectProductStatus,
  selectTotalItems,
} from "../ProductSlice";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

import {
  ChevronDownIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import { ITEMS_PAGE, discountedPrice } from "../../../app/constant";
import { Pagination } from "../../comman/Pagination";
import ReactLoading from "react-loading";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductListById(props) {
  const dispatch = useDispatch();

  const products = useSelector(selectAllProduct);
  const totalItems = useSelector(selectTotalItems);

  let [sort, setSort] = useState({});
  let [page, setPage] = useState(1);

  const handleSort = (option) => {
    const newSort = { _sort: option.sort, _order: option.order };

    setSort(newSort);
  };

  const handlePage = (page) => {
    window.scrollTo(0, 0);
    setPage(page);
  };

  const param = useParams();

  useEffect(() => {
    if (param.category) {
      const newProduct = {
        category: param.category,
        _page: page,
        _limit: ITEMS_PAGE,
        ...sort,
      };
      dispatch(fetchAllProductAsync(newProduct));
    } else if (param.subCategory) {
      const newProduct = {
        subCategory: param.subCategory,
        _page: page,
        _limit: ITEMS_PAGE,
        ...sort,
      };
      dispatch(fetchAllProductAsync(newProduct));
    } else if (param.brand) {
      const newProduct = {
        brand: param.brand,
        _page: page,
        _limit: ITEMS_PAGE,
        ...sort,
      };
      dispatch(fetchAllProductAsync(newProduct));
    }
  }, [dispatch, param, page, sort]);

  useEffect(() => {
    window.scrollTo(0, 0);

    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const value = props.value;

    const newtitle = { title: value, _page: page, _limit: ITEMS_PAGE, ...sort };

    dispatch(fetchAllProductAsync(newtitle));

    if (!value) {
      if (param.category) {
        const newProduct = {
          category: param.category,
          _page: page,
          _limit: ITEMS_PAGE,
          ...sort,
        };
        dispatch(fetchAllProductAsync(newProduct));
      } else if (param.subCategory) {
        const newProduct = {
          subCategory: param.subCategory,
          _page: page,
          _limit: ITEMS_PAGE,
          ...sort,
        };
        dispatch(fetchAllProductAsync(newProduct));
      } else if (param.brand) {
        const newProduct = {
          brand: param.brand,
          _page: page,
          _limit: ITEMS_PAGE,
          ...sort,
        };
        dispatch(fetchAllProductAsync(newProduct));
      }
    }
  }, [dispatch, sort, page, param, props]);

  const navigate = useNavigate();

  const toProductDetail = (id) => {
    navigate(`/shop/product-detail/${id}`);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-500  w-full">
        <div>
          <main className="">
            <div className="flex items-baseline bg-white dark:bg-gray-800 shadow-lg dark:shadow-md dark:shadow-gray-600 opacity-3 justify-end  px-5 py-5">
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium dark:text-white  hover:text-gray-800">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-500 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <p
                                onClick={(e) => handleSort(option)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900 dark:text-white dark:hover:text-gray-800"
                                    : "text-gray-500 dark:text-white  dark:hover:text-gray-800",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading border" className="">
              <h2 id="products-heading" className="sr-only border">
                Products
              </h2>
              <div className="lg:col-span-5 py-5">
                {/* Your content */}
                <ProductGrid
                  products={products}
                  toProductDetail={toProductDetail}
                ></ProductGrid>
              </div>
            </section>
            <Pagination
              handlePage={handlePage}
              page={page}
              totalItems={totalItems}
            ></Pagination>
          </main>
        </div>
      </div>
    </>
  );
}

function ProductGrid({ products, toProductDetail }) {
  const status = useSelector(selectProductStatus);
  return (
    <>
      <div className="bg-white dark:bg-gray-500">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {status === "loading" ? (
              <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <ReactLoading
                  type={"spinningBubbles"}
                  color={"#a4bbc9"}
                  height={100}
                  width={100}
                />
              </div>
            ) : (
              products?.map((product) => (
                <div
                  key={product.id}
                  className="group relative p-2 bg-slate-100 rounded"
                >
                  <div onClick={() => toProductDetail(product.id)}>
                    <div className="h-28 lg:h-60  overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-60">
                      {status === "loading" ? (
                        <ReactLoading
                          type={"spinningBubbles"}
                          color={"#a4bbc9"}
                          height={50}
                          width={50}
                        />
                      ) : (
                        <img
                          src={`/${product.thumbnail}`}
                          alt="product"
                          className="h-full w-full object-fit object-contain lg:h-full lg:w-full"
                        />
                      )}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-md text-gray-700">
                          <div href={product.brand}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </div>
                        </h3>

                        <div className="mt-1 text-sm text-gray-500">
                          <span className="flex items-center">
                            <ul className="flex">
                              <li>
                                <div className="w-5 text-yellow-400 dark:text-yellow-500">
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
                                <div className="w-5  text-yellow-400 dark:text-yellow-500">
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
                                <div className="w-5  text-yellow-400 dark:text-yellow-500">
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
                                <div className="w-5  text-yellow-400 dark:text-yellow-500">
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
                                <div className="w-5  text-yellow-400 dark:text-yellow-500">
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
                            <span className="align-bottom ms-1 text-sm">
                              ({product.numReviews})
                            </span>
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-md line-through font-semibold text-red-500">
                          ${product.price}
                        </p>
                        <p className="text-lg font-semibold text-blue-500">
                          ${discountedPrice(product)}
                        </p>
                      </div>
                    </div>
                    {product.deleted && (
                      <span className="text-sm text-red-500">
                        Product is deleted
                      </span>
                    )}
                    {product.stock <= 0 && (
                      <p className="text-sm text-red-500">Out of Stock</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
