import React from "react";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

type Props = {
  difficulty: Difficulty;
  className?: string;
};

function getDifficultyColor(difficulty: Difficulty) {
  switch (difficulty) {
    case "Beginner":
      return "text-green-400 bg-green-400/10";
    case "Intermediate":
      return "text-yellow-400 bg-yellow-400/10";
    case "Advanced":
      return "text-red-400 bg-red-400/10";
    default:
      return "text-gray-400 bg-gray-400/10";
  }
}

export default function DifficultyBadge({ difficulty, className = "" }: Props) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(
        difficulty
      )} ${className}`}
    >
      {difficulty}
    </span>
  );
}