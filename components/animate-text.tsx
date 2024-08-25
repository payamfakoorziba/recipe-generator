"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimateText = ({ children }: { children?: string }) => {
  const [parts, setParts] = useState<string[]>([]);

  useEffect(() => {
    if (!children) return;
    setParts(children.split(" "));
  }, [children]);

  return (
    <>
      {parts.map((part, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
        >
          {part}{" "}
        </motion.span>
      ))}
    </>
  );
};

export default AnimateText;
