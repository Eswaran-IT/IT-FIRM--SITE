import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-800 py-3 shadow-lg"
          : "bg-gray-900 py-8"
      } text-white`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-xl font-bold">
          GS Tech Groups LLC
        </a>
        <ul className="hidden md:flex space-x-6">
          <li><a href="#" className="hover:text-gray-400">About Us</a></li>
          <li><a href="#" className="hover:text-gray-400">Services</a></li>
          <li><a href="#" className="hover:text-gray-400">Why Us</a></li>
          <li><a href="#" className="hover:text-gray-400">Past Performance</a></li>
          <li><a href="#" className="hover:text-gray-400">Capability Statement</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
