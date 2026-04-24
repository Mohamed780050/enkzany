"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
  viewOnce?: boolean;
}

export function SlideUp({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  yOffset = 30,
  viewOnce = true,
}: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: viewOnce, margin: "-50px" }}
      transition={{ duration, delay, type: "spring", stiffness: 100, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
