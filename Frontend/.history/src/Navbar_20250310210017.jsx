import React, { useState, useEffect } from "react";
import logo from "./assets/business_logo.jpeg"; // Directly importing the logo

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 text-white`}
      style={{
        backgroundColor: isScrolled ? "rgb(49, 50, 54)" : "rgb(49, 50, 54)", // RGB Background color
        padding: isScrolled ? "12px 0" : "20px 0",
        boxShadow: isScrolled ? "0px 4px 6px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            src={logo}
            alt="Company Logo"
            className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-contain"
          />
        </a>

        {/* Desktop Navigation - Right aligned */}
        <ul className="hidden md:flex space-x-6 ml-auto">
          {["About Us", "Services", "Why Us", "Past Performance", "Capability Statement"].map((link, index) => (
            <li key={link}>
              <a
                href="#"
                className={`hover:text-gray-400 text-white ${
                  link === "Capability Statement" ? "bg-green-500 px-4 py-2 rounded-full" : ""
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white py-3 px-5 absolute w-full left-0 top-16 shadow-lg">
          <ul className="space-y-4">
            {["About Us", "Services", "Why Us", "Past Performance", "Capability Statement"].map((link, index) => (
              <li key={link}>
                <a
                  href="#"
                  className={`block hover:text-gray-400 ${
                    link === "Capability Statement" ? "bg-green-500 px-4 py-2 rounded-full text-center" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
