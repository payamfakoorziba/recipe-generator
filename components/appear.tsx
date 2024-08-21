"use client";

import {
  motion,
  useInView,
  useAnimation,
  Variants,
  Transition,
} from "framer-motion";
import { useEffect, useRef } from "react";

const Appear = ({
  children,
  variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  transition = { delay: 0.25, duration: 0.3 },
  className,
}: {
  children?: React.ReactNode;
  variants?: Variants & { hidden: any; visible: any };
  transition?: Transition;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial={"hidden"}
      animate={controls}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Appear;
