import React, { useRef } from "react";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Certificate from "./Certificate";
import Aboutus from "./Aboutus";
import Naics from "./Naics";
import Services from "./Services";
import Whyus from "./Whyus";
import PastExp from "./PastExp";
import Contact from "./Contact"; // Import the Contact component
import Footer from "./Footer";

function App() {
  // Refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const whyusRef = useRef(null);
  const pastExpRef = useRef(null);
  const contactRef = useRef(null); // Ref for contact section

  return (
    <>
      {/* Pass refs to Navbar for navigation */}
      <Navbar
        homeRef={homeRef}
        aboutRef={aboutRef}
        servicesRef={servicesRef}
        whyusRef={whyusRef}
        pastExpRef={pastExpRef}
        contactRef={contactRef}  // Pass contactRef here
      />

      {/* Sections with refs */}
      <section ref={homeRef} id="home">
        <Homepage />
      </section>
      <section ref={aboutRef} id="about">
        <Aboutus />
      </section>
      <section ref={servicesRef} id="services">
        <Services />
      </section>
      <section ref={whyusRef} id="whyus">
        <Whyus />
      </section>
      <section ref={pastExpRef} id="pastExp">
        <PastExp />
      </section>

      {/* Naics section (Not in Navbar) */}
      <section id="naics">
        <Naics />
      </section>
      <section id="certificate">
        <Certificate />
      </section>

      {/* Contact section before Footer */}
      <section ref={contactRef} id="contact">
        <Contact /> {/* Displaying the Contact component */}
      </section>

      {/* Footer Section */}
      <section id="footer">
        <Footer /> {/* Displaying the Footer component */}
      </section>
    </>
  );
}

export default App;
