import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { PlusCircle } from "lucide-react";

export default function Blog({ user }) {
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", description: "", category: "" });

  useEffect(() => {
    fetchBlogs();
    if (user?.email === "noumaan.khatib@abc.com") setIsAdmin(true);
  }, [user]);

  const fetchBlogs = async () => {
    const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (!error) setPosts(data);
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.description || !newPost.category) return;

    const { error } = await supabase.from("blogs").insert([
      {
        title: newPost.title,
        description: newPost.description,
        category: newPost.category,
        date: new Date().toLocaleString("en-US", { month: "short", year: "numeric" }),
      },
    ]);

    if (!error) {
      setNewPost({ title: "", description: "", category: "" });
      fetchBlogs();
    }
  };

  return (
    <section id="blog" className="py-20 bg-base-100 min-h-screen flex flex-col items-center justify-center">
      <motion.h2
        className="text-4xl font-bold mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Blog
      </motion.h2>

      {isAdmin && (
        <motion.form
          onSubmit={handleAddPost}
          className="card bg-base-200 shadow-lg p-6 w-full max-w-lg mb-10 border border-base-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-indigo-500" /> Add New Blog
          </h3>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="input input-bordered w-full mb-3"
          />
          <textarea
            placeholder="Description"
            value={newPost.description}
            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
            className="textarea textarea-bordered w-full mb-3"
          />
          <input
            type="text"
            placeholder="Category"
            value={newPost.category}
            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            className="input input-bordered w-full mb-3"
          />
          <button type="submit" className="btn btn-primary w-full">
            Add Blog
          </button>
        </motion.form>
      )}

      {/* Blog Cards Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className="bg-base-200 border border-base-300 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {post.title}
            </h3>
            <p className="text-sm text-base-content/70 mb-3">{post.description}</p>
            <div className="flex justify-between items-center mt-4 text-sm">
              <span className="badge badge-outline">{post.category}</span>
              <span className="opacity-70">{post.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
