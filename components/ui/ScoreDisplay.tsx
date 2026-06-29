'use client';

import { useEffect, useRef, useState } from 'react';

interface ScoreDisplayProps {
  score: number;
  className?: string;
}

// Animated score counter — tweens from the previous value to the new one.
export function ScoreDisplay({ score, className }: ScoreDisplayProps) {
  const [display, setDisplay] = useState(score);
  const fromRef = useRef(score);

  useEffect(() => {
    const from = fromRef.current;
    const to = score;
    if (from === to) return;

    const duration = 600;
    let start: number | null = null;
    let frame: number;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) frame = requestAnimationFrame(step);
      else fromRef.current = to;
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <span className={className}>
      {display.toLocaleString()}
    </span>
  );
}
