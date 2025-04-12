import React, { useState, useEffect } from "react";
import logo from "./assets/business_logo.jpeg"; // Directly importing the logo

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTop, setIsTop] = useState(true); // To detect if the page is at the top

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Detect when scrolled down
      setIsTop(window.scrollY === 0); // Check if it's at the top
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 text-white ${
        isScrolled ? "bg-gray-900" : "bg-transparent"
      } ${isTop ? "h-screen" : "h-20"} `} // Changes height depending on scroll
      style={{
        boxShadow: isScrolled ? "0px 4px 6px rgba(0,0,0,0.1)" : "none", // Shadow on scroll
        transition: "height 0.3s ease", // Smooth transition for height
      }}
    >
      <div className="container mx-auto flex justify-between items-center gap-4 h-full">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <picture className="h-full w-40 sm:h-24 sm:w-48 md:h-28 md:w-52 block">
            <source srcSet={logo} type="image/jpeg" />
            <img
              alt="Company Logo"
              className={`object-contain w-full h-full transition-all duration-300 ${
                isScrolled ? "h-12" : "h-24" // Logo size change on scroll
              }`}
            />
          </picture>
        </a>

        {/* Desktop Navigation - Right aligned */}
        <ul className="hidden md:flex space-x-6 ml-auto">
          {["About Us", "Services", "Why Us", "Past Performance"].map((link) => (
            <li key={link}>
              <a href="#" className="hover:text-gray-400 text-white">
                {link}
              </a>
            </li>
          ))}

          {/* Contact Us Button */}
          <li>
            <a
              href="#contact"
              className="hover:text-gray-400 text-white"
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Desktop - Capability Statement Button */}
        <div className="flex items-center gap-4">
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
