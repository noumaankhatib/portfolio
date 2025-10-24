import React from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/profile.jpg"; // 👈 Replace with your image path

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-base-100 min-h-screen flex flex-col items-center justify-center"
    >
      <motion.h2
        className="text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">
        {/* Profile Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={profileImg}
            alt="Profile"
            className="w-64 h-64 object-cover rounded-2xl shadow-lg border border-base-300"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center md:text-left space-y-4"
        >
          <p className="text-lg leading-relaxed text-base-content/80">
            Hi! I’m <span className="font-semibold text-base-content">Nouman Khatib</span>, a
            passionate front-end developer who loves crafting visually appealing and highly
            interactive web experiences. I focus on delivering clean, performant, and
            user-friendly designs that bring ideas to life.
          </p>

          <p className="text-base leading-relaxed text-base-content/70">
            With experience in modern frameworks like <b>React</b>, <b>Vite</b>, <b>TailwindCSS</b>, and
            <b> Supabase</b>, I aim to build scalable and responsive applications with smooth
            UI animations and seamless user interactions.
          </p>

          <motion.div
            className="flex justify-center md:justify-start mt-6"
            whileHover={{ scale: 1.05 }}
          >
            <a
              href="#projects"
              className="btn btn-primary"
            >
              View My Work
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
