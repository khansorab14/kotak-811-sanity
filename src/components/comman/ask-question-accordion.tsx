"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface AskQuestionAccordionProps {
  askQuestions: {
    title: string;
    heading: string;
    accordions: {
      id: string;
      title: string;
      description: string;
    }[];
  };
}
const AskQuestionAccordion: React.FC<AskQuestionAccordionProps> = ({
  askQuestions = { title: "", heading: "", accordions: [] },
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!askQuestions || !askQuestions.accordions.length) {
    return <p className="text-center text-gray-500">No questions available.</p>;
  }

  return (
    <section className="flex flex-col items-center justify-center w-full py-12 px-6">
      {/* Centered Heading */}
      <div className="max-w-2xl text-center m-8">
        <h2 className="text-4xl md:text-5xl py-4 font-bold text-gray-900">
          {askQuestions.title}
        </h2>
        <p className="text-lg text-red-600 font-bold">{askQuestions.heading}</p>
      </div>

      {/* Accordion */}
      <div className="w-full max-w-2xl">
        {askQuestions.accordions.map((item, index) => (
          <div key={item.id} className="border-y-[1px] py-5 border-gray-300">
            <button
              className="w-full flex justify-between items-center py-4 text-left text-lg font-medium transition-all"
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              <span className="font-bold">{item.title}</span>
              <span
                className={`text-2xl transition-transform duration-300 ${
                  activeIndex === index
                    ? "rotate-45 text-red-500"
                    : "rotate-0 text-gray-500"
                }`}
              >
                +
              </span>
            </button>

            {/* Smooth Description Animation */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className="py-4 text-gray-700"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AskQuestionAccordion;
