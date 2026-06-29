'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { MultipleChoiceData } from '@/lib/types';
import type { AnswerResult } from './QuestionWrapper';

interface MultipleChoiceProps {
  data: MultipleChoiceData;
  locked: boolean;
  result: AnswerResult | null;
  onSubmit: (answerData: Record<string, unknown>) => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Large tap-friendly option cards. Selecting locks in and submits.
// After the reveal, the correct option glows teal and a wrong pick is red.
export function MultipleChoice({ data, locked, result, onSubmit }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null);

  function choose(index: number) {
    if (locked || selected !== null) return;
    setSelected(index);
    onSubmit({ selected_index: index });
  }

  const revealed = result != null;
  const correctIndex =
    result?.correct_index ?? (revealed ? data.correct_index : null);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-balance text-lg font-medium text-navy/90">
        {data.question}
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {data.options.map((option, i) => {
          const isSelected = selected === i;
          const isCorrect = revealed && correctIndex === i;
          const isWrongPick = revealed && isSelected && correctIndex !== i;

          let style =
            'border-navy/10 bg-white hover:border-teal/50 hover:bg-teal/5';
          if (isCorrect) style = 'border-teal bg-teal text-white';
          else if (isWrongPick) style = 'border-error bg-error text-white';
          else if (isSelected) style = 'border-teal bg-teal/10';
          else if (locked) style = 'border-navy/10 bg-white opacity-60';

          return (
            <motion.button
              key={i}
              type="button"
              disabled={locked}
              onClick={() => choose(i)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: locked ? 1 : 0.97 }}
              className={`flex min-h-[56px] items-center gap-3 rounded-btn border-2 px-4 py-3 text-left transition-colors ${style}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  isCorrect || isWrongPick
                    ? 'bg-white/25 text-white'
                    : 'bg-navy/10 text-navy'
                }`}
              >
                {LETTERS[i]}
              </span>
              <span className="font-medium">{option}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
