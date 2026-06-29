'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface CorrectFeedbackProps {
  points: number;
}

const EMOJI = ['🎉', '✨', '🥳', '🌟', '💯'];

// Full-screen celebration on a correct answer.
export function CorrectFeedback({ points }: CorrectFeedbackProps) {
  useEffect(() => {
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.6 },
        particleCount: Math.floor(200 * particleRatio),
        colors: ['#5B8FA8', '#8AAD8B', '#B8A98A', '#2D3250'],
        ...opts,
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="flex flex-col items-center gap-4 text-center"
    >
      <div className="flex gap-2 text-5xl">
        {EMOJI.map((e, i) => (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.06 }}
          >
            {e}
          </motion.span>
        ))}
      </div>
      <h2 className="text-3xl font-extrabold text-teal">Correct!</h2>
      <p className="text-xl font-bold text-navy">
        +{points.toLocaleString()} points
      </p>
    </motion.div>
  );
}
