import React, { useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import PlansCard from "../../layouts/PlansCard";
import axios from 'axios';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Plans = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/subscriptions');
        setSubscriptions(response.data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center md:px-32 px-5 transition-transform duration-700 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      ref={ref}
    >
      <h1 className="text-4xl font-semibold text-center text-[#3CB347] mb-10">
        Buy a membership
      </h1>

      <div className="w-full">
        <style>
          {`
            .swiper-button-next,
            .swiper-button-prev {
              color: #3CB347;
              background: rgba(0, 0, 0, 0);
              width: 0px;
              height: 0px;
              border-radius: 100%;
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
          className="py-8 px-4"
        >
          {subscriptions.map((subscription) => (
            <SwiperSlide key={subscription._id}>
              <div className="h-full">
                <PlansCard subscription={subscription} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Plans;