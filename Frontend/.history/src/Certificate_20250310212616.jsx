import React from "react";

const certificates = [
  { id: 1, src: "/assets/images/C1.png", alt: "Certificate 1" },
  { id: 2, src: "/assets/images/C2.png", alt: "Certificate 2" },
];

const Certificate = () => {
  return (
    <section data-section="certificates" className="bg-white py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Heading */}
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Certifications
        </h1>

        {/* Certificate Images */}
        <div className="mt-6 flex flex-wrap gap-6 justify-center">
          {certificates.map((cert) => (
            <picture key={cert.id} className="flex justify-center">
              <source srcSet={cert.src} type="image/webp" />
              <img
                src={cert.src}
                alt={cert.alt}
                className="h-24 w-auto object-contain"
              />
            </picture>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificate;
