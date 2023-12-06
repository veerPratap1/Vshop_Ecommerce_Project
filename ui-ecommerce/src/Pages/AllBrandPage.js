import React, { useState } from 'react'
import Navbar from '../features/navebar/Navebar'
import Footer from '../features/comman/Footer'
import AllBrand from '../features/Product-list/componets/AllBrand'

const AllBrandPage = () => {
  let [value, setvalue] = useState("");

  let getValue = (string) => {
    setvalue(string);
  };
  return (
    <div>
      <Navbar onChange={getValue}>
        <AllBrand value={value}></AllBrand>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default AllBrandPage
