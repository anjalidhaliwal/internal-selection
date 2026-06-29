'use client';

import { motion } from 'framer-motion';

interface WaitingScreenProps {
  title?: string;
  message?: string;
}

export function WaitingScreen({ title, message }: WaitingScreenProps) {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-5 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        className="h-12 w-12 rounded-full border-4 border-navy/15 border-t-teal"
      />
      {title && <h1 className="text-2xl font-bold text-navy">{title}</h1>}
      <p className="text-navy/60">
        {message ?? 'Hang tight — the presenter is on the next slide.'}
      </p>
    </div>
  );
}
