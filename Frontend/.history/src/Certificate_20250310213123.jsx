import React from "react";
import C1 from "./assets/C1.png";
import C2 from "./assets/C2.png";

const Certificate = () => {
  return (
    <section data-section="certificates" className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Certifications
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {[C1, C2].map((cert, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={cert}
                alt={`Certificate ${index + 1}`}
                className="h-32 sm:h-40 md:h-48 lg:h-56 w-auto object-contain shadow-md rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificate;
