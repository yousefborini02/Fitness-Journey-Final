// import React, { useState, useEffect } from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import Button from "../../layouts/Button";
// import { Link } from "react-router-dom";
// import { useInView } from 'react-intersection-observer';
// import axios from 'axios';

// // Custom Arrow Component
// const CustomArrow = ({ className, style, onClick, direction }) => {
//   const arrowPath = direction === "left"
//     ? "M15.75 19.5L8.25 12l7.5-7.5"
//     : "M8.25 4.5L15.75 12l-7.5 7.5";

//   return (
//     <div
//       className={className}
//       onClick={onClick}
//       style={{
//         ...style,
//         display: "block",
//         background: "transparent",
//         zIndex: 1,
//       }}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth="1.5"
//         stroke="currentColor"
//         aria-hidden="true"
//         className="h-6 w-6"
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" d={arrowPath} />
//       </svg>
//     </div>
//   );
// };

// // GymCard Component
// const GymCard = ({ gym }) => {
//   return (
//     <div className="px-2">
//       <div className="relative flex flex-col rounded-xl bg-[#0000] text-gray-700 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//         <div className="relative mx-4 h-40 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
//           <img
//             src={gym.image}
//             alt={gym.name}
//             className="h-full w-full object-cover"
//           />
//         </div>
//         <div className="p-6">
//           <h5 className="mb-2 text-l font-semibold text-[#3CB347]">{gym.name}</h5>
//           <p className="text-base font-light text-white">
//             {gym.city}
//           </p>
//         </div>
//         <div className="p-6 pt-0 flex justify-center">
//           <Link to={`/gymdetails/${gym.id}`}>
//             <Button title="View Details" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// // GymsSlider Component
// const GymsSlider = () => {
//   const [gyms, setGyms] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const { ref, inView } = useInView({
//     triggerOnce: false,
//     threshold: 0.2,
//   });

//   // Fetch gyms data from the API
//   useEffect(() => {
//     const fetchGyms = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/gyms/all');
//         setGyms(response.data);  // Set the fetched gyms data
//       } catch (error) {
//         console.error('Error fetching gyms data', error);
//       }
//     };

//     fetchGyms();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     nextArrow: <CustomArrow direction="right" />,
//     prevArrow: <CustomArrow direction="left" />,
//     appendDots: dots => (
//       <div
//         style={{
//           position: "relative",
//           bottom: "10px",
//           width: "100%",
//           textAlign: "center",
//           padding: "10px 0",
//         }}
//       >
//         <ul
//           style={{
//             margin: "0px",
//             padding: "0px",
//             display: "inline-block",
//             listStyle: "none",
//           }}
//         >
//           {dots.map((dot, index) => (
//             <li
//               key={index}
//               style={{
//                 display: "inline-block",
//                 margin: "0 5px",
//               }}
//             >
//               {React.cloneElement(dot, {
//                 style: {
//                   width: "10px",
//                   height: "10px",
//                   borderRadius: "50%",
//                   backgroundColor: activeIndex === index ? "#3CB347" : "white",
//                   border: "1px solid white",
//                 },
//                 onClick: () => setActiveIndex(index),
//               })}
//             </li>
//           ))}
//         </ul>
//       </div>
//     ),
//     customPaging: i => (
//       <div
//         style={{
//           width: "10px",
//           height: "10px",
//           borderRadius: "50%",
//           backgroundColor: "white",
//           border: "1px solid white",
//         }}
//       />
//     ),
//     beforeChange: (current, next) => setActiveIndex(next),
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div
//       className={`bg-[#0000] h-[80vh] text-black relative transition-transform duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
//       ref={ref}
//     >
//       <h1 className="text-4xl font-semibold text-center py-8 text-[#3CB347]">Gyms</h1>
//       <div className="container mx-auto px-4 mb-8">
//         <Slider {...settings} className="relative">
//           {gyms.map((gym, index) => (
//             <GymCard key={index} gym={gym} />
//           ))}
//         </Slider>
//         <div className="flex justify-center mt-8">
//           <Link to="/gymcatalog">
//             <Button title="See all gyms" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GymsSlider;



/////////////////////////////////////////////////////////////////////////


import React, { useState, useEffect } from "react";
import Button from "../../layouts/Button";
import { Link } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// GymCard Component
const GymCard = ({ gym }) => {
  return (
    <div className="h-full px-2">
      <div className="relative flex flex-col h-full rounded-xl bg-[#0000] text-gray-700 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <div className="relative mx-4 h-40 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
          <img
            src={gym.image}
            alt={gym.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-l font-semibold text-[#3CB347]">{gym.name}</h5>
          <p className="text-base font-light text-white">
            {gym.city}
          </p>
        </div>
        <div className="p-6 pt-0 flex justify-center mt-auto">
          <Link to={`/gymdetails/${gym.id}`}>
            <Button title="View Details" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// GymsSlider Component
const GymsSlider = () => {
  const [gyms, setGyms] = useState([]);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/gyms/all');
        setGyms(response.data);
      } catch (error) {
        console.error('Error fetching gyms data', error);
      }
    };

    fetchGyms();
  }, []);

  return (
    <div
      className={`bg-[#0000] min-h-[80vh] text-black relative transition-transform duration-700 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      ref={ref}
    >
      <h1 className="text-4xl font-semibold text-center py-8 text-[#3CB347]">Gyms</h1>
      <div className="container mx-auto px-4 mb-8">
        <style>
          {`
            .swiper-button-next,
            .swiper-button-prev {
              color: #3CB347;
              background: rgba(34, 34, 34, 0.8);
              width: 40px;
              height: 40px;
              border-radius: 50%;
              padding: 8px;
            }

            .swiper-button-next:after,
            .swiper-button-prev:after {
              font-size: 20px;
            }

            .swiper-pagination-bullet {
              background: #3CB347;
              opacity: 0.5;
            }

            .swiper-pagination-bullet-active {
              opacity: 1;
            }

            @media (max-width: 768px) {
              .swiper-button-next,
              .swiper-button-prev {
                display: none;
              }
            }

            .swiper-slide {
              height: auto;
              padding: 10px;
            }

            .swiper-wrapper {
              align-items: stretch;
            }
          `}
        </style>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="py-8"
        >
          {gyms.map((gym, index) => (
            <SwiperSlide key={index} className="h-auto">
              <GymCard gym={gym} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center mt-8">
          <Link to="/gymcatalog">
            <Button title="See all gyms" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GymsSlider;