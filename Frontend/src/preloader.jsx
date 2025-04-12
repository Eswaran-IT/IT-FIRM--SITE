import React from "react";

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Rotating Circle with Colorful Arcs */}
        <div className="w-16 h-16 border-4 border-transparent rounded-full animate-spin">
          <div className="w-full h-full border-t-4 border-blue-500 absolute top-0 left-0 rounded-full"></div>
          <div className="w-full h-full border-r-4 border-yellow-400 absolute top-0 left-0 rounded-full"></div>
          <div className="w-full h-full border-b-4 border-red-500 absolute top-0 left-0 rounded-full"></div>
          <div className="w-full h-full border-l-4 border-green-500 absolute top-0 left-0 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
