import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItemAsync,
  fetchCartItemsByIdAsync,
  selectCartChecked,
  selectCartItem,
  selectCartItemStatus,
  updateCartAsync,
} from "./CartSlice";
import { discountedPrice } from "../../app/constant";
import ReactLoading from "react-loading";
import Modal from "../comman/Modal";
import { selectUserInfo } from "../user/UserSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItem);
  const status = useSelector(selectCartItemStatus);
  const totalPrice = items.reduce(
    (amount, item) => amount + discountedPrice(item.product) * item.quantity,
    0
  );
  const totalQuantiy = items.reduce((total, item) => total + item.quantity, 0);

  let [quantity, setquantity] = useState(true);

  const user = useSelector(selectUserInfo)

  const handleQuantity = (e, item) => {
    setquantity(false);
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };
  const handleRemove = (item) => {
    dispatch(deleteCartItemAsync(item));
  };
  const [openModal, setopenModal] = useState(null);

  const handleCancel = () => {
    setopenModal(null);
  };

  const cartChecked = useSelector(selectCartChecked);

  useEffect(()=>{
    dispatch(fetchCartItemsByIdAsync(user?.id))
  },[dispatch, user])

  return (
    <>
      {cartChecked && (
        <div className="w-full bg-white dark:bg-gray-700 px-2 lg:px-8">
          {items ? (
            <>
              <div className="pt-10">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                  Your Cart
                </h1>

                <div className="flow-root">
                  <div className="divide-y divide-gray-200">
                    {items.map((item, index) => (
                      <div key={index} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="h-full w-full object-fit object-contain"
                          />
                        </div>

                        <div className="md:ml-4 md:w-full flex md:grid">
                          <div className="md:flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                            <div>
                              <p>{item.product.title}</p>
                            </div>
                            <div className="flex md:grid mt-1 md:mt-0">
                              <p>Price : </p>
                              <div className="flex">
                                {" "}
                                ${discountedPrice(item.product)}/
                                <div className="md:ml-2 mt-1 text-xs text-red-500 line-through">
                                  {" "}
                                  ${item.product.price}
                                </div>
                              </div>
                            </div>
                            <div className="flex md:grid mt-1 md:mt-0">
                              <p>SubTotal :</p>
                              <div>
                                ${item.quantity * discountedPrice(item.product)}
                              </div>
                            </div>
                          </div>
                          <div className="md:flex ms-14 ps-2 md:ps-0 md:ms-0 justify-between items-center md:mt-3 text-base font-medium text-gray-900 dark:text-gray-200">
                            <div className="text-gray-500  dark:text-gray-300">
                              Qty
                              <select
                                onChange={(e) => handleQuantity(e, item)}
                                onClick={(e) => setquantity(false)}
                                className="ms-2 rounded text-black"
                              >
                                {quantity ? (
                                  <option>{item.quantity}</option>
                                ) : (
                                  <>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                  </>
                                )}
                              </select>
                            </div>
                            <div className="flex justify-end">
                              <p>Colour : {item.colour.value}</p>
                            </div>
                            <div className="flex justify-end">
                              <p>Size : {item.size.value}</p>
                            </div>

                            <div className="flex justify-end">
                              <Modal
                                title={`Remove ${item.product.title}`}
                                message="Do You Want To Remove This Item from Cart ?"
                                cancelOption="Cancel"
                                dangerOption="Remove"
                                dangerAction={(e) => handleRemove(item.id)}
                                cancelAction={(e) => handleCancel()}
                                openModal={openModal === item.id}
                              ></Modal>
                              <button
                                type="button"
                                onClick={(e) => setopenModal(item.id)}
                                className="font-medium text-indigo-600 dark:text-blue-400 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                  <p>Subtotal</p>
                  <p>${totalPrice}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                  <p>Total items in Cart </p>
                  <p>{totalQuantiy} Items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-300">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  {status === "loading" ? (
                    <span className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                      <ReactLoading
                        type={"spinningBubbles"}
                        color={"#a4bbc9"}
                        height={30}
                        width={30}
                      />
                    </span>
                  ) : (
                    <Link
                      to={"/checkOut"}
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  )}
                </div>
                <div className="mt-2 justify-center text-center text-sm text-gray-500 dark:text-gray-300">
                  <p>or</p>
                  <Link to={"/"}>
                    <button
                      type="button"
                      className="font-medium text-indigo-600 dark:text-blue-400 mt-2 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                No Product in Cart
              </h1>
              <Link
                to={"/"}
                className="ms-5 mt-4 text-gray-100 font-bold px-3 bg-violet-600 hover:text-gray-100 hover:bg-violet-500 rounded"
              >
                Home
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
