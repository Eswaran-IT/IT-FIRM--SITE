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

// Import background images for each card
import cloudBg from "./assets/cloud.jpg";
import aiBg from "./assets/Ai.jpg";
import consultingBg from "./assets/consulting.jpg";
import securityBg from "./assets/security.jpg";
import systemBg from "./assets/system.jpg";
import helpdeskBg from "./assets/helpdesk.jpg";

// Section background
import servicesBg from "./assets/services.jpg";

// Service data
const serviceData = [
  { animation: cloudAnimation, title: "Cloud Computing & Infrastructure", backgroundImage: cloudBg },
  { animation: aiAnimation, title: "Artificial Intelligence & Data Analytics", backgroundImage: aiBg },
  { animation: consultingAnimation, title: "IT Consulting", backgroundImage: consultingBg },
  { animation: securityAnimation, title: "Cybersecurity & Risk Management", backgroundImage: securityBg },
  { animation: systemAnimation, title: "System Integration & Automation", backgroundImage: systemBg },
  { animation: helpdeskAnimation, title: "Helpdesk & Support", backgroundImage: helpdeskBg },
];

// Single service card
const ServiceCard = ({ animation, title, index, activeIndex, totalServices, backgroundImage }) => {
  const angle = 360 / totalServices;
  const offset = index - activeIndex;
  const rotateY = offset * angle;
  const scale = index === activeIndex ? 1.1 : 0.95;
  const zIndex = index === activeIndex ? 3 : 1;

  return (
    <motion.div
      className="absolute w-96 h-72 rounded-xl overflow-hidden transition-all duration-500"
      style={{
        transform: `rotateY(${rotateY}deg) translateZ(450px) scale(${scale})`,
        zIndex,
        transformStyle: "preserve-3d",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm rounded-xl z-0"></div>

      {/* Content (not rotated, so it stays straight) */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-6 text-white">
        <div className="bg-green-500 bg-opacity-30 p-4 rounded-lg shadow-md">
          <Lottie animationData={animation} loop autoplay className="w-20 h-20" />
        </div>
        <h3 className="text-xl font-semibold mt-4 px-2 leading-tight">{title}</h3>
      </div>
    </motion.div>
  );
};

// Main Services component
const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalServices = serviceData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalServices);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalServices]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalServices);
    } else if (info.offset.x > 50) {
      setActiveIndex((prevIndex) => (prevIndex - 1 + totalServices) % totalServices);
    }
  };

  return (
    <section
      className="relative py-16 flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${servicesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>

      {/* Section header */}
      <div className="relative z-10 text-center px-4">
        <motion.h4
          className="text-4xl sm:text-5xl font-bold uppercase text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Services
        </motion.h4>
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-white mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Our <span className="text-green-400">Service Offerings</span>
        </motion.h2>
      </div>

      {/* Carousel */}
      <div className="relative w-full flex justify-center items-center h-[24rem] sm:h-[28rem] overflow-hidden mt-10 z-10 perspective-[1500px]">
        {/* Left arrow */}
        <button
          onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + totalServices) % totalServices)}
          className="absolute left-6 bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-xl p-2 rounded-full z-20"
        >
          &#8592;
        </button>

        {/* Cards container */}
        <motion.div
          className="relative w-[80%] h-full flex justify-center items-center"
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          onDragEnd={handleDragEnd}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {serviceData.map((service, index) => (
            <ServiceCard
              key={index}
              animation={service.animation}
              title={service.title}
              index={index}
              activeIndex={activeIndex}
              totalServices={totalServices}
              backgroundImage={service.backgroundImage}
            />
          ))}
        </motion.div>

        {/* Right arrow */}
        <button
          onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % totalServices)}
          className="absolute right-6 bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-xl p-2 rounded-full z-20"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default Services;
