"use client";
import { AnimatePresence } from "framer-motion";
import { MotionDiv, MotionSpan } from "./_compose/motion";
import React from "react";
import { SessionContext } from "@contexts/session";
const LETTERS = ["R", "E", "P", "I"];

export const Logo = () => {
  const { logoHovered, setLogoHovered } = React.useContext(SessionContext);

  return (
    <AnimatePresence mode="wait">
      <MotionDiv
        className="grid gap-1 h-[5rem] content-center font-semibold text-lg cursor-pointer"
        style={{
          gridTemplateColumns: logoHovered ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
          width: logoHovered ? "fit-content" : "4rem",
        }}
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
      >
        {LETTERS.map((letter, i) => (
          <MotionSpan
            className={`p-2 text-white w-[2rem] h-[2rem] flex items-center justify-center rounded ${
              [0, 3].includes(i) ? "bg-secondary" : "bg-primary"
            }`}
            key={letter}
            layout
            whileHover={{ scale: 0.9 }}
						transition={{ duration: 0.2 }}
          >
            {letter}
          </MotionSpan>
        ))}
      </MotionDiv>
    </AnimatePresence>
  );
};
