import React, { useState } from 'react'
import Navbar from '../features/navebar/Navebar'
import ProductList from '../features/Product-list/componets/ProductList'
import Footer from '../features/comman/Footer'

const ProductShopPage = () => {
  let [value, setvalue] = useState("");

  let getValue = (string) => {
    setvalue(string);
  };
  return (
    <div>
      <Navbar onChange={getValue}>
        <ProductList value={value}></ProductList>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default ProductShopPage
