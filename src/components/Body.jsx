import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";
import HeroSection from "./HeroSection";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Blog from "./Blog";
import Contact from "./Contact";

export default function Body() {
  const [activeSection, setActiveSection] = useState("hero");

  // Section references
  const sections = {
    hero: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    blog: useRef(null),
    contact: useRef(null),
  };

  // Check if section is visible
  const inView = Object.fromEntries(
    Object.entries(sections).map(([key, ref]) => [key, useInView(ref, { threshold: 0.3 })])
  );

  // Update active section dynamically
  React.useEffect(() => {
    const visible = Object.keys(inView).find((key) => inView[key]);
    if (visible) setActiveSection(visible);
  }, [inView]);

  // Scroll smoothly to section
  const handleNavigate = (id) => {
    sections[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Framer animation for section fade-in
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="flex min-h-screen bg-base-200">
      <Sidebar onNavigate={handleNavigate} active={activeSection} />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 space-y-32 overflow-y-auto scroll-smooth">
          <motion.section
            id="hero"
            ref={sections.hero}
            variants={sectionVariant}
            initial="hidden"
            animate={inView.hero ? "visible" : "hidden"}
          >
            <HeroSection />
          </motion.section>

          <motion.section
            id="about"
            ref={sections.about}
            variants={sectionVariant}
            initial="hidden"
            animate={inView.about ? "visible" : "hidden"}
          >
            <About />
          </motion.section>

          <motion.section
            id="skills"
            ref={sections.skills}
            variants={sectionVariant}
            initial="hidden"
            animate={inView.skills ? "visible" : "hidden"}
          >
            <Skills />
          </motion.section>

          <motion.section
            id="projects"
            ref={sections.projects}
            variants={sectionVariant}
            initial="hidden"
            animate={inView.projects ? "visible" : "hidden"}
          >
            <Projects />
          </motion.section>

          <motion.section
            id="blog"
            ref={sections.blog}
            variants={sectionVariant}
            initial="hidden"
            animate={inView.blog ? "visible" : "hidden"}
          >
            <Blog />
          </motion.section>

          <motion.section
            id="contact"
            ref={sections.contact}
            variants={sectionVariant}
            initial="hidden"
            animate={inView.contact ? "visible" : "hidden"}
          >
            <Contact />
          </motion.section>
        </main>
      </div>
    </div>
  );
}
