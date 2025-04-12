import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import backgroundImage from "./assets/world.jpg"; 

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "", phone: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert("Failed to submit form");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong!");
    }
  };
  

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative text-white py-8 px-4 md:py-16 md:px-6"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="relative container mx-auto max-w-5xl text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)" }}
        >
          Contact Us
        </motion.h2>
      </div>

      <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl">
        <div className="space-y-6">
          <InfoBox icon={<FiMapPin />} title="Location" text="14441 Eastbrook Dr, El Paso TX 79938" link="#footer-location" />
          <InfoBox icon={<FiMail />} title="Email" text="gstechgroups1@gmail.com" link="#footer-email" />
          <InfoBox icon={<FiPhone />} title="Call" text="804-892-4713" link="#footer-phone" />
        </div>

        <div className="bg-gray-800 bg-opacity-90 p-6 md:p-8 rounded-lg shadow-lg">
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

const InfoBox = ({ icon, title, text, link }) => (
  <motion.a
    href={link}
    className="bg-gray-900 p-4 md:p-6 rounded-lg flex items-center gap-4 shadow-md transition-transform transform hover:scale-103 hover:shadow-md"
    whileHover={{ scale: 1.03, boxShadow: "0px 0px 10px rgba(34, 197, 94, 0.4)" }}
  >
    <motion.div
      className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg"
      whileHover={{
        boxShadow: "0px 0px 15px rgba(34, 197, 94, 1)",
      }}
      transition={{ duration: 0.3 }}
    >
      {icon}
    </motion.div>
    <div>
      <h4 className="text-lg md:text-xl font-semibold">{title}</h4>
      <p className="text-gray-300">{text}</p>
    </div>
  </motion.a>
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