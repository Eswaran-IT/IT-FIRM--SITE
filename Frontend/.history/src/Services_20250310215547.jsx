import React from "react";
import { Lottie } from "lottie-react";
import cloudAnimation from "./assets/icon-json/Cloud.json";
import aiAnimation from "./assets/icon-json/AI.json";
import consultingAnimation from "./assets/icon-json/Consulting.json";
import securityAnimation from "./assets/icon-json/Security.json";
import systemAnimation from "./assets/icon-json/System.json";
import helpdeskAnimation from "./assets/icon-json/Helpdesk.json"; // Import Helpdesk animation

const serviceData = [
  {
    animation: cloudAnimation,
    title: "Cloud Computing & Infrastructure",
  },
  {
    animation: aiAnimation,
    title: "Artificial Intelligence & Data Analytics",
  },
  {
    animation: consultingAnimation,
    title: "IT Consulting",
  },
  {
    animation: securityAnimation,
    title: "Cybersecurity & Risk Management",
  },
  {
    animation: systemAnimation,
    title: "System Integration & Automation",
  },
  {
    animation: helpdeskAnimation, // Add Helpdesk animation here
    title: "Helpdesk & Support",
  },
];

const ServiceCard = ({ animation, title }) => {
  return (
    <div
      className="w-[300px] sm:w-[250px] md:w-[280px] lg:w-[320px] relative px-4 pt-5 pb-3 bg-white rounded-lg shadow border-l-4 border-b-4 space-y-1 item"
      style={{ borderColor: "rgb(150, 246, 85)" }}
    >
      <div
        className="absolute -top-6 left-6 px-2 py-2 h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "rgb(150, 246, 85)" }}
      >
        <Lottie
          animationData={animation}
          loop={true}
          autoplay={true}
          height={50}
          width={50}
        />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
  );
};

const Services = () => {
  return (
    <section
      data-section="services"
      className="py-40 relative"
      style={{ color: "black", backgroundColor: "whitesmoke" }}
    >
      <div className="container space-y-3 relative z-20">
        <div className="text-center space-y-1">
          <h4
            className="text-xl capitalize border-b-2 w-fit mx-auto px-4"
            style={{ borderColor: "rgb(150, 246, 85)" }}
          >
            Services
          </h4>
          <h2 className="text-4xl font-bold">Our Services Offerings Include</h2>
        </div>
        <div className="flex gap-x-4 gap-y-8 pt-8 flex-wrap justify-center">
          {serviceData.map((service, index) => (
            <ServiceCard
              key={index}
              animation={service.animation}
              title={service.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
