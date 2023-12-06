import React, { useState } from 'react'
import ProductListById from '../features/Product-list/componets/ProductListById'
import Navbar from '../features/navebar/Navebar'
import Footer from '../features/comman/Footer'

const ProductListByIdPage = () => {
  let [value, setvalue] = useState("");

  let getValue = (string) => {
    setvalue(string);
  };
  return (
    <>
    <Navbar onChange={getValue}>
        <ProductListById value={value}></ProductListById>
    </Navbar>
    <Footer></Footer>
    </>
  )
}

export default ProductListByIdPage