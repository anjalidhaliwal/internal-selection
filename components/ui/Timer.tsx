'use client';

import { useEffect, useState } from 'react';

interface TimerProps {
  durationSeconds: number;
  // Epoch ms when the question started (shared so the ring is accurate
  // across remounts). Defaults to "now" on mount.
  startedAt?: number;
  onExpire?: () => void;
  paused?: boolean;
}

// Countdown ring. Turns red in the final 5 seconds.
export function Timer({ durationSeconds, startedAt, onExpire, paused }: TimerProps) {
  const [start] = useState(() => startedAt ?? Date.now());
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    if (paused) return;
    let frame: number;
    let fired = false;

    const tick = () => {
      const elapsed = (Date.now() - start) / 1000;
      const left = Math.max(0, durationSeconds - elapsed);
      setRemaining(left);
      if (left <= 0 && !fired) {
        fired = true;
        onExpire?.();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationSeconds, start, onExpire, paused]);

  const ratio = Math.max(0, Math.min(1, remaining / durationSeconds));
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const isUrgent = remaining <= 5;
  const color = isUrgent ? 'var(--color-error)' : 'var(--color-teal)';

  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="var(--color-navy)"
          strokeOpacity="0.12"
          strokeWidth="6"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ratio)}
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold"
        style={{ color }}
      >
        {Math.ceil(remaining)}
      </div>
    </div>
  );
}
