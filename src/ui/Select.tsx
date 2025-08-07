import type { FC, ReactNode } from "react";
import { capitalize } from "../utils/capitalize";

interface ISelectProps {
  name: string;
  children: ReactNode;
}

export const Select: FC<ISelectProps> = ({ name, children }) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
      >
        {capitalize(name)}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          className="appearance-none w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-4 pr-10 text-sm text-gray-700 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-500">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
