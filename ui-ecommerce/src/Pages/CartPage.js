import React from "react";
import Cart from "../features/Cart/Cart";
import Navbar from "../features/navebar/Navebar";

const CartPage = () => {
  return (
    <>
      <Navbar>
        <Cart></Cart>
      </Navbar>
    </>
  );
};

export default CartPage;
