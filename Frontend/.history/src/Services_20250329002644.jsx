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
const ServiceCard = ({ animation, title, index, activeIndex }) => {
  let transformStyle = "scale(0.8) rotateY(-30deg)";
  let zIndex = 1;

  if (index === activeIndex) {
    transformStyle = "scale(1) rotateY(0deg)";
    zIndex = 3;
  } else if (index === (activeIndex + 1) % serviceData.length) {
    transformStyle = "scale(0.8) rotateY(30deg) translateX(50px)";
    zIndex = 2;
  } else if (index === (activeIndex - 1 + serviceData.length) % serviceData.length) {
    transformStyle = "scale(0.8) rotateY(-30deg) translateX(-50px)";
    zIndex = 2;
  }

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % serviceData.length);
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

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
      <div className="relative w-full flex justify-center items-center h-96 overflow-hidden mt-12">
        {serviceData.map((service, index) => (
          <ServiceCard key={index} animation={service.animation} title={service.title} index={index} activeIndex={activeIndex} />
        ))}
      </div>
    </section>
  );
};

export default Services;
