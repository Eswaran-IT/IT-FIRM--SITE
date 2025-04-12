import React from "react";

const certificates = [
  { id: 1, src: "./assets/C1.png", alt: "Certificate 1" },
  { id: 2, src: "/assets/C2.png", alt: "Certificate 2" },
];

const Certificate = () => {
  return (
    <section data-section="certificates" className="bg-white py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Heading */}
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Certifications
        </h1>

        {/* Certificate Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          {certificates.map((cert) => (
            <picture key={cert.id} className="flex justify-center">
              <source srcSet={cert.src} type="image/webp" />
              <img
                src={cert.src}
                alt={cert.alt}
                className="h-32 md:h-40 w-auto object-contain shadow-lg rounded-lg"
              />
            </picture>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificate;
