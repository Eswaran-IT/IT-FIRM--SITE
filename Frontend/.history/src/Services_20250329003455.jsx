import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

// Import animations
import cloudAnimation from "./assets/icon-json/Cloud.json";
import aiAnimation from "./assets/icon-json/AI.json";
import consultingAnimation from "./assets/icon-json/Consulting.json";
import securityAnimation from "./assets/icon-json/Security.json";
import systemAnimation from "./assets/icon-json/System.json";
import helpdeskAnimation from "./assets/icon-json/Helpdesk.json";

// Service Data
const serviceData = [
  { animation: cloudAnimation, title: "Cloud Computing & Infrastructure" },
  { animation: aiAnimation, title: "Artificial Intelligence & Data Analytics" },
  { animation: consultingAnimation, title: "IT Consulting" },
  { animation: securityAnimation, title: "Cybersecurity & Risk Management" },
  { animation: systemAnimation, title: "System Integration & Automation" },
  { animation: helpdeskAnimation, title: "Helpdesk & Support" },
];

// Service Card Component
const ServiceCard = ({ animation, title, index, activeIndex, totalServices }) => {
  const angle = 360 / totalServices;
  const offset = index - activeIndex;
  const rotateY = offset * angle;

  const scale = index === activeIndex ? 1.2 : 0.9;
  const zIndex = index === activeIndex ? 3 : 1;

  return (
    <motion.div
      className="absolute bg-gray-900 rounded-lg shadow-lg p-6 border border-green-400 transition-all duration-500"
      style={{
        transform: `scale(${scale}) rotateY(${rotateY}deg) translateZ(400px)`,
        zIndex,
      }}
    >
      <div className="flex justify-center mb-4">
        <div className="p-4 rounded-full bg-green-400 bg-opacity-20 shadow-lg">
          <Lottie animationData={animation} loop autoplay className="h-24 w-24" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-center text-white">{title}</h3>
    </motion.div>
  );
};

// Services Component with Circular Carousel
const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalServices = serviceData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalServices);
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [totalServices]);

  const nextService = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalServices);
  };

  const prevService = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalServices) % totalServices);
  };

  return (
    <section className="py-20 bg-black flex flex-col items-center relative">
      {/* Title */}
      <motion.h4
        className="text-4xl sm:text-6xl font-bold uppercase tracking-wide text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        Services
      </motion.h4>
      <motion.h2
        className="text-2xl sm:text-4xl font-bold text-white mt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Our <span className="text-green-400">Service Offerings</span>
      </motion.h2>

      {/* Carousel Container */}
      <div className="relative w-full flex justify-center items-center h-96 sm:h-[500px] overflow-hidden mt-12">
        {/* Arrows Container */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 mx-8">
          <button
            onClick={prevService}
            className="text-white bg-green-400 rounded-full p-4 shadow-lg hover:bg-green-500"
          >
            {"<"}
          </button>
        </div>

        {/* Carousel Cards */}
        <div className="relative w-full h-full flex justify-center items-center">
          {serviceData.map((service, index) => (
            <ServiceCard
              key={index}
              animation={service.animation}
              title={service.title}
              index={index}
              activeIndex={activeIndex}
              totalServices={totalServices}
            />
          ))}
        </div>

        {/* Arrows Container */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 mx-8">
          <button
            onClick={nextService}
            className="text-white bg-green-400 rounded-full p-4 shadow-lg hover:bg-green-500"
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
