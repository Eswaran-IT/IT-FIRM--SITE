import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Lottie from "lottie-react";

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

// React Multi-Carousel Configuration
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Services = () => {
  return (
    <section className="py-20 bg-black flex flex-col items-center">
      <h4 className="text-6xl font-bold uppercase tracking-wide text-white">
        Services
      </h4>
      <h2 className="text-4xl font-bold text-white mt-4">
        Our <span className="text-green-400">Service Offerings</span>
      </h2>

      {/* React Multi-Carousel */}
      <div className="w-full mt-12 px-10">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          transitionDuration={500}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          className="pb-10"
        >
          {serviceData.map((service, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg shadow-lg p-6 border border-green-400 flex flex-col items-center"
            >
              <div className="p-4 rounded-full bg-green-400 bg-opacity-20 shadow-lg mb-4">
                <Lottie animationData={service.animation} loop autoplay className="h-24 w-24" />
              </div>
              <h3 className="text-lg font-bold text-center text-white">{service.title}</h3>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Services;
