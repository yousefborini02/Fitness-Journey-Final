import React from "react";
import { Link } from "react-scroll";
import { AiTwotonePhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { BsInstagram, BsTwitter, BsFacebook, BsTwitterX } from "react-icons/bs";


const newDate = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="bg-[#222] mt-5 rounded-t-3xl py-8">
      <div className="flex flex-col md:flex-row justify-between md:px-32 px-5">
        <div className="w-full md:w-1/4">
          <Link to="/">
            <h1 className="font-semibold text-2xl text-[#3CB347]">
              Fitness Journey
            </h1>
          </Link>
          <p className="mt-4">
           Your ultimate destination for achieving your fitness goals and discovering the best gyms around you.
          </p>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8">
          <h1 className="font-medium text-xl text-[#3CB347]">Address</h1>
          <p className="mt-4">
            Amman - Jordan
          </p>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8">
          <h1 className="font-medium text-xl text-[#3CB347]">Business Hours</h1>
          <ul className="mt-4">
            <li>Sun-Thur: 7:00 AM – 12:00 AM</li>
            <li>Fri: Closed</li>
          </ul>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8">
          <h1 className="font-medium text-xl text-[#3CB347] ">Contact</h1>
          <div className="flex flex-row items-center mt-4">
            <AiTwotonePhone size={20} />
            <p className="ml-2">+962-787685016</p>
          </div>
          <div className="flex flex-row items-center mt-2">
            <AiOutlineMail size={20} color="#3CB347" />
            <p className="ml-2">yousefborinii@gmail.com</p>
          </div>
          <div className="flex justify-start gap-4 mt-8 ">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram
              size={25}
              className="hover:text-[#e53961] cursor-pointer"
            />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsFacebook
              size={25}
              className="hover:text-[#4267B2] cursor-pointer"
            />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTwitterX
              size={25}
              className="hover:text-[#3f4549] cursor-pointer"
            />
          </a>
        </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-center">
          © <span className="text-[#3CB347]">Fitness Journey</span> | {newDate}
        </p>
      </div>
    </div>
  );
};

export default Footer;
