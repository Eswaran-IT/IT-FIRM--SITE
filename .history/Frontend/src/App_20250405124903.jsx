// src/App.js
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

// Tracking logic
import { trackSection, sendTrackingData } from "./UserTracker";

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const whyusRef = useRef(null);
  const pastExpRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
    trackSection("Footer");
  };

  useEffect(() => {
    const sectionRefs = [
      { name: "Home", ref: homeRef },
      { name: "About", ref: aboutRef },
      { name: "Services", ref: servicesRef },
      { name: "Why Us", ref: whyusRef },
      { name: "Past Experience", ref: pastExpRef },
      { name: "Contact", ref: contactRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sectionRefs.find((s) => s.ref.current === entry.target);
            if (section) trackSection(section.name);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    // Send data when user leaves
    window.addEventListener("beforeunload", sendTrackingData);

    return () => {
      window.removeEventListener("beforeunload", sendTrackingData);
    };
  }, []);

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
      <section id="naics"><Naics /></section>
      <section id="certificate"><Certificate /></section>
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
