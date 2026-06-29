'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { MatchData } from '@/lib/types';

interface MatchDefinitionProps {
  data: MatchData;
  locked: boolean;
  onSubmit: (answerData: Record<string, unknown>) => void;
}

// Bubble-pop matching. Tap a term, then tap the definition bubble that
// matches. Correct → the bubble pops. Wrong → it wiggles + flashes red
// (no penalty, it just reforms). All matched → submit.
export function MatchDefinition({ data, locked, onSubmit }: MatchDefinitionProps) {
  // Stable shuffle of definition bubbles (by pair index).
  const bubbleOrder = useMemo(() => {
    const idx = data.pairs.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  }, [data.pairs]);

  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<number | null>(null);
  const done = useRef(false);

  useEffect(() => {
    if (matched.size === data.pairs.length && !done.current) {
      done.current = true;
      onSubmit({ completed: true });
    }
  }, [matched, data.pairs.length, onSubmit]);

  function tapTerm(i: number) {
    if (locked || matched.has(i)) return;
    setSelectedTerm(i);
  }

  function tapBubble(pairIndex: number) {
    if (locked || matched.has(pairIndex)) return;
    if (selectedTerm === null) return;

    if (selectedTerm === pairIndex) {
      setMatched((prev) => new Set(prev).add(pairIndex));
      setSelectedTerm(null);
    } else {
      // Wrong — wiggle the tapped bubble, no penalty.
      setWrong(pairIndex);
      setTimeout(() => setWrong(null), 450);
    }
  }

  const remaining = bubbleOrder.filter((i) => !matched.has(i));

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium text-navy/60">
        Tap a term, then tap its matching definition.
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Terms */}
        <div className="flex flex-col gap-3">
          {data.pairs.map((pair, i) => {
            const isMatched = matched.has(i);
            const isSel = selectedTerm === i;
            return (
              <button
                key={i}
                type="button"
                disabled={locked || isMatched}
                onClick={() => tapTerm(i)}
                className={`rounded-btn border-2 px-4 py-3 text-left font-semibold transition-colors ${
                  isMatched
                    ? 'border-sage bg-sage text-white'
                    : isSel
                      ? 'border-teal bg-teal/15 text-navy'
                      : 'border-navy/10 bg-white text-navy hover:border-teal/50'
                }`}
              >
                {isMatched && '✅ '}
                {pair.term}
              </button>
            );
          })}
        </div>

        {/* Definition bubbles */}
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {remaining.map((pairIndex) => {
              const isWrong = wrong === pairIndex;
              return (
                <motion.button
                  key={pairIndex}
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0, rotate: 15 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  disabled={locked || selectedTerm === null}
                  onClick={() => tapBubble(pairIndex)}
                  className={`animate-float-bob rounded-pill border-2 px-4 py-3 text-left text-sm transition-colors ${
                    isWrong
                      ? 'animate-wiggle border-error bg-error/10 text-error'
                      : 'border-tan/60 bg-white text-navy hover:border-teal/50'
                  } ${selectedTerm === null ? 'opacity-70' : ''}`}
                  style={{ animationDelay: `${(pairIndex % 4) * 0.3}s` }}
                >
                  {data.pairs[pairIndex].definition}
                </motion.button>
              );
            })}
          </AnimatePresence>
          {remaining.length === 0 && (
            <p className="rounded-btn bg-sage/15 px-4 py-3 text-center font-semibold text-sage">
              All matched! 🎉
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
