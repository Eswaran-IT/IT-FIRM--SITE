import React from "react";
import { motion } from "framer-motion";
import WhyUsVideo from "./assets/Whyus.mp4"; // Ensure the correct path

const WhyUs = () => {
  const sections = [
    { id: 1, text: "We have a proven track record of delivering mission-critical IT solutions for both public and private organizations." },
    { id: 2, text: "Our client-centric approach ensures customized and scalable systems that drive efficiency and business growth." },
    { id: 3, text: "We are a trusted partner in delivering secure, innovative, and cost-effective digital transformation solutions." },
    { id: 4, text: "Expertise in cloud computing, cybersecurity, and AI, catering to both government and private sector clients." },
    { id: 5, text: "We provide tailored, compliance-focused solutions that prioritize security, scalability, and technological innovation." },
    { id: 6, text: "Significant cost savings through optimized IT infrastructure, automation, and efficient resource utilization." },
    { id: 7, text: "Deep knowledge in regulatory compliance for government and competitive strategies for private sector growth." },
  ];

  return (
    <section className="relative text-white py-40 overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src={WhyUsVideo} type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay for Readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 backdrop-blur-md -z-10"></div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Title Section (Updated) */}
        <div className="text-center space-y-6">
          <motion.h4
            className="text-4xl font-semibold uppercase" // Changed to uppercase
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            WHY CHOOSE US
          </motion.h4>
          <motion.h2
            className="text-6xl font-extrabold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            GS Tech Groups 
          </motion.h2>
          <p className="text-xl max-w-2xl mx-auto">
            GS TECH GROUPS  provides innovative, reliable, and scalable IT solutions that empower both government agencies and private organizations to achieve their technological goals.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              className="flex items-start gap-x-4 bg-white/10 p-6 rounded-lg border border-green-400 shadow-lg transition transform duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {/* Content */}
              <motion.p
                className="text-lg"
                whileHover={{
                  transition: { duration: 0.5 },
                }}
              >
                {section.text}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
