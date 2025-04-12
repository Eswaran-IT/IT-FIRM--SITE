import React, { useState, useEffect } from "react";
import Preloader from "./preloader";
import mainVideo from "./assets/Main.mp4"; // Import the video

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Preloader for 2 seconds

    // Generate bubbles when the page loads
    const generateBubbles = () => {
      const newBubbles = Array.from({ length: 20 }).map(() => ({
        id: Math.random(),
        size: Math.random() * 10 + 5, // Random size between 5px to 15px
        left: Math.random() < 0.5 ? Math.random() * 10 + 2 : 90 + Math.random() * 10, // Left/Right corner
        duration: Math.random() * 5 + 3, // Speed variation
        color: `hsl(${Math.random() * 360}, 100%, 70%)`, // Random color
      }));
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <section data-section="hero" className="relative flex h-screen min-h-[600px] flex-col pt-24 duration-300 bg-cover bg-center transition-transform">
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={mainVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Animated Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="bubble"
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

      <section className="relative flex grow items-center transition-all duration-700">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="space-y-6 max-w-2xl">
            {/* Welcome Text with Flash & 3D Glow */}
            <h3 className="text-xl capitalize text-white border-l-4 pl-4 border-green-400 
                welcome-text animate-3d-glow">
              Welcome to
            </h3>

            {/* Company Name with Glowing Hover Effect */}
            <div>
              <h1 className="text-4xl font-bold text-white md:text-5xl 
                  glow-text hover:glow-hover transition-all duration-500">
                GS Tech Groups LLC
              </h1>

              <div className="flex gap-6 text-white mt-2">
                <p className="uppercase text-sm transition-transform duration-300 hover:scale-105 hover:text-green-400">
                  UEI: KET7DRM3BM85
                </p>
                <p className="uppercase text-sm transition-transform duration-300 hover:scale-105 hover:text-green-400">
                  CAGE: 0QXD9
                </p>
              </div>
            </div>

            {/* Glowing Description Box */}
            <div className="description-box relative p-6 bg-black/50 text-white border-2 border-green-400 rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-green-500">
              <p className="text-lg leading-relaxed">
                GS Tech Groups LLC specializes in cloud computing, cybersecurity, and artificial intelligence. We provide federal agencies with secure, scalable, and innovative IT solutions. As a Service-Disabled Veteran-Owned Small Business (SDVOSB) based in El Paso, TX, we assist in achieving mission-critical objectives efficiently and compliantly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Homepage;
