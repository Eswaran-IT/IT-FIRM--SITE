import React from "react";
import { motion } from "framer-motion";
import { FiPhone } from "react-icons/fi";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative bg-gray-900 text-white py-10 px-6 mt-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-green-500 opacity-10 blur-3xl"></div>

      {/* Centered Flex Container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around gap-10 relative text-center md:text-left">
        
        {/* Left - Company Info */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-green-400">GS Tech Groups LLC</h2>

          {/* Address */}
          <div className="text-gray-300 text-sm leading-relaxed">
            <p>14441 Eastbrook Dr,</p>
            <p>El Paso, TX 79938</p>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm">
            <FiPhone className="text-green-400 text-xl" />
            <a href="tel:8048924713" className="hover:underline">
              804-892-4713
            </a>
          </div>

          {/* Email */}
          <div className="mt-2 text-sm">
            ✉️{" "}
            <a
              href="mailto:gstechgroups1@gmail.com"
              className="hover:underline"
            >
              gstechgroups1@gmail.com
            </a>
          </div>

          {/* Copyright */}
          <p className="mt-4 text-xs text-gray-500">
            &copy; 2025 Federal Government Advisors
          </p>
        </div>

        {/* Right - Map */}
        <div className="w-full md:w-[400px] h-80 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Company Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3372.502085421706!2d-106.18195682358842!3d31.84947177418039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e7593dfab1a56d%3A0x735c7e4cfe8960eb!2s14441%20Eastbrook%20Dr%2C%20El%20Paso%2C%20TX%2079938!5e0!3m2!1sen!2sus!4v1712185433103!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
