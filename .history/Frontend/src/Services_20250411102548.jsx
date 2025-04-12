import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

import cloudAnimation from "./assets/icon-json/Cloud.json";
import aiAnimation from "./assets/icon-json/AI.json";
import consultingAnimation from "./assets/icon-json/Consulting.json";
import securityAnimation from "./assets/icon-json/Security.json";
import systemAnimation from "./assets/icon-json/System.json";
import helpdeskAnimation from "./assets/icon-json/Helpdesk.json";

import cloudBg from "./assets/cloud.jpg";
import aiBg from "./assets/Ai.jpg";
import consultingBg from "./assets/consulting.jpg";
import securityBg from "./assets/security.jpg";
import systemBg from "./assets/system.jpg";
import helpdeskBg from "./assets/helpdesk.jpg";

import servicesBg from "./assets/services.jpg";

const serviceData = [
  { animation: cloudAnimation, title: "Cloud Computing & Infrastructure", backgroundImage: cloudBg },
  { animation: aiAnimation, title: "Artificial Intelligence & Data Analytics", backgroundImage: aiBg },
  { animation: consultingAnimation, title: "IT Consulting", backgroundImage: consultingBg },
  { animation: securityAnimation, title: "Cybersecurity & Risk Management", backgroundImage: securityBg },
  { animation: systemAnimation, title: "System Integration & Automation", backgroundImage: systemBg },
  { animation: helpdeskAnimation, title: "Helpdesk & Support", backgroundImage: helpdeskBg },
];

const ServiceCard = ({ animation, title, index, activeIndex }) => {
  const isActive = index === activeIndex;
  const scale = isActive ? 1.1 : 0.95;
  const opacity = isActive ? 1 : 0.6;
  const size = isActive ? "w-72 h-64" : "w-64 h-56";

  return (
    <motion.div
      className={`rounded-xl overflow-hidden text-white flex flex-col justify-between items-center p-4 shadow-xl bg-cover bg-center transition-all duration-500 ${size}`}
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${serviceData[index].backgroundImage})`,
        transform: `scale(${scale})`,
        opacity,
        zIndex: isActive ? 3 : 1,
      }}
    >
      <Lottie animationData={animation} loop autoplay className="h-20 w-20" />
      <h3 className="text-md sm:text-lg font-semibold text-center mt-4 px-2">{title}</h3>
    </motion.div>
  );
};

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = serviceData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);
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

      <div className="relative mt-12 w-full flex justify-center items-center z-10">
        <button
          onClick={() => setActiveIndex((prev) => (prev - 1 + total) % total)}
          className="absolute left-2 sm:left-6 bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-2xl p-2 rounded-full shadow-md z-20"
        >
          &#8592;
        </button>

        <motion.div
          className="flex gap-6 items-center justify-center px-6 overflow-hidden"
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
            />
          ))}
        </motion.div>

        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % total)}
          className="absolute right-2 sm:right-6 bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-2xl p-2 rounded-full shadow-md z-20"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default Services;
