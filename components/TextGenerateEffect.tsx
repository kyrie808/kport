"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.15),
      }
    );
  }, [animate, duration, filter, scope]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          // Highlight specific words
          const isHighlight = word.toLowerCase().includes("motor") || word.toLowerCase().includes("escalar");
          return (
            <motion.span
              key={word + idx}
              className={cn(
                "opacity-0 inline-block",
                isHighlight ? "text-accent drop-shadow-[0_0_15px_rgba(204,255,0,0.3)]" : "text-white"
              )}
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="leading-tight tracking-tighter">
        {renderWords()}
      </div>
    </div>
  );
};
