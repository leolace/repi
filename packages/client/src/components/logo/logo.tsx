import React from "react";
const LETTERS = ["R", "E", "P", "I"];

export const Logo = () => {
  return (
    <div className="grid gap-1 h-[5rem] content-center font-semibold text-lg cursor-pointer grid-cols-2">
      {LETTERS.map((letter, i) => (
        <span
          className={`p-2 text-white w-[2rem] h-[2rem] flex items-center justify-center rounded ${
            [0, 3].includes(i) ? "bg-secondary" : "bg-primary"
          }`}
          key={letter}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};
