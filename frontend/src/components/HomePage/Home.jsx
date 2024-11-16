import React from "react";
import Button from "../../layouts/Button";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import hero from "../../assets/img/hero.jpg";
import hero2 from "../../assets/img/hero2.jpg";


const Home = () => {
  return (
    <div 
     className="min-h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat bg-center p-5 relative"
     style={{ backgroundImage: `url(${hero})` }}
    >
      
      <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative bg-black bg-opacity-50 p-5 rounded-lg w-full md:w-2/3 lg:w-1/2 text-center"
      >
        <h1 className="text-4xl  md:text-6xl lg:text-7xl font-semibold text-white mb-5 ">
          Gym Time !
        </h1>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-5 flex justify-center"
        >
                  
        <div className="flex flex-col items-center gap-3">
          <ScrollLink to="plans" spy={true}
              smooth={true}
              duration={1000} >
          <Button title="Get a membership"  />
          </ScrollLink>
          <Link to="/gymcatalog">
            <Button title="Find a Gym" />
          </Link>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
