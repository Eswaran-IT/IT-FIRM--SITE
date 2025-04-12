import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, ease: "easeOut" }} 
      className="bg-black text-white py-8 px-4 md:py-16 md:px-6"
    >
      <div className="container mx-auto max-w-5xl text-center">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-green-400 mb-6 uppercase"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl">
        {/* Left Side: Contact Info */}
        <div className="space-y-6">
          <InfoBox icon={<FiMapPin />} title="Location" text="14441 Eastbrook Dr, El Paso TX 79938" />
          <InfoBox icon={<FiMail />} title="Email" text="gstechgroups1@gmail.com" />
          <InfoBox icon={<FiPhone />} title="Call" text="804-892-4713" />
        </div>
        
        {/* Right Side: Contact Form */}
        <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
          <motion.h3 whileHover={{ scale: 1.05, color: "#22c55e" }} className="text-xl md:text-2xl font-semibold mb-4">
            Get in Touch
          </motion.h3>
          {submitted ? (
            <p className="text-green-400">Thank you! Your message has been sent.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField type="text" name="name" placeholder="Your Name" value={formData.name} handleChange={handleChange} />
                <InputField type="email" name="email" placeholder="Your Email" value={formData.email} handleChange={handleChange} />
              </div>
              <InputField type="tel" name="phone" placeholder="Your Mobile Number" value={formData.phone} handleChange={handleChange} />
              <TextAreaField name="message" placeholder="Your Message" value={formData.message} handleChange={handleChange} />
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="w-full p-3 md:p-4 bg-green-500 rounded text-white font-semibold hover:bg-green-600 transition"
              >
                Send Message
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </motion.section>
  );
};

const InfoBox = ({ icon, title, text }) => (
  <motion.div 
    className="bg-gray-900 p-4 md:p-6 rounded-lg flex items-center gap-4 shadow-md"
    whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
  >
    <div className="text-2xl md:text-3xl text-green-400">{icon}</div>
    <div>
      <h4 className="text-lg md:text-xl font-semibold">{title}</h4>
      <p className="text-gray-300">{text}</p>
    </div>
  </motion.div>
);

const InputField = ({ type, name, placeholder, value, handleChange }) => (
  <motion.input
    whileFocus={{ scale: 1.02 }}
    type={type}
    name={name}
    placeholder={placeholder}
    required
    value={value}
    onChange={handleChange}
    className="w-full p-3 md:p-4 rounded bg-gray-700 border border-gray-600 focus:border-green-400 transition"
  />
);

const TextAreaField = ({ name, placeholder, value, handleChange }) => (
  <motion.textarea
    whileFocus={{ scale: 1.02 }}
    name={name}
    placeholder={placeholder}
    required
    rows="4"
    value={value}
    onChange={handleChange}
    className="w-full p-3 md:p-4 rounded bg-gray-700 border border-gray-600 focus:border-green-400 transition"
  />
);

export default Contact;
