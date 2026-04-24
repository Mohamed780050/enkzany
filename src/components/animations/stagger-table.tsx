"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function StaggerTableBody({
  children,
  delayChildren = 0,
  staggerChildren = 0.1,
  className = "",
  viewOnce = true,
}: {
  children: ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  className?: string;
  viewOnce?: boolean;
}) {
  return (
    <motion.tbody
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
    </motion.tbody>
  );
}

export function StaggerTableRow({
  children,
  className = "",
  yOffset = 20,
}: {
  children: ReactNode;
  className?: string;
  yOffset?: number;
}) {
  return (
    <motion.tr
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
    </motion.tr>
  );
}
