import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setStatus("⚠️ Please fill out all fields.");
      setLoading(false);
      return;
    }

    // ✅ Save to Supabase
    const { error } = await supabase.from("contacts").insert([{ name, email, message }]);

    if (error) {
      console.error(error);
      setStatus("❌ Something went wrong. Try again later.");
    } else {
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });

      // ✅ Optional: Send Email Notification via Supabase Edge Function
      await fetch(`${import.meta.env.VITE_SUPABASE_FUNCTION_URL}/sendEmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-base-100 min-h-screen flex flex-col items-center justify-center"
    >
      <motion.h2
        className="text-4xl font-bold mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Me
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="card bg-base-200 shadow-lg border border-base-300 w-full max-w-lg p-8 rounded-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium text-base-content">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Your Name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-base-content">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-base-content">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-32"
            placeholder="Your message here..."
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {loading ? "Sending..." : "Send Message"}
        </motion.button>

        {status && (
          <p className="mt-4 text-center text-sm text-base-content/80">{status}</p>
        )}
      </motion.form>
    </section>
  );
}
