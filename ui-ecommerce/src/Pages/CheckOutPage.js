import React from "react";
import CheckOut from "../features/checkout/CheckOut";
import Navebar from "../features/navebar/Navebar"

const CheckOutPage = () => {
  return (
    <>
      <Navebar>
        <CheckOut></CheckOut>
      </Navebar>
    </>
  );
};

export default CheckOutPage;
