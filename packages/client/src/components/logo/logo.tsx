"use client";
import { MotionDiv, MotionSpan } from "./_compose/motion";
import React from "react";
const letters = ["R", "E", "P", "I"];

export const Logo = () => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <MotionDiv
      className="grid gap-1 h-[5rem] content-center font-semibold text-lg cursor-pointer"
      style={{
        gridTemplateColumns: hovered ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
        width: hovered ? "fit-content" : "4rem",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {letters.map((letter, i) => (
        <MotionSpan
          className={`p-2 text-white w-[2rem] h-[2rem] flex items-center justify-center rounded ${
            [0, 3].includes(i) ? "bg-secondary" : "bg-primary"
          }`}
          key={letter}
          layout
          whileHover={{ scale: 1.1 }}
        >
          {letter}
        </MotionSpan>
      ))}
    </MotionDiv>
  );
};
