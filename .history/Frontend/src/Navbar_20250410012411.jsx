import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "./assets/gstech_logo.png";

const Navbar = ({
  homeRef,
  aboutRef,
  servicesRef,
  whyusRef,
  pastExpRef,
  contactRef,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full py-3 px-4 sm:px-6 lg:px-10 transition-all duration-300 text-white ${
        isScrolled ? "bg-black shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <motion.img
            src={logo}
            alt="Company Logo"
            className="h-12 sm:h-14 w-auto object-contain rounded-lg"
            whileHover={{
              scale: 1.1,
              filter: "drop-shadow(0px 0px 10px rgba(0, 255, 128, 0.7))",
            }}
          />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 lg:space-x-10 text-base lg:text-lg font-semibold">
          {[
            { name: "Home", ref: homeRef },
            { name: "About Us", ref: aboutRef },
            { name: "Services", ref: servicesRef },
            { name: "Why Choose", ref: whyusRef },
            { name: "Past Performance", ref: pastExpRef },
            { name: "Contact", ref: contactRef },
          ].map((item, index) => (
            <li
              key={index}
              className="relative group cursor-pointer pb-1 text-gray-300 hover:text-white transition-all duration-200"
              onClick={() => scrollToSection(item.ref)}
            >
              {item.name}
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-400 scale-x-0 transition-transform duration-200 ease-in-out group-hover:scale-x-100"></span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white p-2 border border-green-400 rounded-lg shadow-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          ☰
        </motion.button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black text-white px-6 py-5 absolute w-full top-full left-0 z-40 shadow-md border-t border-green-500"
          >
            <ul className="space-y-5 text-base sm:text-lg text-center font-medium">
              {[
                { name: "Home", ref: homeRef },
                { name: "About Us", ref: aboutRef },
                { name: "Services", ref: servicesRef },
                { name: "Why Choose", ref: whyusRef },
                { name: "Past Performance", ref: pastExpRef },
                { name: "Contact", ref: contactRef },
              ].map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer text-gray-300 hover:text-white relative group"
                  onClick={() => scrollToSection(item.ref)}
                >
                  {item.name}
                  <span className="absolute left-1/2 bottom-0 h-[2px] w-1/2 bg-green-400 scale-x-0 transition-transform duration-150 ease-linear group-hover:scale-x-100 transform -translate-x-1/2"></span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
