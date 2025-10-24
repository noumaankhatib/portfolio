// import React from "react";
// import { ArrowRight, Rocket } from "lucide-react";

// export default function HeroSection() {
//   return (
//     <section className="flex flex-col items-center justify-center text-center py-20 px-4">
//       <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-transparent bg-clip-text leading-tight">
//         Full Stack Developer.
//       </h1>
//         (nodejs + react)
//       <p className="max-w-2xl text-lg text-base-content/70 mb-8">
//         Full Stack Developer with 8+ years of experience specializing in Node.js and modern web technologies. Proven track record in
//         designing and delivering **highly scalable, distributed systems that hand 100M+ daily reque . Skilled in debugging, optimizing, and
//         maintaining large-scale applications with a focus  performance, reliability, and system efficie . Proficient in leveraging the right
//         tools and monitoring techniques to ensure seamless system operations. Recognized for big-picture mind , rapid learning ability, and a
//         pragmatic approach to solving complex technical challenges with simplicity and precision.
//       </p>

//       <div className="flex gap-4">
//         <button className="btn btn-primary gap-2">
//           <Rocket className="w-4 h-4" /> View Projects
//         </button>
//         <button className="btn btn-outline gap-2">
//           <ArrowRight className="w-4 h-4" /> Get in Touch
//         </button>
//       </div>
//     </section>
//   );
// }


import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Building Digital Experiences That Matter
        </h1>
        <p className="text-lg text-base-content/75 mb-8">
          I design and build scalable web applications using modern tools — React, Tailwind, Supabase and more.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="btn btn-primary bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            View Projects
          </button>
          <button className="btn btn-outline">Get in touch</button>
        </div>
      </motion.div>
    </div>
  );
}
