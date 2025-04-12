import React, { useRef } from "react";
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

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const whyusRef = useRef(null);
  const pastExpRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null); // ✅ Add this

  // ✅ Scroll function
  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

      {/* ✅ Pass the scrollToFooter to Contact */}
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
