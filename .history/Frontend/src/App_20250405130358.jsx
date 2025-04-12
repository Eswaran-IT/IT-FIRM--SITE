import React, { useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Certificate from "./Certificate";
import Aboutus from "./Aboutus";
import Naics from "./Naics";
import Services from "./Services";
import Whyus from "./Whyus";
import PastExp from "./PastExp";
import Contact from "./Contact";
import Footer from "./Footer";

import { trackSection, sendTrackingData } from "./UserTracker";

function App() {
  // Refs for each section to track when they come into view
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const whyusRef = useRef(null);
  const pastExpRef = useRef(null);
  const naicsRef = useRef(null);
  const certificateRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
    trackSection("Footer");
  };

  useEffect(() => {
    // Define each section and its reference
    const sectionRefs = [
      { name: "Home", ref: homeRef },
      { name: "About", ref: aboutRef },
      { name: "Services", ref: servicesRef },
      { name: "Why Us", ref: whyusRef },
      { name: "Past Experience", ref: pastExpRef },
      { name: "Naics", ref: naicsRef },
      { name: "Certificate", ref: certificateRef },
      { name: "Contact", ref: contactRef },
      { name: "Footer", ref: footerRef }
    ];

    // Create an IntersectionObserver to track section visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sectionRefs.find((s) => s.ref.current === entry.target);
            if (section) trackSection(section.name);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    // Start observing each section
    sectionRefs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    // Send the tracking data when the user leaves the page
    window.addEventListener("beforeunload", sendTrackingData);

    // Cleanup observer and event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", sendTrackingData);
      observer.disconnect(); // Disconnect the observer
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      <Navbar
        homeRef={homeRef}
        aboutRef={aboutRef}
        servicesRef={servicesRef}
        whyusRef={whyusRef}
        pastExpRef={pastExpRef}
        contactRef={contactRef}
      />
      <section ref={homeRef} id="home"><Homepage /></section>
      <section ref={aboutRef} id="about"><Aboutus /></section>
      <section ref={servicesRef} id="services"><Services /></section>
      <section ref={whyusRef} id="whyus"><Whyus /></section>
      <section ref={pastExpRef} id="pastExp"><PastExp /></section>
      <section ref={naicsRef} id="naics"><Naics /></section>
      <section ref={certificateRef} id="certificate"><Certificate /></section>
      <section ref={contactRef} id="contact">
        <Contact scrollToFooter={scrollToFooter} />
      </section>
      <section ref={footerRef} id="footer">
        <Footer />
      </section>
    </>
  );
}

export default App;
