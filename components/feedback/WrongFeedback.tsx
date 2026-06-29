'use client';

import { motion } from 'framer-motion';

interface WrongFeedbackProps {
  correctText?: string; // what the right answer was, if we can show it
}

// Gentle "not quite" state with a bouncing sad cat.
export function WrongFeedback({ correctText }: WrongFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
      className="flex flex-col items-center gap-4 text-center"
    >
      <div className="flex gap-2 text-6xl">
        <span className="animate-sad-cat inline-block">😿</span>
        <span className="animate-sad-cat inline-block" style={{ animationDelay: '0.15s' }}>
          😭
        </span>
        <span className="animate-sad-cat inline-block" style={{ animationDelay: '0.3s' }}>
          💔
        </span>
      </div>
      <h2 className="text-3xl font-extrabold text-error">Not quite!</h2>
      {correctText && (
        <p className="text-lg font-medium text-navy/80">
          The answer was <span className="font-bold text-navy">{correctText}</span>
        </p>
      )}
    </motion.div>
  );
}
