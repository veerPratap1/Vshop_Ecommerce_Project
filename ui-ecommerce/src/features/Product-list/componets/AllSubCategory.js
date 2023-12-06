import { useSelector, useDispatch } from "react-redux";
import {
  fetchSubCatagoryAsync,
  selectProductStatus,
  selectSubCatagory,
  selectTotalSubCategory,
} from "../ProductSlice";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { Pagination } from "../../comman/Pagination";
import { ITEMS_PAGE } from "../../../app/constant";

export default function AllSubCategory(props) {
  const dispatch = useDispatch();

  const totalItems = useSelector(selectTotalSubCategory);
  const subCategory = useSelector(selectSubCatagory);

  let [page, setPage] = useState(1);

  const handlePage = (page) => {
    window.scrollTo(0, 0);
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [totalItems, page]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const pagination = { _page: page, _limit: ITEMS_PAGE };

    dispatch(fetchSubCatagoryAsync(pagination));
  }, [dispatch, page]);


  useEffect(() => {
    window.scrollTo(0, 0);
    const value = props.value;

    const newLabel = { value: value, _page: page, _limit: ITEMS_PAGE };

    dispatch(fetchSubCatagoryAsync(newLabel));

    if (!value) {
      window.scrollTo(0, 0);

      const pagination = { _page: page, _limit: ITEMS_PAGE };

      dispatch(fetchSubCatagoryAsync(pagination));
    }
  }, [dispatch, page, props.value]);

  return (
    <>
      <div className="bg-white dark:bg-gray-500  w-full">
        <div>
          {/* Mobile filter dialog */}

          <main className="">
            <section aria-labelledby="products-heading border" className="">
              <h2 id="products-heading" className="sr-only border">
                Products
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-1">
                {/* Filters */}
                {/* <DesktopFilter
                  handleFilter={handleFilter}
                  filters={filters}
                ></DesktopFilter> */}
                {/* Product grid */}
                <div className="lg:col-span-3 py-5">
                  {/* Your content */}
                  <ProductGrid subCategory={subCategory}></ProductGrid>
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


function ProductGrid({ subCategory }) {
  const status = useSelector(selectProductStatus);
  return (
    <>
      <div className="bg-white dark:bg-gray-500">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <section className="pt-10 rounded-2xl bg-slate-100 px-3">
            <div className="container mx-auto">
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                  <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-12">
                    <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                      Shop By Sub-Category
                    </h2>
                  </div>
                </div>
              </div>
              <div className=" flex flex-wrap">
                <div className="w-full px-4 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-4 xl:gap-x-8">
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
                    subCategory?.map((Subcat) => (
                      <div
                        key={Subcat.id}
                        className="group relative shadow-2xl p-2 bg-white mb-8 rounded"
                      >
                        <Link to={`/subCategory/${Subcat.id}`}>
                          <div className="h-28 md:h-40  lg:h-60 overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75">
                            {status === "loading" ? (
                              <ReactLoading
                                type={"spinningBubbles"}
                                color={"#a4bbc9"}
                                height={50}
                                width={50}
                              />
                            ) : (
                              <img
                                src={`/${Subcat.label}`}
                                alt="catergory Img"
                                className="h-full w-full object-fit lg:h-full lg:w-full"
                              />
                            )}
                          </div>
                          <div className="mt-2 flex justify-center">
                            <h3 className="text-lg font-bold text-gray-700">
                              <div>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                {Subcat.value}
                              </div>
                            </h3>
                          </div>
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
