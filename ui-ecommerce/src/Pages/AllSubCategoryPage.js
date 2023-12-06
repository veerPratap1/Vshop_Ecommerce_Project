import React, { useState } from 'react'
import Navbar from '../features/navebar/Navebar'
import Footer from '../features/comman/Footer'
import AllSubCategory from '../features/Product-list/componets/AllSubCategory'

const AllSubCategoryPage = () => {
  let [value, setvalue] = useState("");

  let getValue = (string) => {
    setvalue(string);
  };
  return (
    <div>
      <Navbar onChange={getValue}>
        <AllSubCategory value={value}></AllSubCategory>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default AllSubCategoryPage
