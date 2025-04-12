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

// Import background images
import cloudBg from "./assets/cloud.jpg";
import aiBg from "./assets/Ai.jpg";
import consultingBg from "./assets/consulting.jpg";
import securityBg from "./assets/security.jpg";
import systemBg from "./assets/system.jpg";
import helpdeskBg from "./assets/helpdesk.jpg";
import servicesBg from "./assets/services.jpg";

// Service Data
const serviceData = [
  { animation: cloudAnimation, title: "Cloud Computing & Infrastructure", backgroundImage: cloudBg },
  { animation: aiAnimation, title: "Artificial Intelligence & Data Analytics", backgroundImage: aiBg },
  { animation: consultingAnimation, title: "IT Consulting", backgroundImage: consultingBg },
  { animation: securityAnimation, title: "Cybersecurity & Risk Management", backgroundImage: securityBg },
  { animation: systemAnimation, title: "System Integration & Automation", backgroundImage: systemBg },
  { animation: helpdeskAnimation, title: "Helpdesk & Support", backgroundImage: helpdeskBg },
];

// Individual Service Card
const ServiceCard = ({ animation, title, index, activeIndex, totalServices, backgroundImage }) => {
  const isActive = index === activeIndex;
  const angle = 360 / totalServices;
  const offset = index - activeIndex;
  const rotateY = offset * angle;

  const cardWidth = 250;
  const cardHeight = isActive ? 300 : 250; // Center card taller

  return (
    <motion.div
      className="absolute transition-all duration-500"
      style={{
        transform: `rotateY(${rotateY}deg) translateZ(500px)`,
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        zIndex: isActive ? 3 : 1,
      }}
    >
      <div
        className="rounded-xl overflow-hidden shadow-xl relative flex flex-col items-center justify-between text-white p-4"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      >
        <Lottie animationData={animation} loop autoplay className="h-20 w-20" />
        <h3 className="text-center text-md font-semibold">{title}</h3>
      </div>
    </motion.div>
  );
};

// Main Component
const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = serviceData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(interval);
  }, [total]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -50) setActiveIndex((prev) => (prev + 1) % total);
    else if (info.offset.x > 50) setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <section
      className="relative py-10 min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${servicesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>

      <div className="relative z-10 text-center text-white px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Services
        </motion.h2>
        <motion.p
          className="text-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Our <span className="text-green-400">Service Offerings</span>
        </motion.p>
      </div>

      {/* Carousel */}
      <div className="relative mt-12 w-full flex justify-center items-center z-10 h-[350px]">
        {/* Left Arrow */}
        <button
          onClick={() => setActiveIndex((prev) => (prev - 1 + total) % total)}
          className="absolute left-2 sm:left-6 bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-2xl p-2 rounded-full z-20"
        >
          &#8592;
        </button>

        <motion.div
          className="relative w-[800px] h-[300px] perspective-[1500px]"
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          onDragEnd={handleDragEnd}
        >
          {serviceData.map((service, index) => (
            <ServiceCard
              key={index}
              animation={service.animation}
              title={service.title}
              index={index}
              activeIndex={activeIndex}
              totalServices={total}
              backgroundImage={service.backgroundImage}
            />
          ))}
        </motion.div>

        {/* Right Arrow */}
        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % total)}
          className="absolute right-2 sm:right-6 bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-2xl p-2 rounded-full z-20"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default Services;
