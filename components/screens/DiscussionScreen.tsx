'use client';

import { motion } from 'framer-motion';

interface DiscussionScreenProps {
  title: string;
  prompt: string;
}

export function DiscussionScreen({ title, prompt }: DiscussionScreenProps) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-6 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        className="text-6xl"
      >
        💬
      </motion.div>
      <h1 className="text-2xl font-extrabold text-navy sm:text-3xl">{title}</h1>
      <p className="text-balance rounded-card bg-white p-6 text-xl font-medium leading-relaxed text-navy shadow-sm">
        {prompt}
      </p>
      <p className="text-navy/60">Sit back and discuss — no input needed!</p>
    </div>
  );
}
