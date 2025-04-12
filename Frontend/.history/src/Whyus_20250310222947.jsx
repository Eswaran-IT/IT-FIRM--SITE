import React from "react";

const WhyUs = () => {
  const sections = [
    {
      id: 1,
      text: "Proven track record in delivering mission-critical IT solutions for public and private organizations."
    },
    {
      id: 2,
      text: "Client-focused approach with customized, scalable systems that drive growth and efficiency."
    },
    {
      id: 3,
      text: "Trusted partner for secure, innovative, and cost-effective digital transformation."
    },
    {
      id: 4,
      text: "Integrated expertise in cloud computing, cybersecurity, and AI for both government and private sector clients."
    },
    {
      id: 5,
      text: "Tailored, compliant solutions that prioritize security, scalability, and innovation across industries."
    },
    {
      id: 6,
      text: "Cost savings through optimized IT infrastructure, automation, and efficient resource allocation."
    },
    {
      id: 7,
      text: "Specialized knowledge in regulatory compliance (government) and competitive advantage (private sector)."
    }
  ];

  return (
    <section className="py-40 relative bg-black text-white">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Title and Description */}
        <div className="space-y-3 text-left">
          <h4 className="text-xl capitalize border-b-2 w-fit px-4" style={{ borderColor: "rgb(150, 246, 85)" }}>
            Why Us
          </h4>
          <h2 className="text-4xl font-bold">Why Choose GS Tech Groups LLC</h2>
          <p>
            GS TECH GROUPS LLC stands out by delivering reliable, cutting-edge solutions that empower both government
            agencies and private sector organizations to achieve their goals with confidence.
          </p>
        </div>

        {/* Points Section */}
        <div className="space-y-8 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.id} className="flex items-start gap-x-4 gap-y-8 w-full">
                <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-full shadow font-bold">
                  {section.id}
                </div>
                <div className="w-full">
                  <p className="text-xl font-bold">{section.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
