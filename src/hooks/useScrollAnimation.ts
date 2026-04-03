"use client";

import { useInView } from "react-intersection-observer";
import type { Variants } from "framer-motion";

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export function useScrollAnimation(threshold = 0.15) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  return { ref, inView };
}
