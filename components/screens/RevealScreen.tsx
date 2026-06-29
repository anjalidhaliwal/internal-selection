'use client';

import { motion } from 'framer-motion';
import { getPreviousQuestion } from '@/lib/slides-data';
import type {
  MultipleChoiceData,
  FillBlankData,
} from '@/lib/types';

interface RevealScreenProps {
  slideIndex: number;
}

// Shown on an answer-reveal (⏭️) slide: recaps the correct answer of the
// question that just ran, so players who missed it still learn it.
export function RevealScreen({ slideIndex }: RevealScreenProps) {
  const q = getPreviousQuestion(slideIndex);

  let answer: string | null = null;
  if (q?.question_type === 'multiple_choice') {
    const d = q.question_data as MultipleChoiceData;
    answer = d.options[d.correct_index];
  } else if (q?.question_type === 'fill_blank') {
    const d = q.question_data as FillBlankData;
    answer = d.blanks.join(' · ');
  }

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-5 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14 }}
        className="text-5xl"
      >
        👀
      </motion.div>
      {q && (
        <p className="text-sm font-semibold uppercase tracking-wide text-navy/50">
          {q.title}
        </p>
      )}
      {answer ? (
        <div className="rounded-card bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-navy/60">The answer is</p>
          <p className="mt-1 text-2xl font-extrabold text-teal">{answer}</p>
        </div>
      ) : (
        <p className="text-xl font-bold text-navy">Answers are up front! 📺</p>
      )}
      <p className="text-navy/60">Look up front — we&apos;ll keep going in a sec.</p>
    </div>
  );
}
