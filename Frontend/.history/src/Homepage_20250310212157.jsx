import React from "react";
import backgroundImage from "../assets/Main.jpeg"; 

const Homepage = () => {
  return (
    <section
      data-section="hero"
      className="relative flex h-screen min-h-[600px] flex-col pt-24 duration-300 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Using imported image
      }}
    >
      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <section className="relative flex grow items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="space-y-6 max-w-2xl">
            {/* Welcome Text */}
            <h3 className="text-xl capitalize text-white border-l-4 pl-4 border-green-400">
              Welcome to
            </h3>

            {/* Company Name */}
            <div>
              <h1 className="text-4xl font-bold text-white md:text-5xl">
                GS Tech Groups LLC
              </h1>

              {/* UEI and CAGE Information */}
              <div className="flex gap-6 text-white mt-2">
                <p className="uppercase text-sm">UEI: KET7DRM3BM85</p>
                <p className="uppercase text-sm">CAGE: 0QXD9</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-white text-lg leading-relaxed md:w-3/4">
              GS Tech Groups LLC is a Service-Disabled Veteran-Owned Small Business (SDVOSB) 
              based in El Paso, TX, specializing in cloud computing, cybersecurity, 
              and artificial intelligence. We provide innovative, secure, and scalable 
              IT solutions to help federal agencies achieve their mission-critical objectives 
              with efficiency and compliance.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Homepage;
