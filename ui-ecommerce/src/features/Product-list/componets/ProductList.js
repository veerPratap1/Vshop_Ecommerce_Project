import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProductAsync,
  fetchBrandAsync,
  fetchCatagoryAsync,
  fetchProductByFilterAsync,
  fetchSubCatagoryAsync,
  selectAllProduct,
  selectBrand,
  selectCatagory,
  selectProductStatus,
  selectSubCatagory,
  selectTotalItems,
} from "../ProductSlice";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
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

export default function ProductList(props) {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const products = useSelector(selectAllProduct);
  const totalItems = useSelector(selectTotalItems);
  const catagories = useSelector(selectCatagory);
  const brand = useSelector(selectBrand);
  const subCategory = useSelector(selectSubCatagory);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: catagories,
    },
    {
      id: "subCategory",
      name: "Sub-Category",
      options: subCategory,
    },
    {
      id: "brand",
      name: "brand",
      options: brand,
    },
  ];

  let [filter, setFilter] = useState({});
  let [sort, setSort] = useState({});
  let [page, setPage] = useState(1);

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };

    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.id);
      } else {
        newFilter[section.id] = [option.id];
      }
    } else {
      const index = newFilter[section.id].findIndex((i) => i === option.id);
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
  };

  const handleSort = (option) => {
    const newSort = { _sort: option.sort, _order: option.order };

    setSort(newSort);
  };

  const handlePage = (page) => {
    window.scrollTo(0, 0);
    setPage(page);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const pagination = { _page: page, _limit: ITEMS_PAGE };
    dispatch(fetchProductByFilterAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchCatagoryAsync());
    dispatch(fetchBrandAsync());
    dispatch(fetchSubCatagoryAsync());
  }, [dispatch]);

  useEffect(() => {
    const value = props.value;
    window.scrollTo(0, 0);

    const newtitle = { title: value, _page: page, _limit: ITEMS_PAGE, ...sort };

    dispatch(fetchAllProductAsync(newtitle));

    if (!value) {
      window.scrollTo(0, 0);
      const pagination = { _page: page, _limit: ITEMS_PAGE };
      dispatch(fetchProductByFilterAsync({ filter, sort, pagination }));
    }
  }, [dispatch, props.value, filter, sort, page]);

  return (
    <>
      <div className="bg-white dark:bg-gray-500  w-full">
        <div>
          {/* Mobile filter dialog */}
          <MobileView
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            handleFilter={handleFilter}
            filters={filters}
          ></MobileView>

          <main className="">
            <div className="flex items-baseline bg-white dark:bg-gray-800 shadow-lg dark:shadow-md dark:shadow-gray-600 opacity-3 justify-end  px-5 py-5">
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium dark:text-white  hover:text-gray-800">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:hover:text-gray-800"
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-500 shadow-3.5xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <p
                                onClick={(e) => handleSort(option)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900 dark:text-white"
                                    : "text-gray-500 dark:text-white dark:hover:text-gray-800",
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
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading border" className="">
              <h2 id="products-heading" className="sr-only border">
                Products
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {/* Filters */}
                <DesktopFilter
                  handleFilter={handleFilter}
                  filters={filters}
                ></DesktopFilter>
                {/* Product grid */}
                <div className="lg:col-span-3 col-span-3 py-5">
                  {/* Your content */}
                  <ProductGrid products={products}></ProductGrid>
                </div>
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

function MobileView({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-cyan-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-cyan-800 dark:bg-gray-500 py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-3">
                  <h2 className="text-lg font-medium text-gray-200 dark:text-white">
                    Filters
                  </h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-3.50 items-center justify-center rounded-md bg-cyan-900 dark:bg-gray-500 p-2 text-gray-100"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 w-full border-t border-gray-200">
                  {filters.map((section, index) => (
                    <Disclosure
                      as="div"
                      key={index}
                      className="border-t px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between dark:bg-gray-500 px-2 py-3 text-gray-100 hover:text-gray-100">
                              <span className="font-medium text-gray-100 dark:text-white">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    onChange={(e) =>
                                      handleFilter(e, section, option)
                                    }
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-gray-100 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-100"
                                  >
                                    {option.value}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

function DesktopFilter({ handleFilter, filters }) {
  return (
    <>
      <form className="hidden bg-cyan-800 dark:bg-gray-800 pt-5 lg:block">
        {filters.map((section, index) => (
          <Disclosure
            as="div"
            key={index}
            className="border-b border-gray-200  p-5"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-white hover:text-white">
                    <span className="font-medium text-white">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          onChange={(e) => handleFilter(e, section, option)}
                          defaultChecked={option.checked}
                          className="h-4 w-4 rounded border-gray-200 text-green focus:ring-gray-200"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-white"
                        >
                          {option.value}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </>
  );
}

function ProductGrid({ products }) {
  const status = useSelector(selectProductStatus);
  return (
    <>
      <div className="bg-white dark:bg-gray-500">
        <div className="mx-auto max-w-3.5xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
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
                  <Link to={`product-detail/${product.id}`}>
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
                                <div className="w-3.5 lg:w-5   text-yellow-400 dark:text-yellow-500">
                                  <i
                                    className={
                                      product.rating >= 1
                                        ? "fas fa-star text-xs lg:text-md"
                                        : product.rating >= 0.5
                                        ? "fas fa-star-half-alt text-xs lg:text-md"
                                        : "far fa-star text-xs lg:text-md"
                                    }
                                  ></i>
                                </div>
                              </li>
                              <li>
                                <div className="w-3.5 lg:w-5  text-yellow-400 dark:text-yellow-500">
                                  <i
                                    className={
                                      product.rating >= 2
                                        ? "fas fa-star text-xs lg:text-md"
                                        : product.rating >= 1.5
                                        ? "fas fa-star-half-alt text-xs lg:text-md"
                                        : "far fa-star text-xs lg:text-md"
                                    }
                                  ></i>
                                </div>
                              </li>
                              <li>
                                <div className="w-3.5 lg:w-5  text-yellow-400 dark:text-yellow-500">
                                  <i
                                    className={
                                      product.rating >= 3
                                        ? "fas fa-star text-xs lg:text-md"
                                        : product.rating >= 2.5
                                        ? "fas fa-star-half-alt text-xs lg:text-md"
                                        : "far fa-star text-xs lg:text-md"
                                    }
                                  ></i>
                                </div>
                              </li>
                              <li>
                                <div className="w-3.5 lg:w-5  text-yellow-400 dark:text-yellow-500">
                                  <i
                                    className={
                                      product.rating >= 4
                                        ? "fas fa-star text-xs lg:text-md"
                                        : product.rating >= 3.5
                                        ? "fas fa-star-half-alt text-xs lg:text-md"
                                        : "far fa-star text-xs lg:text-md"
                                    }
                                  ></i>
                                </div>
                              </li>
                              <li>
                                <div className="w-3.5 lg:w-5  text-yellow-400 dark:text-yellow-500">
                                  <i
                                    className={
                                      product.rating >= 5
                                        ? "fas fa-star text-xs lg:text-md"
                                        : product.rating >= 4.5
                                        ? "fas fa-star-half-alt text-xs lg:text-md"
                                        : "far fa-star text-xs lg:text-md"
                                    }
                                  ></i>
                                </div>
                              </li>
                            </ul>
                            <span className="align-bottom ms-0.5 lg:ms-1 text-sm ">
                              ({product.numReviews})
                            </span>
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs mt-2 line-through font-semibold text-red-500">
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
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
