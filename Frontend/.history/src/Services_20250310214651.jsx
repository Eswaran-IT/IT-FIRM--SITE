import React from "react";
import Lottie from "react-lottie";
import cloudAnimation from "./assets/icon-json/Cloud.json";
import aiAnimation from "./assets/icon-json/AI.json";
import consultingAnimation from "./assets/icon-json/Consulting.json";
import securityAnimation from "./assets/icon-json/Security.json";
import systemAnimation from "./assets/icon-json/System.json";

const Services = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: cloudAnimation, 
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section data-section="services" className="py-40 relative" style={{ color: "black", backgroundColor: "whitesmoke" }}>
      <div className="container space-y-3 relative z-20">
        <div className="text-center space-y-1">
          <h4 className="text-xl capitalize border-b-2 w-fit mx-auto px-4" style={{ borderColor: "rgb(150, 246, 85)" }}>
            Services
          </h4>
          <h2 className="text-4xl font-bold">Our Services Offerings Include</h2>
        </div>
        <div className="flex gap-x-4 gap-y-8 pt-8 flex-wrap justify-center">
          {/* Cloud Service */}
          <div className="w-[300px] relative px-4 pt-5 pb-3 bg-white rounded-lg shadow border-l-4 border-b-4 space-y-1 item" style={{ borderColor: "rgb(150, 246, 85)" }}>
            <div className="absolute -top-5 left-5 px-1 py-1 h-10 w-10 rounded flex items-center justify-center" style={{ backgroundColor: "rgb(150, 246, 85)" }}>
              <Lottie options={{ ...defaultOptions, animationData: cloudAnimation }} height={50} width={50} />
            </div>
            <h3 className="text-xl font-bold">Cloud Computing & Infrastructure</h3>
          </div>
          
          {/* AI Service */}
          <div className="w-[300px] relative px-4 pt-5 pb-3 bg-white rounded-lg shadow border-l-4 border-b-4 space-y-1 item" style={{ borderColor: "rgb(150, 246, 85)" }}>
            <div className="absolute -top-5 left-5 px-1 py-1 h-10 w-10 rounded flex items-center justify-center" style={{ backgroundColor: "rgb(150, 246, 85)" }}>
              <Lottie options={{ ...defaultOptions, animationData: aiAnimation }} height={50} width={50} />
            </div>
            <h3 className="text-xl font-bold">Artificial Intelligence & Data Analytics</h3>
          </div>

          {/* Consulting Service */}
          <div className="w-[300px] relative px-4 pt-5 pb-3 bg-white rounded-lg shadow border-l-4 border-b-4 space-y-1 item" style={{ borderColor: "rgb(150, 246, 85)" }}>
            <div className="absolute -top-5 left-5 px-1 py-1 h-10 w-10 rounded flex items-center justify-center" style={{ backgroundColor: "rgb(150, 246, 85)" }}>
              <Lottie options={{ ...defaultOptions, animationData: consultingAnimation }} height={50} width={50} />
            </div>
            <h3 className="text-xl font-bold">IT Consulting</h3>
          </div>

          {/* Security Service */}
          <div className="w-[300px] relative px-4 pt-5 pb-3 bg-white rounded-lg shadow border-l-4 border-b-4 space-y-1 item" style={{ borderColor: "rgb(150, 246, 85)" }}>
            <div className="absolute -top-5 left-5 px-1 py-1 h-10 w-10 rounded flex items-center justify-center" style={{ backgroundColor: "rgb(150, 246, 85)" }}>
              <Lottie options={{ ...defaultOptions, animationData: securityAnimation }} height={50} width={50} />
            </div>
            <h3 className="text-xl font-bold">Cybersecurity & Risk Management</h3>
          </div>

          {/* System Integration Service */}
          <div className="w-[300px] relative px-4 pt-5 pb-3 bg-white rounded-lg shadow border-l-4 border-b-4 space-y-1 item" style={{ borderColor: "rgb(150, 246, 85)" }}>
            <div className="absolute -top-5 left-5 px-1 py-1 h-10 w-10 rounded flex items-center justify-center" style={{ backgroundColor: "rgb(150, 246, 85)" }}>
              <Lottie options={{ ...defaultOptions, animationData: systemAnimation }} height={50} width={50} />
            </div>
            <h3 className="text-xl font-bold">System Integration & Automation</h3>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
