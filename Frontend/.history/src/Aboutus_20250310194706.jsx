import React from "react";
import Lottie from "lottie-react";

// Import your Lottie animation JSON files
import consultingAnimation from "./assets/consulting.json";
import cloudAnimation from "./assets/cloud.json";
import businessSystemAnimation from "./assets/business-system.json";
import headPuzzleAnimation from "./assets/head-puzzle.json";
import securityAnimation from "./assets/security.json";

// Icon Component
function AnimatedIcons() {
  const icons = [
    { name: "Consulting", animation: consultingAnimation },
    { name: "Cloud", animation: cloudAnimation },
    { name: "Business System", animation: businessSystemAnimation },
    { name: "Head Puzzle", animation: headPuzzleAnimation },
    { name: "Security", animation: securityAnimation },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {icons.map((icon, index) => (
        <div key={index} className="text-center">
          <Lottie animationData={icon.animation} loop={true} style={{ height: 100 }} />
          <p className="mt-2 font-semibold">{icon.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Aboutus;
