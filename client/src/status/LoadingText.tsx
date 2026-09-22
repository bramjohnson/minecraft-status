import React, { useState, useEffect } from "react";

interface LoadingTextProps {
  text?: string;
  interval?: number; // Duration of each frame in ms
  className?: string;
}

export const LoadingText: React.FC<LoadingTextProps> = ({
  text = "Loading",
  interval = 400,
  className = "",
}) => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    // Frames: 0 dots -> 1 dot -> 2 dots -> 3 dots -> 3 dots (hold frame)
    const timer = setInterval(() => {
      setDotCount((prev) => (prev >= 4 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  // Cap visible dots at 3 so state 4 acts as the "hold" frame for 3 dots
  const visibleDots = Math.min(dotCount, 3);

  return (
    <span className={className}>
      {text}
      {".".repeat(visibleDots)}
    </span>
  );
};

export default LoadingText;
