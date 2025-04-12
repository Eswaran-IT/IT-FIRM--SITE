import React from "react";
import AboutImg from "./assets/About.jpg"; 

const AboutUs = () => {
  return (
    <section
      data-section="about"
      className="py-24 bg-black"
      data-navigation="about:About Us"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col gap-8 sm:flex-row">
          {/* Image Section */}
          <div className="sm:w-1/2">
            <picture>
              <source srcSet={AboutImg} type="image/jpg" />
              <img
                src={AboutImg}
                alt="About Us"
                className="w-full h-auto rounded-lg object-cover object-center"
                style={{ maxHeight: "400px", width: "100%" }}
              />
            </picture>
          </div>

          {/* Text Section */}
          <div data-section="about-subsection" className="sm:w-1/2 text-white">
            <h3 className="text-xl capitalize border-b-2 border-green-400 mb-4 inline-block">
              About Us
            </h3>
            <h1 className="text-4xl font-bold mb-4">GS Tech Groups LLC</h1>
            <p className="text-lg leading-relaxed">
              GS Tech Groups LLC is a Service-Disabled Veteran-Owned Small
              Business (SDVOSB) and a trusted technology partner delivering
              innovative IT solutions to federal agencies and government
              organizations. We specialize in cloud computing, cybersecurity,
              and artificial intelligence, helping agencies modernize their IT
              environments while maintaining the highest standards of security,
              efficiency, and compliance. As a small business, our team brings
              deep expertise in secure cloud infrastructure, ensuring scalable,
              cost-effective, and regulatory-compliant solutions tailored to
              mission-critical operations. With a proactive approach to
              cybersecurity, we safeguard sensitive data and systems against
              evolving threats, enabling agencies to operate with confidence.
              Leveraging AI-driven insights, we streamline workflows, enhance
              decision-making, and drive operational efficiency. At GS Tech Groups
              LLC, we understand the complexities of federal IT requirements and
              are committed to delivering seamless, integrated, and resilient
              technology solutions. Our goal is to empower government agencies
              with the tools and expertise they need to achieve their missions with
              precision and reliability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
