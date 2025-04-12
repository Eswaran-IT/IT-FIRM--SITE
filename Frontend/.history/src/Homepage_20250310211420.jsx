import React from 'react';

const Homepage = () => {
  return (
    <section className="flex grow">
      <div
        data-section="hero-bg-color"
        className="flex grow items-center bg-black/50"
      >
        <div className="container py-12">
          <div className="space-y-4" data-section="hero-subsection">
            <h3
              className="text-xl capitalize"
              style={{
                color: 'white',
                borderBottom: '2px solid rgb(150, 246, 85)',
                width: 'fit-content',
                padding: '0px 1rem 0px 5px',
              }}
            >
              welcome to
            </h3>
            <div>
              <h1 className="text-4xl font-bold" style={{ color: 'white' }}>
                GS Tech Groups LLC
              </h1>
              <div className="flex gap-2" style={{ color: 'white' }}>
                <p className="uppercase text-sm">uei: KET7DRM3BM85</p>
                <p className="uppercase text-sm">cage: 0QXD9</p>
              </div>
            </div>
            <p className="md:w-1/2" style={{ color: 'white' }}>
              Welcome to GS Tech Groups LLC, a Service-Disabled Veteran-Owned
              Small Business (SDVOSB) based in El Paso, TX, specializing in cloud
              computing, cybersecurity, and artificial intelligence. We are
              dedicated to providing innovative, secure, and scalable IT solutions
              that help federal agencies meet their mission-critical objectives
              with efficiency and compliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
