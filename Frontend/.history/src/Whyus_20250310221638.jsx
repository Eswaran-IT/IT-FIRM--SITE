import React from "react";

const WhyUs = () => {
  return (
    <section className="py-40 relative bg-black text-white">
      <div className="container space-y-3 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
        <div className="space-y-1 text-center">
          <h4 className="text-xl capitalize border-b-2 w-fit px-4" style={{ borderColor: "rgb(150, 246, 85)" }}>
            Why Us
          </h4>
          <h2 className="text-4xl font-bold">Why Choose GS Tech Groups LLC</h2>
          <p>
            GS TECH GROUPS LLC stands out by delivering reliable, cutting-edge solutions that empower both government
            agencies and private sector organizations to achieve their goals with confidence.
          </p>
        </div>

        <div className="space-y-8 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
            <div className="flex items-start gap-x-4 gap-y-8 w-full justify-center">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-full shadow font-bold">
                1
              </div>
              <div className="w-full text-center">
                <p className="text-xl font-bold">Proven track record in delivering mission-critical IT solutions for public and private organizations.</p>
              </div>
            </div>

            <div className="flex items-start gap-x-4 gap-y-8 w-full justify-center">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-full shadow font-bold">
                2
              </div>
              <div className="w-full text-center">
                <p className="text-xl font-bold">Client-focused approach with customized, scalable systems that drive growth and efficiency.</p>
              </div>
            </div>

            <div className="flex items-start gap-x-4 gap-y-8 w-full justify-center">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-full shadow font-bold">
                3
              </div>
              <div className="w-full text-center">
                <p className="text-xl font-bold">Trusted partner for secure, innovative, and cost-effective digital transformation.</p>
              </div>
            </div>

            <div className="flex items-start gap-x-4 gap-y-8 w-full justify-center">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-full shadow font-bold">
                4
              </div>
              <div className="w-full text-center">
                <p className="text-xl font-bold">Integrated expertise in cloud computing, cybersecurity, and AI for both government and private sector clients.</p>
              </div>
            </div>

            <div className="flex items-start gap-x-4 gap-y-8 w-full justify-center">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-full shadow font-bold">
                5
              </div>
              <div className="w-full text-center">
                <p className="text-xl font-bold">Tailored, compliant solutions that prioritize security, scalability, and innovation across industries.</p>
              </div>
            </div>

            <div className="flex items-start gap-x-4 gap-y-8 w-full justify-center">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-full shadow font-bold">
                6
              </div>
              <div className="w-full text-center">
                <p className="text-xl font-bold">Cost savings through optimized IT infrastructure, automation, and efficient resource allocation.</p>
              </div>
            </div>

            <div className="flex items-start gap-x-4 gap-y-8 w-full justify-center">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-full shadow font-bold">
                7
              </div>
              <div className="w-full text-center">
                <p className="text-xl font-bold">Specialized knowledge in regulatory compliance (government) and competitive advantage (private sector).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
