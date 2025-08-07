import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface IAnimatedSelectProps {
  children: ReactNode;
}

export const AnimatedSelect: FC<IAnimatedSelectProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-xs"
    >
      {children}
    </motion.div>
  );
};
