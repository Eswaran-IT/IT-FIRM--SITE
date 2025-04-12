import React, { useEffect, useState } from "react";
import AboutVideo from "./assets/About.mp4";
import { motion } from "framer-motion";

const AboutUs = () => {
  const fullText = "GS Tech Groups LLC";
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let index = 0;
    let isDeleting = false;

    const interval = setInterval(() => {
      if (!isDeleting) {
        setText(fullText.slice(0, index));
        index++;
        if (index > fullText.length) {
          isDeleting = true;
          setTimeout(() => {}, 1000);
        }
      } else {
        setText(fullText.slice(0, index));
        index--;
        if (index === 0) {
          isDeleting = false;
        }
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about-section");
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="about-section"
      className="relative flex flex-col items-center justify-center w-full min-h-[90vh] bg-black overflow-hidden pt-12 pb-12 md:pt-10 md:pb-10"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={AboutVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black opacity-80 backdrop-blur-lg"></div>
      </div>

      {/* Title */}
      <motion.h1
        className="text-white text-6xl font-bold text-center uppercase relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        ABOUT US
      </motion.h1>

      {/* Description Box */}
      <motion.div
        className="text-white text-center max-w-3xl relative z-10 p-6 mt-4 md:mt-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: isVisible ? 0 : 50, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h2 className="text-4xl font-bold mb-4 typing-text">{text}</h2>
        <p className="text-lg leading-relaxed">
          GS Tech Groups LLC, an SDVOSB, empowers federal agencies with secure, innovative IT solutions in cloud, cybersecurity, and AI. We deliver scalable, compliant technologies for mission-critical operations, leveraging expertise to modernize environments, streamline workflows, and safeguard data, ensuring reliable mission success.
        </p>
      </motion.div>

      {/* Typing glow effect */}
      <style jsx>{`
        .typing-text {
          text-shadow: 0 0 12px rgba(0, 255, 128, 0.9), 0 0 25px rgba(0, 255, 128, 0.7);
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
