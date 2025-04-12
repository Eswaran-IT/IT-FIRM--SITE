import React from "react";

const certificates = [
  { id: 1, src: "./assets/C1.png", alt: "Certificate 1" },
  { id: 2, src: "./assets/C2.png", alt: "Certificate 2" },
];

const Certificate = () => {
  return (
    <section data-section="certificates" className="bg-white py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Heading */}
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Certifications
        </h1>

        {/* Certificate Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 place-items-center">
          {certificates.map((cert) => (
            <picture key={cert.id} className="flex justify-center items-center">
              <source srcSet={cert.src} type="image/webp" />
              <img
                src={cert.src}
                alt={cert.alt}
                className="h-36 md:h-44 lg:h-48 w-auto object-contain shadow-md rounded-lg mx-auto"
              />
            </picture>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificate;
