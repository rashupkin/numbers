import type { FC } from "react";
import { motion } from "framer-motion";

interface IBoxTextProps {
  text: string;
}

export const BoxText: FC<IBoxTextProps> = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
      className="text-black dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-md p-4 rounded-xl h-50 font-mono"
    >
      <p className="text-base leading-relaxed whitespace-pre-wrap">
        {text}
        <span className="animate-pulse inline-block w-[8px] h-[18px] bg-gray-400 dark:bg-gray-600 ml-1 align-middle rounded-sm" />
      </p>
    </motion.div>
  );
};
