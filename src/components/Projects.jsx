import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { PlusCircle } from "lucide-react";

export default function Projects({ user }) {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tech: "",
  });

  useEffect(() => {
    fetchProjects();
    if (user?.email === "noumaan.khatib@abc.com") setIsAdmin(true);
  }, [user]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setProjects(data);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;

    const { error } = await supabase.from("projects").insert([
      {
        title: newProject.title,
        description: newProject.description,
        tech: newProject.tech,
      },
    ]);

    if (!error) {
      setNewProject({ title: "", description: "", tech: "" });
      fetchProjects();
    }
  };

  return (
    <section
      id="projects"
      className="py-20 bg-base-200 min-h-screen flex flex-col items-center justify-center"
    >
      <motion.h2
        className="text-4xl font-bold mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      {/* Admin Add Project Form */}
      {isAdmin && (
        <motion.form
          onSubmit={handleAddProject}
          className="card bg-base-100 shadow-lg p-6 w-full max-w-lg mb-10 border border-base-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-indigo-500" /> Add New Project
          </h3>
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            className="input input-bordered w-full mb-3"
          />
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="textarea textarea-bordered w-full mb-3"
          />
          <input
            type="text"
            placeholder="Tech Stack (comma separated)"
            value={newProject.tech}
            onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
            className="input input-bordered w-full mb-3"
          />
          <button type="submit" className="btn btn-primary w-full">
            Add Project
          </button>
        </motion.form>
      )}

      {/* Vertical Project Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {project.title}
            </h3>
            <p className="text-sm text-base-content/70 mb-3">{project.description}</p>
            <div className="text-xs text-base-content/60 italic">{project.tech}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
