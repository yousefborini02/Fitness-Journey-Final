import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Contact from "./Contact";

const ContactUs = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-semibold text-center py-8 text-[#3CB347]">
          Contact
        </h1>
        <p className="text-lg text-center mb-8">
          We are here to help you with any questions or concerns you may have. 
          Whether you need assistance with your membership, have a question about our facilities, 
          or need to reach out to our support team, please do not hesitate to contact us. 
          Our team is committed to ensuring that your fitness journey is smooth and enjoyable.
        </p>
        <div >
          <Contact />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
