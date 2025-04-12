import React from "react";
const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
  

      {/* Main Content Section */}
      <main className="flex-grow flex justify-center items-center bg-gray-100 text-center py-20">
        <div className="max-w-2xl px-6">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to GS Tech Groups LLC</h1>
          <p className="mt-4 text-lg text-gray-600">
            We specialize in cloud computing, cybersecurity, and artificial intelligence, providing innovative IT solutions to help organizations meet their mission-critical objectives.
          </p>
          <p className="mt-8 text-xl text-gray-700">Your trusted partner for modern and secure IT infrastructure.</p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
