"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How often should I service my car?",
    answer:
      "Regular servicing is generally recommended based on your vehicle manufacturer guidelines, mileage, and driving conditions.",
  },
  {
    question: "How long does a general service take?",
    answer:
      "The duration depends on your vehicle and the type of service required. Our team will provide an estimated completion time after inspection.",
  },
  {
    question: "Do you provide pickup and drop service?",
    answer:
      "Please contact our team to check the availability of pickup and drop services in your area.",
  },
  {
    question: "Do you use quality spare parts?",
    answer:
      "We focus on using reliable and quality parts suitable for your vehicle requirements.",
  },
];

export default function ServicesFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className=" py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-foreground/50">
            FREQUENTLY ASKED QUESTIONS
          </span>

          <h2 className="mt-6 text-4xl font-semibold font-heading text-foreground md:text-7xl">
            Got Questions?
            <span className="block text-primary">
              We Have Answers.
            </span>
          </h2>
        </div>

        <div className="border-t border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={faq.question}
                className="border-b border-white/10"
              >
                <button
                  onClick={() =>
                    setActiveIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="text-lg font-medium text-white">
                    {faq.question}
                  </span>

                  {isOpen ? (
                    <Minus size={20} className="text-red-500" />
                  ) : (
                    <Plus size={20} className="text-zinc-400" />
                  )}
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] pb-7"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl leading-7 text-zinc-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}