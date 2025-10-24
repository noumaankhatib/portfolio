import React, { useState } from "react";
import {
  Home,
  Info,
  Code,
  FolderGit2,
  Mail,
  BookOpenText,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../lib/AuthContext.jsx";

export default function Sidebar({ onNavigate, active }) {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user } = useAuth();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const menu = [
    { id: "hero", label: "Home", icon: <Home size={18} /> },
    { id: "about", label: "About", icon: <Info size={18} /> },
    { id: "skills", label: "Skills", icon: <Code size={18} /> },
    { id: "projects", label: "Projects", icon: <FolderGit2 size={18} /> },
    { id: "blog", label: "Blog", icon: <BookOpenText size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`bg-base-200 h-screen border-r border-base-300 flex flex-col p-3 sticky top-0 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* --- Header / Branding --- */}
      <div className="flex items-center justify-between mb-4 px-1">
        {!collapsed && (
          <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Nouman Khatib
          </h2>
        )}
        <button
          onClick={() => setCollapsed((s) => !s)}
          className="btn btn-ghost btn-circle btn-sm"
        >
          {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </button>
      </div>

      {/* --- Navigation --- */}
      <ul className="flex-1 space-y-2">
        {menu.map((item, index) => {
          const isActive = active === item.id;
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <button
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg"
                    : "hover:bg-base-300"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <motion.span whileHover={{ scale: 1.2 }}>
                  {item.icon}
                </motion.span>
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </button>
            </motion.li>
          );
        })}
      </ul>

      {/* --- Footer Section --- */}
      <div className="mt-auto flex items-center justify-between p-2 border-t border-base-300">
        {!collapsed && (
          <span className="text-xs text-base-content/70">
            {user ? `Hi, ${user.email.split("@")[0]}` : "Guest"}
          </span>
        )}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle btn-sm"
          title="Toggle Theme"
        >
          {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </motion.aside>
  );
}
