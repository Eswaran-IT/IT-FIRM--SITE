import React, { useState, useEffect } from "react";
import Preloader from "./preloader";
import mainVideo from "./assets/Main.mp4";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const generateBubbles = () => {
      const newBubbles = Array.from({ length: 20 }).map(() => ({
        id: Math.random(),
        size: Math.random() * 10 + 5,
        left: Math.random() < 0.5 ? Math.random() * 10 + 2 : 90 + Math.random() * 10,
        duration: Math.random() * 5 + 3,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      }));
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <section
      data-section="hero"
      className="relative flex h-screen min-h-[600px] flex-col justify-center bg-cover bg-center transition-transform"
    >
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={mainVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="bubble absolute bottom-0 rounded-full opacity-80 animate-bubble"
            style={{
              left: `${bubble.left}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              backgroundColor: bubble.color,
              animationDuration: `${bubble.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <section className="relative flex grow items-center py-8 md:py-10">
        <div className="container mx-auto max-w-5xl px-4 text-white space-y-6">
          {/* Welcome */}
          <h3 className="text-xl border-l-4 border-green-400 pl-4 animate-3d-glow">
            Welcome to
          </h3>

          {/* Company Name */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold glow-text hover:glow-hover transition-all duration-500">
              GS Tech Groups
            </h1>
            <div className="flex gap-6 mt-2 text-sm uppercase">
              <p className="transition-transform duration-300 hover:scale-105 hover:text-green-400">
                UEI: KET7DRM3BM85
              </p>
              <p className="transition-transform duration-300 hover:scale-105 hover:text-green-400">
                CAGE: 0QXD9
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="description-box bg-black/60 border-2 border-green-400 p-5 rounded-lg shadow-lg transition hover:scale-105 hover:shadow-green-500">
            <p className="text-lg leading-relaxed">
              GS Tech Groups specializes in cloud computing, cybersecurity, and artificial intelligence.
              We provide federal agencies with secure, scalable, and innovative IT solutions. As a
              Service-Disabled Veteran-Owned Small Business (SDVOSB) based in El Paso, TX, we assist in
              achieving mission-critical objectives efficiently and compliantly.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Homepage;
