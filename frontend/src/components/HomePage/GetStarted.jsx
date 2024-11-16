import React from "react";
import { useInView } from 'react-intersection-observer';
import check from "../../assets/img/check.png";


const GetStarted = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 0.2,    
  });

  const waveStyle = (index) => ({
    display: "inline-block",
    width: "8px",
    height: "8px",
    margin: "0 5px",
    borderRadius: "50%",
    backgroundColor: "#3CB347",
    animation: `wave 1s infinite`,
    animationDelay: `${index * 0.1}s`,
  });

  const waveKeyframes = `
    @keyframes wave {
      0%, 100% {
        transform: translateY(0);
        background-color: #3CB347;
      }
      50% {
        transform: translateY(-5px);
        background-color: white;
      }
    }
  `;

  return (
    <div className={`p-4 bg-black transition-transform duration-700 ${inView ? 'translate-y-0' : 'translate-y-20 opacity-0'}`} ref={ref}>
      <style>{waveKeyframes}</style>
      <h1 className="text-4xl font-semibold text-center py-8 text-[#3CB347]">
        Get moving with Fitness Journey!
      </h1>

      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* First Image */}
          <div className="flex-1 min-w-[150px] text-center mb-4 relative">
            <img
              src={check}
              alt="Buy a membership"
              className="mb-2 mx-auto rounded-lg"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
            <h4 className="text-2xl text-white mb-2">1-Buy a membership</h4>
          </div>

          {/* Points between first and second images */}
          <div className="hidden md:flex flex-col items-center justify-center mx-4">
            <div className="flex space-x-2">
              {[...Array(6)].map((_, index) => (
                <span key={index} style={waveStyle(index)}></span>
              ))}
            </div>
          </div>

          {/* Second Image */}
          <div className="flex-1 min-w-[150px] text-center mb-4 relative">
            <img
              src="https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg"
              alt="Choose sport facility"
              className="mb-2 mx-auto rounded-lg"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
            <h4 className="text-2xl text-white mb-2">2-Choose sport facility</h4>
          </div>

          {/* Points between second and third images */}
          <div className="hidden md:flex flex-col items-center justify-center mx-4">
            <div className="flex space-x-2">
              {[...Array(6)].map((_, index) => (
                <span key={index} style={waveStyle(index)}></span>
              ))}
            </div>
          </div>

          {/* Third Image */}
          <div className="flex-1 min-w-[150px] text-center mb-4 relative">
            <img
              src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Start training"
              className="mb-2 mx-auto rounded-lg"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
            <h4 className="text-2xl text-white mb-2">3-Start training</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
