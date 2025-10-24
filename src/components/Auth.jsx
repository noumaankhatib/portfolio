import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import { motion, AnimatePresence } from "framer-motion";

export default function Auth({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMode, setLoginMode] = useState(true);
  const [status, setStatus] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Processing...");
    if (loginMode) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setStatus(error.message);
      else { setStatus("Logged in"); onClose(); }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setStatus(error.message);
      else setStatus("Signup success — check email for confirm");
    }
  }

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } });
    if (error) setStatus(error.message);
  }

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="bg-base-100 p-6 rounded-2xl shadow-xl w-full max-w-md" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
          <h3 className="text-xl font-semibold mb-4 text-center">{loginMode ? "Login" : "Sign Up"}</h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input className="input input-bordered w-full" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="input input-bordered w-full" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className="btn w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">{loginMode ? "Login" : "Sign Up"}</button>
          </form>

          <div className="divider">OR</div>

          <div className="flex gap-2">
            <button onClick={handleGoogle} className="btn btn-outline w-full">Continue with Google</button>
          </div>

          <p className="text-center mt-3">
            {loginMode ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setLoginMode((s) => !s)} className="link link-primary">{loginMode ? "Sign Up" : "Login"}</button>
          </p>

          <div className="mt-4 text-right">
            <button onClick={onClose} className="btn btn-ghost">Close</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
