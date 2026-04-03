"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeUpVariants, useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollReveal({ children, className }: ScrollRevealProps) {
  const { ref, inView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={fadeUpVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
