import React from "react";

const Homepage = () => {
  return (
    <section
      data-section="hero"
      className="flex h-screen min-h-[600px] flex-col pt-24 duration-300 !pt-16"
    >
      <section className="flex grow">
        <div
          data-section="hero-bg-color"
          className="flex grow items-center bg-black/50"
        >
          <div className="container py-12">
            <div className="space-y-4" data-section="hero-subsection">
              {/* Welcome Text */}
              <h3
                className="text-xl capitalize"
                style={{
                  color: "white",
                  borderBottom: "2px solid rgb(150, 246, 85)",
                  width: "fit-content",
                  padding: "0px 1rem 0px 5px",
                }}
              >
                Welcome to
              </h3>

              {/* Company Name */}
              <div>
                <h1 className="text-4xl font-bold text-white">
                  GS Tech Groups LLC
                </h1>

                {/* UEI and CAGE Information */}
                <div className="flex gap-2 text-white">
                  <p className="uppercase text-sm">UEI: KET7DRM3BM85</p>
                  <p className="uppercase text-sm">CAGE: 0QXD9</p>
                </div>
              </div>

              {/* Description */}
              <p className="md:w-1/2 text-white">
                Welcome to GS Tech Groups LLC, a Service-Disabled Veteran-Owned
                Small Business (SDVOSB) based in El Paso, TX, specializing in
                cloud computing, cybersecurity, and artificial intelligence. We
                are dedicated to providing innovative, secure, and scalable IT
                solutions that help federal agencies meet their mission-critical
                objectives with efficiency and compliance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Homepage;
