import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/60";

  const styles =
    variant === "primary"
      ? "bg-green-400 hover:bg-green-500 text-black px-6 md:px-8 py-3 md:py-4 text-lg"
      : "text-white hover:text-green-400";

  const finalClassName = `${base} ${styles} ${className}`;

  if (href) {
    return (
      <a href={href} className={finalClassName}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={finalClassName} type="button">
      {children}
    </button>
  );
}