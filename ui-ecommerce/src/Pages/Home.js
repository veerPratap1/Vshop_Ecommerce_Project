import React, { useState } from "react";
import Navbar from "../features/navebar/Navebar";
import Footer from "../features/comman/Footer";
import HomePage from "../features/Product-list/componets/HomePage";

const Home = () => {
  let [value, setvalue] = useState("");

  let getValue = (string) => {
    setvalue(string);
  };

  return (
    <div>
      <Navbar onChange={getValue}>
        <HomePage value={value}></HomePage>
      </Navbar>
      <Footer></Footer>
    </div>
  );
};

export default Home;
