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

// Import section background image
import servicesBg from "./assets/services.jpg";

// Service Data with Background Images
const serviceData = [
  { animation: cloudAnimation, title: "Cloud Computing & Infrastructure", backgroundImage: cloudBg },
  { animation: aiAnimation, title: "Artificial Intelligence & Data Analytics", backgroundImage: aiBg },
  { animation: consultingAnimation, title: "IT Consulting", backgroundImage: consultingBg },
  { animation: securityAnimation, title: "Cybersecurity & Risk Management", backgroundImage: securityBg },
  { animation: systemAnimation, title: "System Integration & Automation", backgroundImage: systemBg },
  { animation: helpdeskAnimation, title: "Helpdesk & Support", backgroundImage: helpdeskBg },
];

// Service Card Component (Square Shape)
const ServiceCard = ({ animation, title, index, activeIndex, totalServices, backgroundImage }) => {
  const angle = 360 / totalServices;
  const offset = index - activeIndex;
  const rotateY = offset * angle;
  const scale = index === activeIndex ? 1.1 : 0.9;
  const zIndex = index === activeIndex ? 3 : 1;
  const cardSize = "w-64 h-64";

  return (
    <motion.div
      className={`absolute ${cardSize} rounded-lg p-6 transition-all duration-500 border border-transparent`}
      style={{
        transform: `scale(${scale}) rotateY(${rotateY}deg) translateZ(400px)`,
        zIndex,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg"></div>

      <div className="relative flex flex-col items-center justify-center text-center rounded-lg p-6 
                      shadow-[0_0_15px_rgba(255,255,255,0.6)] hover:shadow-[0_0_25px_rgba(255,255,255,0.9)] 
                      transition-shadow duration-300 border border-white border-opacity-50 w-full h-full">
        <div className="p-4 rounded-lg bg-green-400 bg-opacity-30 shadow-lg relative z-10">
          <Lottie animationData={animation} loop autoplay className="h-20 w-20" />
        </div>
        <h3 className="text-lg font-bold text-white mt-4 relative z-10">{title}</h3>
      </div>
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
      className="relative py-20 flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${servicesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"></div>

      {/* Title */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
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
      </div>

      {/* Carousel */}
      <motion.div
        className="relative w-full flex justify-center items-center h-72 sm:h-80 overflow-hidden mt-12 relative z-10"
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        onDragEnd={handleDragEnd}
      >
        <div className="relative w-full h-full flex justify-center items-center">
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
        </div>
      </motion.div>

      {/* Navigation Arrows */}
      <div className="absolute z-20 top-1/2 left-4 transform -translate-y-1/2">
        <button
          onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + totalServices) % totalServices)}
          className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-2xl p-2 rounded-full shadow-lg"
        >
          &#8592;
        </button>
      </div>
      <div className="absolute z-20 top-1/2 right-4 transform -translate-y-1/2">
        <button
          onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % totalServices)}
          className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-2xl p-2 rounded-full shadow-lg"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default Services;
