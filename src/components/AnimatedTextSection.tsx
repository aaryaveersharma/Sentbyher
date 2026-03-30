"use client";

import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

export default function AnimatedTextSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  // Transition from slightly darker gray (e.g. #333 / rgb(51,51,51)) to pure white (#ffffff)
  const color = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    ["#3f3f46", "#ffffff", "#ffffff", "#3f3f46"]
  );

  return (
    <div ref={ref} className={`min-h-[50vh] flex flex-col justify-center items-center py-24 ${className}`}>
      <motion.div
        style={{ color }}
        className="max-w-4xl text-center px-6 md:px-12 text-2xl md:text-4xl lg:text-5xl font-serif leading-relaxed md:leading-snug transition-colors duration-200"
      >
        {children}
      </motion.div>
    </div>
  );
}
