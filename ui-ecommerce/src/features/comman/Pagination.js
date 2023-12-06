import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ITEMS_PAGE } from "../../app/constant";

export function Pagination({ page, handlePage, totalItems }) {
  
    const totalPages = Math.ceil(totalItems / ITEMS_PAGE);
  
    return (
      <>
        <div className="flex items-center justify-between bg-white dark:bg-gray-600 px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-gray-800 dark:bg-gray-600 px-4 py-2 text-sm font-medium dark:text-gray-100 text-gray-100  hover:bg-gray-700"
            >
              Previous
            </div>
            <div
              onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-gray-800 dark:bg-gray-600 px-7 py-2 text-sm font-medium dark:text-gray-100 text-gray-100 hover:bg-gray-50"
            >
              Next
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm dark:text-gray-200">
                Showing{" "}
                <span className="font-medium">{(page - 1) * ITEMS_PAGE + 1}</span>{" "}
                to <span className="font-medium">{page * ITEMS_PAGE > totalItems ? totalItems : page * ITEMS_PAGE}</span> of{" "}
                <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <div
                  onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                {Array.from({ length: totalPages }).map((el, index) => (
                  <div
                    onClick={(e) => handlePage(index + 1)}
                    aria-current="page"
                    key={index}
                    className={`relative z-10 inline-flex items-center ${
                      index + 1 === page
                        ? "bg-indigo-600 text-white"
                        : " text-gray-400"
                    }    px-4 py-2 text-sm font-semibold cursor-pointer  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {index + 1}
                  </div>
                ))}
  
                <div
                  onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }