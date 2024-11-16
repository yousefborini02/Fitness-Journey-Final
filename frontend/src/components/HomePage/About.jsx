import React from "react";
import { useInView } from 'react-intersection-observer';
import img from "../../assets/img/about.png";


const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 0.2,    
  });

  return (
    <div
      ref={ref}
      className={`min-h-screen flex flex-col md:flex-row items-center md:mx-32 mx-5 transition-transform duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      <div>
        <h1 className="text-4xl text-[#3CB347] font-semibold text-center md:text-start mt-14 md:mt-0">
          About Us
        </h1>

        <div className="w-full md:w-3/4 space-y-5 mt-8 text-2xl">
          <p>
          Welcome to Fitness Journey, your ultimate destination for achieving your fitness goals and discovering the best gyms around you.
          </p>
          <p>
          At Fitness Journey, we believe in providing our users with the freedom and flexibility to choose the perfect gym that fits their lifestyle and preferences.
          </p>
        </div>
      </div>
      <div>
        <img src={img} className="rounded-lg" alt="About Us" />
      </div>
    </div>
  );
};

export default About;
