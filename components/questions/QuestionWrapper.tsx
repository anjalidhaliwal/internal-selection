'use client';

import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Slide } from '@/lib/types';
import { Timer } from '@/components/ui/Timer';
import { CorrectFeedback } from '@/components/feedback/CorrectFeedback';
import { WrongFeedback } from '@/components/feedback/WrongFeedback';
import { MultipleChoice } from './MultipleChoice';
import { FillBlank } from './FillBlank';
import { MatchDefinition } from './MatchDefinition';
import { DragDrop } from './DragDrop';
import type {
  MultipleChoiceData,
  FillBlankData,
  MatchData,
  DragDropData,
} from '@/lib/types';

export interface AnswerResult {
  is_correct: boolean;
  points_earned: number;
  correct_index?: number | null;
  correct_answers?: string[] | null;
  explanation?: string | null;
}

interface QuestionWrapperProps {
  slide: Slide;
  playerId: string;
}

type Phase = 'answering' | 'submitting' | 'result';

// Owns the timer, the one-shot submit to /api/answer, the answer reveal,
// and the correct/wrong feedback for a single question slide.
export function QuestionWrapper({ slide, playerId }: QuestionWrapperProps) {
  const [phase, setPhase] = useState<Phase>('answering');
  const [result, setResult] = useState<AnswerResult | null>(null);
  const startedAt = useRef<number>(Date.now());
  const submitted = useRef(false);

  const timeLimit = slide.time_limit ?? 25;

  const submit = useCallback(
    async (answerData: Record<string, unknown>) => {
      if (submitted.current) return;
      submitted.current = true;
      setPhase('submitting');

      const timeTaken = Date.now() - startedAt.current;
      try {
        const res = await fetch('/api/answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            player_id: playerId,
            slide_index: slide.index,
            answer_data: answerData,
            time_taken_ms: timeTaken,
          }),
        });
        const data = await res.json();
        setResult({
          is_correct: !!data.is_correct,
          points_earned: data.points_earned ?? 0,
          correct_index: data.correct_index,
          correct_answers: data.correct_answers,
          explanation: data.explanation,
        });
      } catch {
        setResult({ is_correct: false, points_earned: 0 });
      }
      setPhase('result');
    },
    [playerId, slide.index]
  );

  const handleExpire = useCallback(() => {
    if (!submitted.current) {
      // Time ran out with no submission — record an empty (wrong) answer.
      submit({ timed_out: true });
    }
  }, [submit]);

  const locked = phase !== 'answering';
  const qd = slide.question_data;

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-balance text-2xl font-bold text-navy sm:text-3xl">
          {slide.title}
        </h2>
        <Timer
          durationSeconds={timeLimit}
          onExpire={handleExpire}
          paused={locked}
        />
      </div>

      {slide.question_type === 'multiple_choice' && (
        <MultipleChoice
          data={qd as MultipleChoiceData}
          locked={locked}
          result={result}
          onSubmit={submit}
        />
      )}
      {slide.question_type === 'fill_blank' && (
        <FillBlank
          data={qd as FillBlankData}
          locked={locked}
          result={result}
          onSubmit={submit}
        />
      )}
      {(slide.question_type === 'match' || slide.question_type === 'bubble_pop') && (
        <MatchDefinition
          data={qd as MatchData}
          locked={locked}
          onSubmit={submit}
        />
      )}
      {slide.question_type === 'drag_drop' && (
        <DragDrop
          data={qd as DragDropData}
          locked={locked}
          onSubmit={submit}
        />
      )}

      <AnimatePresence>
        {phase === 'result' && result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 rounded-card bg-white/70 p-6"
          >
            {result.is_correct ? (
              <CorrectFeedback points={result.points_earned} />
            ) : (
              <WrongFeedback />
            )}
            {result.explanation && (
              <p className="max-w-md text-center text-sm text-navy/70">
                {result.explanation}
              </p>
            )}
            <p className="pt-2 text-sm font-medium text-navy/50">
              Waiting for the presenter to continue…
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
