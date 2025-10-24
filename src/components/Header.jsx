import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Sun, Moon, LogIn, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // ✅ Fetch session and listen for auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data?.session?.user || null));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    document.documentElement.setAttribute("data-theme", theme);

    return () => listener.subscription.unsubscribe();
  }, []);

  // ✅ Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // ✅ Login with Supabase magic link (email)
  const handleLogin = async () => {
    const email = prompt("Enter your email for login:");
    if (!email) return;
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Check your email for the login link!");
  };

  // ✅ Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <motion.header
      className="navbar bg-base-100 border-b border-base-300 px-6 sticky top-0 z-50 shadow-sm"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left Section - Logo */}
      <div className="flex-1">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none">
          Portfolio
        </h1>
      </div>

      {/* Right Section - User + Theme + Auth */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
          {theme === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* User Auth Section */}
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {user.email.split("@")[0]}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-sm hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="btn btn-ghost btn-sm hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
          >
            <LogIn className="w-4 h-4 mr-1" /> Login
          </button>
        )}
      </div>
    </motion.header>
  );
}
