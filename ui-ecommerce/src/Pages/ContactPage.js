import React from "react";
import Navbar from "../features/navebar/Navebar";
import Footer from "../features/comman/Footer";
import Contact from "../features/Contact/Contact";
const ContactPage = () => {
  return (
    <div>
      <Navbar>
        <Contact></Contact>
      </Navbar>
      <Footer></Footer>
    </div>
  );
};

export default ContactPage;
