import { motion } from "framer-motion";
import type { FC, ReactNode } from "react";

interface IButtonFormProps {
  children: ReactNode;
}

export const ButtonForm: FC<IButtonFormProps> = ({ children }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.4,
        duration: 0.4,
        ease: "easeOut",
      }}
      className="block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl
                shadow-md hover:bg-blue-700 hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                select-none"
      type="submit"
    >
      {children}
    </motion.button>
  );
};
