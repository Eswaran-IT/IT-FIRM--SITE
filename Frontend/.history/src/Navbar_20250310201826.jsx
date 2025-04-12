import React, { useState, useEffect } from "react";
import { NAVBAR_LINKS, COMPANY_LOGO } from "./Constants";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-800 py-3 shadow-lg" : "bg-gray-900 py-8"
      } text-white`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Company Logo */}
        <a href="#" className="text-xl font-bold flex items-center">
          <img src={COMPANY_LOGO} alt="Company Logo" className="h-8 mr-2" />
          GS Tech Groups LLC
        </a>

        {/* Navbar Links */}
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
      </div>
    </nav>
  );
};

export default Navbar;
