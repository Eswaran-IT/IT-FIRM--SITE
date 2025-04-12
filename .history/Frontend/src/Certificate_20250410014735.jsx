import React, { useState } from "react";
import { motion } from "framer-motion";
import C1 from "./assets/C1.png";
import C2 from "./assets/C2.png";

const Certificate = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section data-section="certificates" className="bg-black py-12 md:pt-6 md:pb-6">
      {/* Certifications Title (Smaller Size) */}
      <motion.h1
        className="text-center text-3xl sm:text-4xl font-bold text-white mb-6 md:mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        CERTIFICATIONS
      </motion.h1>

      {/* Certificate Grid */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-3">
        {[C1, C2].map((cert, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="p-1 flex justify-center items-center cursor-pointer border border-green-400 rounded-lg shadow-md"
            onClick={() => setSelectedCert(cert)}
          >
            <img
              src={cert}
              alt={`Certificate ${index + 1}`}
              className="h-48 sm:h-52 md:h-56 w-auto object-contain rounded-lg"
            />
          </motion.div>
        ))}
      </div>

      {/* Certificate Preview Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedCert(null)}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={selectedCert}
              alt="Enlarged Certificate"
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-green-400"
            />
            <button
              className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2 hover:bg-red-700 transition"
              onClick={() => setSelectedCert(null)}
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Certificate;
