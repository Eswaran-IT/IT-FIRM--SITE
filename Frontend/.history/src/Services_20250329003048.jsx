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
  const angle = 360 / totalServices; // Calculate angle for the circular layout
  const offset = index - activeIndex;
  const rotateY = offset * angle;

  // The center card should be bigger
  const isActive = index === activeIndex;
  const scale = isActive ? 1.2 : 0.8; // Make the center card bigger
  const zIndex = isActive ? 3 : 1;

  return (
    <motion.div
      className="absolute bg-gray-900 rounded-lg shadow-lg p-6 border border-green-400 transition-all duration-500"
      style={{
        transform: `scale(${scale}) rotateY(${rotateY}deg) translateZ(400px)`,
        zIndex: zIndex,
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

  // Auto-scroll for carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalServices);
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [totalServices]);

  // Navigate to next service
  const nextService = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalServices);
  };

  // Navigate to previous service
  const prevService = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalServices) % totalServices);
  };

  return (
    <section className="py-20 bg-black flex flex-col items-center relative">
      <motion.h4
        className="text-6xl font-bold uppercase tracking-wide text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        Services
      </motion.h4>
      <motion.h2
        className="text-4xl font-bold text-white mt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Our <span className="text-green-400">Service Offerings</span>
      </motion.h2>

      {/* Arrows */}
      <button
        onClick={prevService}
        className="absolute left-4 text-white bg-green-400 rounded-full p-4 shadow-lg hover:bg-green-500"
      >
        {"<"}
      </button>
      <button
        onClick={nextService}
        className="absolute right-4 text-white bg-green-400 rounded-full p-4 shadow-lg hover:bg-green-500"
      >
        {">"}
      </button>

      {/* Carousel Container */}
      <div className="relative w-full flex justify-center items-center h-96 overflow-hidden mt-12">
        <div className="relative w-full h-full">
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
      </div>
    </section>
  );
};

export default Services;
