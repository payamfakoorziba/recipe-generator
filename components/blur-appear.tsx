"use client";

import { motion } from "framer-motion";

const BlurAppear = ({
  children,
  duration,
  staggerDelay,
  delay,
}: {
  children: string;
  duration?: number;
  staggerDelay?: number;
  delay?: number;
}) => {
  return (
    <>
      {children.split(" ").map((word, i) => {
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              delay: i * (staggerDelay || 0.1) + (delay || 0),
              duration: duration || 0.5,
              ease: "easeOut",
            }}
            className="inline-block"
          >
            {word}&nbsp;
          </motion.span>
        );
      })}
    </>
  );
};

export default BlurAppear;
