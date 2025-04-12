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
    <section 
      data-section="code-list" 
      className="min-h-screen flex flex-col justify-center 
                 py-16 sm:py-16 md:py-8 lg:py-16 
                 bg-black border-t-2 border-green-400"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">

        {/* ✅ Title */}
        <div className="flex justify-center mb-10 md:mb-6">
          <motion.h3
            className="text-4xl font-bold text-white inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            NAICS
          </motion.h3>
        </div>

        {/* ✅ Grid */}
        <div className="grid gap-6 
          grid-cols-2 md:grid-cols-4 lg:grid-cols-6 
          auto-rows-[140px] 
          md:auto-rows-[160px] 
          lg:auto-rows-[200px]"
        >
          {naicsList.map((item, index) => (
            <motion.div
              key={index}
              className={`flex items-center justify-center bg-gray-900 p-4 border-2 border-green-400 rounded-lg shadow-lg text-center
                ${index === 0 ? "col-span-2 row-span-2" : ""}
                ${index === 1 ? "col-span-2" : ""}
                ${index === 2 ? "col-span-1 row-span-2 min-h-[240px] md:min-h-[200px] lg:min-h-[280px]" : ""}
                ${index === 3 ? "col-span-1 row-span-2 min-h-[240px] md:min-h-[200px] lg:min-h-[280px]" : ""}
                ${index === 4 ? "col-span-2 row-span-1" : ""}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <span className="text-3xl font-extrabold text-green-400">{item.code}</span>
                <p className="text-white text-sm md:text-base px-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Naics;
