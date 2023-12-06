import React, { useState } from 'react'
import Navbar from '../features/navebar/Navebar'
import Footer from '../features/comman/Footer'
import AllCategory from '../features/Product-list/componets/AllCategory'

const AllCategoryPage = () => {
  let [value, setvalue] = useState("");

  let getValue = (string) => {
    setvalue(string);
  };
  return (
    <div>
      <Navbar onChange={getValue}>
        <AllCategory value={value}></AllCategory>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default AllCategoryPage
