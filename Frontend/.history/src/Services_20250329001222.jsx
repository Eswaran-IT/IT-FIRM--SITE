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

// Utility function for card transformations
const getCardStyle = (index, activeIndex, length) => {
  let transformStyle = "scale(0.8) rotateY(-30deg)";
  let zIndex = 1;

  if (index === activeIndex) {
    transformStyle = "scale(1) rotateY(0deg)";
    zIndex = 3;
  } else if (index === (activeIndex + 1) % length) {
    transformStyle = "scale(0.8) rotateY(30deg) translateX(50px)";
    zIndex = 2;
  } else if (index === (activeIndex - 1 + length) % length) {
    transformStyle = "scale(0.8) rotateY(-30deg) translateX(-50px)";
    zIndex = 2;
  }

  return { transformStyle, zIndex };
};

// Service Card Component
const ServiceCard = ({ animation, title, index, activeIndex, length }) => {
  const { transformStyle, zIndex } = getCardStyle(index, activeIndex, length);

  return (
    <motion.div
      className="absolute bg-gray-900 rounded-lg shadow-lg p-6 border border-green-400 transition-all duration-500"
      style={{ transform: transformStyle, zIndex }}
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

// Services Component with 3D Carousel
const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % serviceData.length);
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Manually control the carousel with buttons
  const nextSlide = () => setActiveIndex((prevIndex) => (prevIndex + 1) % serviceData.length);
  const prevSlide = () => setActiveIndex((prevIndex) => (prevIndex - 1 + serviceData.length) % serviceData.length);

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
      
      {/* Carousel Container */}
      <div className="relative w-full flex justify-center items-center h-96 overflow-hidden mt-12">
        {/* Service Cards */}
        {serviceData.map((service, index) => (
          <ServiceCard 
            key={index} 
            animation={service.animation} 
            title={service.title} 
            index={index} 
            activeIndex={activeIndex} 
            length={serviceData.length} 
          />
        ))}

        {/* Previous and Next Buttons */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
          onClick={prevSlide}
        >
          &#8249;
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
          onClick={nextSlide}
        >
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default Services;
