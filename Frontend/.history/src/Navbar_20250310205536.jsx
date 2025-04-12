import React, { useState, useEffect } from "react";
import { NAVBAR_LOGO, NAVBAR_LINKS } from "./Constants";
import logo from "./assets/business_logo.jpeg";

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
        backgroundColor: isScrolled ? "rgb(49, 50, 54)" : "rgb(49, 50, 54)", 
        padding: isScrolled ? "12px 0" : "20px 0",
        boxShadow: isScrolled ? "0px 4px 6px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Logo (Responsive) */}
        <a href="#" className="flex items-center">
          <img
            src={NAVBAR_LOGO}
            alt="Company Logo"
            className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          {NAVBAR_LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`hover:text-gray-400 ${
                  link.special ? "bg-green-500 text-white px-4 py-2 rounded-full" : ""
                }`}
              >
                {link.name}
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
            {NAVBAR_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`block ${
                    link.special ? "bg-green-500 text-white px-4 py-2 rounded-full text-center" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
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
