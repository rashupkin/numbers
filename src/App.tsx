import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Select } from "./ui/Select";
import { BoxText } from "./ui/BoxText";
import { motion } from "framer-motion";
import { ButtonForm } from "./ui/ButtonForm";
import { AnimatedSelect } from "./ui/AnimatedSelect";

const API = "http://numbersapi.com/";

export default function App() {
  const [number, setNumber] = useState("");
  const [text, setText] = useState("Here will be text...");
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    const fullText = text;
    indexRef.current = 0;

    setDisplayedText("");

    const interval = setInterval(() => {
      const currentIndex = indexRef.current;

      if (currentIndex < fullText.length) {
        setDisplayedText((prev) => prev + fullText[currentIndex]);

        indexRef.current += 1;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/[^0-9/]/.test(value)) {
      setText("Please enter only digits and '/'");

      return;
    }

    setNumber(e.target.value);
  };

  const handler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const select = form.querySelector("select");

    if (!select) return;

    let res = null;

    switch (select.name) {
      case "category":
        if (!number) {
          setText("Please enter number");

          return;
        }

        res = await fetch(`${API}${number}/${select.value}?json`);

        break;
      case "random":
        res = await fetch(`${API}${select.value}?json`);

        break;
    }

    if (!res || !res.ok) {
      setText("Something went wrong. Please try again.");

      return;
    }

    const resJSON = await res?.json();

    setText(resJSON.text);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-slate-200 dark:bg-neutral-900 transition-colors">
      <div className="w-full max-w-5xl flex flex-col gap-12">
        <BoxText text={displayedText} />

        <div className="flex flex-col lg:flex-row gap-12 w-full">
          <form
            onSubmit={handler}
            className="flex flex-col gap-6 w-full lg:w-2/3"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              <label
                htmlFor="number"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
              >
                Enter Number
              </label>
              <input
                id="number"
                onChange={handleNumber}
                value={number}
                type="text"
                placeholder="e.g. 42"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </motion.div>

            <AnimatedSelect>
              <Select name="category">
                <option value="math">📐 Math</option>
                <option value="trivia">❓ Trivia</option>
                <option value="date">📅 Date</option>
              </Select>
            </AnimatedSelect>

            <ButtonForm>Get answer</ButtonForm>
          </form>

          <form
            onSubmit={handler}
            className="flex flex-col gap-6 w-full lg:w-1/3"
          >
            <AnimatedSelect>
              <Select name="random">
                <option value="random/trivia">🎲 Trivia</option>
                <option value="random/year">📆 Year</option>
                <option value="random/date">📅 Date</option>
                <option value="random/math">➕ Math</option>
              </Select>
            </AnimatedSelect>

            <ButtonForm>Get answer</ButtonForm>
          </form>
        </div>
      </div>
    </div>
  );
}
