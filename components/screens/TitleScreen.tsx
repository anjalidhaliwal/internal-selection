'use client';

import { motion } from 'framer-motion';

interface TitleScreenProps {
  title: string;
}

// Section-title / transition slides (🎬). Big title, "eyes up front".
export function TitleScreen({ title }: TitleScreenProps) {
  // Empty transition placeholders just show a calm spacer.
  const isPlaceholder = title === 'Transition';

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-5 text-center">
      <motion.h1
        key={title}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        className="text-balance text-4xl font-extrabold text-navy sm:text-5xl"
      >
        {isPlaceholder ? '✨' : title}
      </motion.h1>
      {!isPlaceholder && (
        <p className="text-navy/60">Eyes up front — here we go!</p>
      )}
    </div>
  );
}
