import React, { useEffect, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Modal({
  title,
  message,
  cancelOption,
  dangerOption,
  dangerAction,
  cancelAction,
  openModal,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleDangerAction = () => {
    setShowModal(false);
    dangerAction();
  };

  const handleCancelAction = () =>{
    setShowModal(false)
    cancelAction()
  }

  useEffect(() => {
    if(openModal){
      setShowModal(true)
    }else{
      setShowModal(false)
    }
  }, [openModal]);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center mx-3 lg:mx-0 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-700 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between pt-3 ps-3  border-blueGray-200 rounded-t">
                   <ExclamationTriangleIcon className="w-9 h-9 border rounded-full p-1 bg-red-200  me-2 text-red-500"></ExclamationTriangleIcon>
                   <h3 className="text-lg text-gray-700 dark:text-gray-200 mt-1 font-semibold">
                    {title}
                    </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto">
                  <p className=" text-gray-700 dark:text-gray-200 px-4 py-6  text-sm leading-relaxed">
                    {message}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end px-4 pb-2 border-blueGray-200 rounded-b">
                  <button
                    className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCancelAction}
                  >
                    {cancelOption}
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDangerAction}
                  >
                    {dangerOption}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
