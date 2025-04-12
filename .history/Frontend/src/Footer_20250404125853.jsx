import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone } from "react-icons/fi";

const Footer = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative bg-gray-900 text-white py-10 px-6 mt-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-green-500 opacity-10 blur-3xl"></div>

      <motion.div
        className="container mx-auto flex flex-col md:flex-row items-center justify-center relative transition-all duration-500"
        animate={{ x: showMap ? "-100px" : "0px" }} // Move text left when map opens
      >
        <motion.div
          className="text-center md:text-left flex flex-col items-center md:items-start space-y-2 transition-all duration-500"
        >
          <motion.p
            whileHover={{ scale: 1.05, color: "#22c55e" }}
            transition={{ duration: 0.3 }}
            className="text-xl font-semibold cursor-pointer"
          >
            GS Tech Groups LLC
          </motion.p>

          {/* Location Section with ID */}
          <motion.p
            id="footer-location"
            whileHover={{ scale: 1.05, color: "#22c55e" }}
            transition={{ duration: 0.3 }}
            className="mt-1 cursor-pointer"
            onClick={() => setShowMap(!showMap)}
          >
            14441 Eastbrook Dr, El Paso TX 79938
          </motion.p>

          {/* Phone Section */}
          <motion.div
            id="footer-phone"
            whileHover={{ scale: 1.05, color: "#16a34a" }}
            transition={{ duration: 0.3 }}
            className="mt-2 flex items-center justify-center gap-2 cursor-pointer"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            >
              <FiPhone className="text-green-400 text-2xl" />
            </motion.div>
            <a href="tel:8048924713" className="hover:underline">
              804-892-4713
            </a>
          </motion.div>

          {/* Email Section */}
          <motion.p
            id="footer-email"
            whileHover={{ scale: 1.05, color: "#22c55e" }}
            transition={{ duration: 0.3 }}
            className="mt-2 cursor-pointer"
          >
            ✉️ <a href="mailto:gstechgroups1@gmail.com" className="hover:underline">
              gstechgroups1@gmail.com
            </a>
          </motion.p>

          <motion.p
            whileHover={{ scale: 1.05, color: "#22c55e" }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-gray-400"
          >
            &copy; 2025 Federal Government Advisors
          </motion.p>
        </motion.div>

        {/* Map Opens Inside Footer on the Right */}
        {showMap && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-96 h-80 bg-gray-800 shadow-lg rounded-lg p-2 mt-4 md:mt-0 md:ml-10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3372.502085421706!2d-106.18195682358842!3d31.84947177418039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e7593dfab1a56d%3A0x735c7e4cfe8960eb!2s14441%20Eastbrook%20Dr%2C%20El%20Paso%2C%20TX%2079938!5e0!3m2!1sen!2sus!4v1712185433103!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>
        )}
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
