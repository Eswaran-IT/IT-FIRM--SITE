import React from 'react';

const PastExp = () => {
  return (
    <div>
      <section data-section="section-list">
        <div data-section="section-list-subsection">
          <section
            data-section="services"
            className="py-40 relative"
            data-navigation="services:Services"
            style={{ color: 'black', backgroundColor: 'whitesmoke' }}
          >
            <div
              className="absolute z-10 w-full h-full bg-center bg-cover top-0 md:w-1/2 md:h-full opacity-15"
              style={{ backgroundImage: 'url("assets/images/background/services.webp")', right: '0px' }}
            ></div>
            <div className="container space-y-3 relative z-20">
              <div className="text-center space-y-1">
                <h4 className="text-xl capitalize border-b-2 w-fit mx-auto px-4" style={{ borderColor: 'rgb(150, 246, 85)' }}>
                  Services
                </h4>
                <h2 className="text-4xl font-bold">Our Services Offerings Include</h2>
              </div>
              <p className="text-center"></p>
              <div className="flex gap-x-4 gap-y-8 pt-8 flex-wrap justify-center">
                <div
                  className="w-[300px] relative px-4 pt-5 pb-3 bg-white rounded-lg shadow border-l-4 border-b-4 space-y-1 item"
                  style={{ borderColor: 'rgb(150, 246, 85)' }}
                >
                  <div className="absolute -top-5 left-5 px-1 py-1 h-10 w-10 rounded flex items-center justify-center" style={{ backgroundColor: 'rgb(150, 246, 85)' }}>
                    <picture>
                      <source srcSet="assets/images/icon/cloud.webp" />
                      <img className="w-auto h-[20px]" style={{ filter: 'none' }} />
                    </picture>
                  </div>
                  <h3 className="text-xl font-bold">Cloud Computing &amp; Infrastructure</h3>
                  <ul className="list-disc pl-5"></ul>
                </div>
                <div
                  className="w-[300px] relative px-4 pt-5 pb-3 bg-white rounded-lg shadow border-l-4 border-b-4 space-y-1 item"
                  style={{ borderColor: 'rgb(150, 246, 85)' }}
                >
                  <div className="absolute -top-5 left-5 px-1 py-1 h-10 w-10 rounded flex items-center justify-center" style={{ backgroundColor: 'rgb(150, 246, 85)' }}>
                    <picture>
                      <source srcSet="assets/images/icon/security-1.webp" />
                      <img className="w-auto h-[20px]" style={{ filter: 'none' }} />
                    </picture>
                  </div>
                  <h3 className="text-xl font-bold">Cybersecurity &amp; Compliance Solutions</h3>
                  <ul className="list-disc pl-5"></ul>
                </div>
                <div
                  className="w-[300px] relative px-4 pt-5 pb-3 bg-white rounded-lg shadow border-l-4 border-b-4 space-y-1 item"
                  style={{ borderColor: 'rgb(150, 246, 85)' }}
                >
                  <div className="absolute -top-5 left-5 px-1 py-1 h-10 w-10 rounded flex items-center justify-center" style={{ backgroundColor: 'rgb(150, 246, 85)' }}>
                    <picture>
                      <source srcSet="assets/images/icon/head-puzzle.webp" />
                      <img className="w-auto h-[20px]" style={{ filter: 'none' }} />
                    </picture>
                  </div>
                  <h3 className="text-xl font-bold">Artificial Intelligence &amp; Data Analytics</h3>
                  <ul className="list-disc pl-5"></ul>
                </div>
                <div
                  className="w-[300px] relative px-4 pt-5 pb-3 bg-white rounded-lg shadow border-l-4 border-b-4 space-y-1 item"
                  style={{ borderColor: 'rgb(150, 246, 85)' }}
                >
                  <div className="absolute -top-5 left-5 px-1 py-1 h-10 w-10 rounded flex items-center justify-center" style={{ backgroundColor: 'rgb(150, 246, 85)' }}>
                    <picture>
                      <source srcSet="assets/images/icon/business-systems.webp" />
                      <img className="w-auto h-[20px]" style={{ filter: 'none' }} />
                    </picture>
                  </div>
                  <h3 className="text-xl font-bold">IT Automation &amp; Process Optimization</h3>
                  <ul className="list-disc pl-5"></ul>
                </div>
                <div
                  className="w-[300px] relative px-4 pt-5 pb-3 bg-white rounded-lg shadow border-l-4 border-b-4 space-y-1 item"
                  style={{ borderColor: 'rgb(150, 246, 85)' }}
                >
                  <div className="absolute -top-5 left-5 px-1 py-1 h-10 w-10 rounded flex items-center justify-center" style={{ backgroundColor: 'rgb(150, 246, 85)' }}>
                    <picture>
                      <source srcSet="assets/images/icon/consulting-1.webp" />
                      <img className="w-auto h-[20px]" style={{ filter: 'none' }} />
                    </picture>
                  </div>
                  <h3 className="text-xl font-bold">Secure API Integration &amp; IT Consulting</h3>
                  <ul className="list-disc pl-5"></ul>
                </div>
                <div
                  className="w-[300px] relative px-4 pt-5 pb-3 bg-white rounded-lg shadow border-l-4 border-b-4 space-y-1 item"
                  style={{ borderColor: 'rgb(150, 246, 85)' }}
                >
                  <div className="absolute -top-5 left-5 px-1 py-1 h-10 w-10 rounded flex items-center justify-center" style={{ backgroundColor: 'rgb(150, 246, 85)' }}>
                    <picture>
                      <source srcSet="assets/images/icon/business-systems.webp" />
                      <img className="w-auto h-[20px]" style={{ filter: 'none' }} />
                    </picture>
                  </div>
                  <h3 className="text-xl font-bold">Helpdesk</h3>
                  <ul className="list-disc pl-5"></ul>
                </div>
              </div>
              <p className="text-center text-md !mt-8"></p>
            </div>
          </section>
          <section
            data-section="why-us"
            className="py-40 relative"
            data-navigation="why-us:Why Us"
            style={{ color: 'white', backgroundColor: 'black' }}
          >
            <div className="container space-y-3">
              <div className="space-y-1">
                <h4 className="text-xl capitalize border-b-2 w-fit px-4" style={{ borderColor: 'rgb(150, 246, 85)' }}>
                  Why Us
                </h4>
                <h2 className="text-4xl font-bold">Why Choose GS Tech Groups LLC</h2>
                <p>
                  GS TECH GROUPS LLC stands out by delivering reliable, cutting-edge solutions that empower both government agencies and private sector organizations to achieve their goals with confidence.
                </p>
                <div>
                  <div className="space-y-8 mt-8">
                    <div className="relative flex gap-x-4 gap-y-8 after:content-[''] after:bg-white after:h-full after:left-4 after:absolute after:top-[2rem] after:w-[1px] last-of-type:after:hidden item">
                      <div className="rounded-full w-8 h-8 bg-white shadow flex items-center justify-center font-bold text-black">1</div>
                      <div className="w-[calc(100%-4rem)]">
                        <div className="flex gap-2 items-center">
                          <p className="text-xl font-bold">Proven track record in delivering mission-critical IT solutions for public and private organizations.</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex gap-x-4 gap-y-8 after:content-[''] after:bg-white after:h-full after:left-4 after:absolute after:top-[2rem] after:w-[1px] last-of-type:after:hidden item">
                      <div className="rounded-full w-8 h-8 bg-white shadow flex items-center justify-center font-bold text-black">2</div>
                      <div className="w-[calc(100%-4rem)]">
                        <div className="flex gap-2 items-center">
                          <p className="text-xl font-bold">Client-focused approach with customized, scalable systems that drive growth and efficiency.</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex gap-x-4 gap-y-8 after:content-[''] after:bg-white after:h-full after:left-4 after:absolute after:top-[2rem] after:w-[1px] last-of-type:after:hidden item">
                      <div className="rounded-full w-8 h-8 bg-white shadow flex items-center justify-center font-bold text-black">3</div>
                      <div className="w-[calc(100%-4rem)]">
                        <div className="flex gap-2 items-center">
                          <p className="text-xl font-bold">Trusted partner for secure, innovative, and cost-effective digital transformation.</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex gap-x-4 gap-y-8 after:content-[''] after:bg-white after:h-full after:left-4 after:absolute after:top-[2rem] after:w-[1px] last-of-type:after:hidden item">
                      <div className="rounded-full w-8 h-8 bg-white shadow flex items-center justify-center font-bold text-black">4</div>
                      <div className="w-[calc(100%-4rem)]">
                        <div className="flex gap-2 items-center">
                          <p className="text-xl font-bold">Integrated expertise in cloud computing, cybersecurity, and AI for both government and private sector clients.</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex gap-x-4 gap-y-8 after:content-[''] after:bg-white after:h-full after:left-4 after:absolute after:top-[2rem] after:w-[1px] last-of-type:after:hidden item">
                      <div className="rounded-full w-8 h-8 bg-white shadow flex items-center justify-center font-bold text-black">5</div>
                      <div className="w-[calc(100%-4rem)]">
                        <div className="flex gap-2 items-center">
                          <p className="text-xl font-bold">Commitment to exceptional customer service, ensuring full client satisfaction throughout every project.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default PastExp;
