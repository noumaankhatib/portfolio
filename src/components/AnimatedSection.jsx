import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
