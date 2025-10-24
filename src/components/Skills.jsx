import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Cloud, Smartphone } from "lucide-react";

const skillsData = [
  { title: "Frontend", icon: <Code2 className="w-6 h-6" />, skills: ["React", "TypeScript", "Next.js", "Tailwind"] },
  { title: "Backend", icon: <Database className="w-6 h-6" />, skills: ["Node.js", "Express", "Postgres", "MongoDB"] },
  { title: "Cloud & DevOps", icon: <Cloud className="w-6 h-6" />, skills: ["AWS", "Docker", "K8s", "Terraform"] },
  { title: "Mobile", icon: <Smartphone className="w-6 h-6" />, skills: ["React Native", "Flutter", "PWA"] },
];

export default function Skills() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Technical Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {skillsData.map((cat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8 }} transition={{ duration: 0.4, delay: idx * 0.08 }} className={`card border border-base-300 shadow-lg bg-base-100 group`}>
            <div className="card-body items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white mb-3">
                {cat.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{cat.title}</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {cat.skills.map((s, i) => (
                  <motion.span key={i} whileHover={{ scale: 1.08, backgroundColor: "#a855f7", color: "#fff" }} className="px-3 py-1 rounded-full bg-base-200 border border-base-300 cursor-pointer text-sm">
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
