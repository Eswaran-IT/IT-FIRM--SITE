import React from "react";
import { FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-4 py-10 relative">
      <div className="absolute inset-0 bg-green-400 opacity-10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center md:items-start md:gap-6 gap-4 relative z-10">
        {/* Left: Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center md:text-left space-y-2 w-full md:w-auto"
        >
          <h2 className="text-2xl font-bold text-green-400">GS Tech Groups LLC</h2>
          <p className="text-gray-300 text-base leading-tight">
            14441 Eastbrook Dr, El Paso, TX 79938
          </p>

          <div className="flex justify-center md:justify-start items-center gap-2 text-base">
            <FiPhone className="text-green-400 text-xl" />
            <span>804-892-4713</span>
          </div>

          <p className="text-base">✉️ gstechgroups1@gmail.com</p>

          <p className="text-sm text-gray-500 mt-2">
            &copy; 2025 GS Tech Groups LLC. All rights reserved.
          </p>
        </motion.div>

        {/* Right: Embedded Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-96 h-60 rounded-lg overflow-hidden shadow-lg md:ml-4"
        >
          <iframe
            title="GS Tech Groups Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3372.502085421706!2d-106.18195682358842!3d31.84947177418039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e7593dfab1a56d%3A0x735c7e4cfe8960eb!2s14441%20Eastbrook%20Dr%2C%20El%20Paso%2C%20TX%2079938!5e0!3m2!1sen!2sus!4v1712185433103!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
