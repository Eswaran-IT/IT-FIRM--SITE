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
    <header
      className={`fixed top-0 z-50 w-full py-2 transition-all duration-300 text-white`}
      style={{
        backgroundColor: isScrolled ? "rgb(49, 50, 54)" : "rgb(49, 50, 54)", // RGB Background color
        boxShadow: isScrolled ? "0px 4px 6px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div className="container mx-auto flex justify-between items-center gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <picture className="h-16 w-40 sm:h-20 sm:w-44 md:h-24 md:w-48 block">
            <source srcSet={logo} type="image/jpeg" />
            <img
              alt="Company Logo"
              className="object-contain w-full h-full"
            />
          </picture>
        </a>

        {/* Desktop Navigation - Right aligned */}
        <ul className="hidden md:flex space-x-6 ml-auto">
          {["About Us", "Services", "Why Us", "Past Performance", "Contact Us"].map((link) => (
            <li key={link}>
              <a href="#" className="hover:text-gray-400 text-white">
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop - Capability Statement Button */}
        <div className="flex items-center gap-4">
          {/* Capability Statement Button */}
          <a
            className="rounded-full px-4 py-3 font-bold duration-300 bg-green-400 text-white"
            target="_blank"
            href="files/gstechgroups.pdf"
          >
            <button>Capability Statement</button>
          </a>
        </div>

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
            {["About Us", "Services", "Why Us", "Past Performance", "Contact Us"].map((link) => (
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
    </header>
  );
};

export default Navbar;
