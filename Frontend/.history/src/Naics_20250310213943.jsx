import React from "react";

const naicsList = [
  { code: "518210", description: "Data Processing Hosting and Related Services" },
  { code: "541511", description: "Custom Computer Programming Services" },
  { code: "541519", description: "Other Computer Related Services" },
  { code: "541513", description: "Computer Facilities Management Services" },
  { code: "541512", description: "Computer Systems Design Services" },
];

const Naics = () => {
  return (
    <section
      data-section="code-list"
      className="py-24 bg-white border-t-2 border-green-400"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="space-y-6">
          {/* NAICS Section Title */}
          <div>
            <h3 className="text-2xl capitalize font-bold border-b-2 inline-block border-green-400 text-black mb-6">
              NAICS
            </h3>
          </div>

          {/* NAICS List */}
          <div className="space-y-4">
            {naicsList.map((item, index) => (
              <div
                key={index}
                className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4"
              >
                <p className="whitespace-nowrap overflow-x-hidden text-ellipsis text-black w-full">
                  <span className="font-bold text-black">{item.code}:</span>
                  <span> {item.description}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Naics;
