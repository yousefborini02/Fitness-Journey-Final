import React from "react";
import { MdOutlineAttachMoney, MdAccessTime, MdDateRange } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import Button from "../layouts/Button";
import { Link } from "react-router-dom";

const PlansCard = ({ subscription }) => {
  const { name, price, totalVisits, durationInDays } = subscription;

  const features = [
    `${totalVisits} visits`,
    `Expires after ${Math.floor(durationInDays / 30)} months`,
    "Access to gym facilities during operational hours",
  ];

  return (
    <div className="flex flex-col bg-[#222] w-full h-full p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#2a2a2a]">
      <h2 className="font-semibold text-2xl text-center text-white mb-6">
        {name}
      </h2>

      <div className="flex items-center justify-center mb-6">
        <h3 className="font-bold text-3xl text-green-500">{price} JD</h3>
      </div>

      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <MdAccessTime className="text-white mr-2" size={20} />
          <span className="text-white">{totalVisits} visits</span>
        </div>
        <div className="flex items-center">
          <MdDateRange className="text-white mr-2" size={20} />
          <span className="text-white">{Math.floor(durationInDays / 30)} months</span>
        </div>
      </div>

      <div className="flex flex-col flex-grow items-start mt-2 text-white">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start mb-3">
            <AiFillCheckCircle className="mr-2 mt-0 text-green-500 flex-shrink-0" size={20} />
            <p className="text-sm">{feature}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Link to={`/payment/${subscription._id}`}>
          <Button title="Buy Now" />
        </Link>
      </div>
    </div>
  );
};

export default PlansCard;