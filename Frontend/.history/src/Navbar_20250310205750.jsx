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
            className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
          />
        </a>

        {/* Desktop Navigation - Right aligned */}
        <ul className="hidden md:flex space-x-6 ml-auto">
          {/* Replace NAVBAR_LINKS with your actual data */}
          {["About Us", "Services", "Why Us", "Past Performance", "Capability Statement"].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="hover:text-gray-400 text-white"
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
            {/* Replace NAVBAR_LINKS with your actual data */}
            {["About Us", "Services", "Why Us", "Past Performance", "Capability Statement"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="block hover:text-gray-400"
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
