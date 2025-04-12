import React from "react";
import { motion } from "framer-motion";

const naicsList = [
  { code: "518210", description: "Data Processing Hosting and Related Services" },
  { code: "541511", description: "Custom Computer Programming Services" },
  { code: "541519", description: "Other Computer Related Services" },
  { code: "541513", description: "Computer Facilities Management Services" },
  { code: "541512", description: "Computer Systems Design Services" },
];

const Naics = () => {
  return (
    <section data-section="code-list" className="py-24 bg-black border-t-2 border-green-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 text-center">
        
        {/* Glowing NAICS Title */}
        <motion.h3
          className="text-4xl font-bold text-white glow-text inline-block border-b-4 border-green-400 pb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          NAICS
        </motion.h3>

        {/* NAICS List */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {naicsList.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col space-y-2 bg-gray-900 p-4 border-2 border-green-400 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-green-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <p className="whitespace-nowrap overflow-x-hidden text-ellipsis text-white w-full text-lg">
                <span className="font-bold text-green-400">{item.code}:</span>
                <span> {item.description}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CSS for Glowing Effect */}
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 15px rgba(0, 255, 128, 1), 0 0 30px rgba(0, 255, 128, 0.8);
          animation: glow 1.5s infinite alternate;
        }

        @keyframes glow {
          from {
            text-shadow: 0 0 15px rgba(0, 255, 128, 0.8), 0 0 30px rgba(0, 255, 128, 0.6);
          }
          to {
            text-shadow: 0 0 20px rgba(0, 255, 128, 1), 0 0 35px rgba(0, 255, 128, 0.9);
          }
        }
      `}</style>
    </section>
  );
};

export default Naics;
