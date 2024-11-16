import React, { useState } from "react";
import axios from "axios";
import Button from "../layouts/Button";
import { AiTwotonePhone, AiOutlineMail, AiTwotoneHome } from "react-icons/ai";
import { BsInstagram, BsFacebook, BsTwitterX } from "react-icons/bs";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/contact/send', formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setStatusMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        setStatusMessage("Failed to send the message. Please try again.");
      }
    } catch (error) {
      setStatusMessage("Error occurred while sending the message.");
      console.error(error.response.data); // Log server response for debugging
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <style>
        {`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideInUp {
            animation: slideInUp 1s ease-out;
          }
        `}
      </style>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-5xl bg-[#222] text-white rounded-lg shadow-lg p-8 transform transition-transform duration-500 hover:scale-105 animate-slideInUp">
          <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0">
            {/* Contact Form Section */}
            <form
              onSubmit={handleSubmit}
              className="w-full lg:w-2/5 space-y-5 pt-10 lg:pt-0 animate-slideInUp"
            >
              <h1 className="text-4xl font-semibold text-[#3CB347] text-center">
                Send Message
              </h1>
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 text-lg">
                  Your Name
                </label>
                <input
                  className="py-3 px-5 rounded-lg bg-[#333] text-gray-300 border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#3CB347] text-lg"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 text-lg">
                  Your Email
                </label>
                <input
                  className="py-3 px-5 rounded-lg bg-[#333] text-gray-300 border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#3CB347] text-lg"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="mb-1 text-lg">
                  Your Message
                </label>
                <textarea
                  className="py-3 px-5 rounded-lg bg-[#333] text-gray-300 border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#3CB347] text-lg"
                  name="message"
                  id="message"
                  rows="4"
                  placeholder="Enter your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="flex justify-center space-y-4 mt-6">
                <Button title="Send Message" />
              </div>
              {statusMessage && (
                <p className="text-center text-lg mt-4">{statusMessage}</p>
              )}
            </form>

            {/* Contact Information Section */}
            <div className="w-full lg:w-2/5 mt-8 lg:mt-0 lg:ml-8 animate-slideInUp">
              <h1 className="text-4xl font-semibold text-[#3CB347] text-center lg:text-left">
                Contact At
              </h1>
              <div className="flex flex-col items-center lg:items-start mt-6">
                <div className="flex items-center mb-8">
                  <div className="flex items-center justify-center w-20 h-20 border-2 border-[#444] rounded-full bg-[#333]">
                    <AiTwotonePhone size={40} color="#3CB347" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold">Phone Number</p>
                    <p className="text-lg">+962-787685016</p>
                  </div>
                </div>
                <div className="flex items-center mb-8">
                  <div className="flex items-center justify-center w-20 h-20 border-2 border-[#444] rounded-full bg-[#333]">
                    <AiOutlineMail size={40} color="#3CB347" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold">Email</p>
                    <p className="text-lg">yousefborinii@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center mb-8">
                  <div className="flex items-center justify-center w-20 h-20 border-2 border-[#444] rounded-full bg-[#333]">
                    <AiTwotoneHome size={40} color="#3CB347" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold">Address</p>
                    <p className="text-lg">Jordan, Amman</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3CB347] hover:text-[#2c8d2b]"
                  >
                    <BsFacebook size={30} />
                  </a>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3CB347] hover:text-[#2c8d2b]"
                  >
                    <BsInstagram size={30} />
                  </a>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3CB347] hover:text-[#2c8d2b]"
                  >
                    <BsTwitterX size={30} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
