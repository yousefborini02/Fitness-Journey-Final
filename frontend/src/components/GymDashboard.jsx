import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../layouts/Button";
import { AiOutlinePhone } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import Footer from "./Footer";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const GymDashboard = () => {
  const [gymName, setGymName] = useState("");
  const [workingHours, setWorkingHours] = useState(
    days.reduce((acc, day) => ({ ...acc, [day]: "" }), {})
  );
  const [location, setLocation] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState([]);
  const [pdf, setPdf] = useState(null);

  const handleImageChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePdfChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSave = () => {
    // Save or send request logic
    console.log("Gym details saved:", {
      gymName,
      workingHours,
      location,
      facebook,
      instagram,
      phone,
      images,
      pdf
    });
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        <motion.div
          className="bg-[#222] rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-semibold text-[#3CB347] mb-6">Gym Dashboard</h1>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2 flex items-center">
              <span className="mr-2">Gym Name</span>
            </label>
            <input
              type="text"
              value={gymName}
              onChange={(e) => setGymName(e.target.value)}
              className="w-full p-2 rounded-lg bg-[#333] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
              placeholder="Enter Gym Name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2 flex items-center">
              <span className="mr-2">Working Hours</span>
            </label>
            {days.map((day) => (
              <div key={day} className="flex items-center mb-2">
                <span className="text-white w-1/3">{day}</span>
                <input
                  type="text"
                  value={workingHours[day]}
                  onChange={(e) => setWorkingHours({ ...workingHours, [day]: e.target.value })}
                  className="w-2/3 p-2 rounded-lg bg-[#333] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
                  placeholder="Enter hours (e.g., 9:00 AM - 5:00 PM)"
                />
              </div>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2 flex items-center">
              <FaMapMarkerAlt size={20} className="mr-2 text-[#3CB347]" />
              <span>Location</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 rounded-lg bg-[#333] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
              placeholder="Enter Location"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2 flex items-center">
              <FaFacebookF size={20} className="mr-2 text-[#3CB347]" />
              <span>Facebook URL</span>
            </label>
            <input
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="w-full p-2 rounded-lg bg-[#333] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
              placeholder="Enter Facebook URL"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2 flex items-center">
              <FaInstagram size={20} className="mr-2 text-[#3CB347]" />
              <span>Instagram URL</span>
            </label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full p-2 rounded-lg bg-[#333] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
              placeholder="Enter Instagram URL"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2 flex items-center">
              <AiOutlinePhone size={20} className="mr-2 text-[#3CB347]" />
              <span>Phone Number</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 rounded-lg bg-[#333] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
              placeholder="Enter Phone Number"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2 flex items-center">
              <FaPlus size={20} className="mr-2 text-[#3CB347]" />
              <span>Images</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 rounded-lg bg-[#333] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
            />
            <div className="flex flex-wrap gap-2 mt-4">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative w-20 h-20 bg-gray-700 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <img src={URL.createObjectURL(image)} alt={`Gym Image ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2 flex items-center">
              <FaPlus size={20} className="mr-2 text-[#3CB347]" />
              <span>Upload PDF</span>
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfChange}
              className="w-full p-2 rounded-lg bg-[#333] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
            />
          </div>

          <div className="flex justify-center">
            <Button title="Save" onClick={handleSave} />
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default GymDashboard;
