"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  className?: string;
  viewOnce?: boolean;
}

export function StaggerContainer({
  children,
  delayChildren = 0,
  staggerChildren = 0.1,
  className = "",
  viewOnce = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewOnce, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  yOffset = 20,
}: {
  children: ReactNode;
  className?: string;
  yOffset?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 20 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
