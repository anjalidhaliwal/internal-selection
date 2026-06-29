'use client';

import { useMemo, useState } from 'react';
import type { FillBlankData } from '@/lib/types';
import type { AnswerResult } from './QuestionWrapper';

interface FillBlankProps {
  data: FillBlankData;
  locked: boolean;
  result: AnswerResult | null;
  onSubmit: (answerData: Record<string, unknown>) => void;
}

// Renders the sentence with each `___` replaced by an inline input.
// Submits on Enter or the Submit button.
export function FillBlank({ data, locked, result, onSubmit }: FillBlankProps) {
  const parts = useMemo(() => data.sentence.split('___'), [data.sentence]);
  const blankCount = Math.max(0, parts.length - 1);
  const [values, setValues] = useState<string[]>(() =>
    Array(blankCount).fill('')
  );

  function setValue(i: number, v: string) {
    setValues((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  }

  function submit() {
    if (locked) return;
    onSubmit({ answers: values });
  }

  const revealed = result != null;

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-card bg-white p-5 text-lg leading-relaxed text-navy">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < blankCount && (
              <input
                type="text"
                inputMode="text"
                autoFocus={i === 0}
                disabled={locked}
                value={values[i]}
                onChange={(e) => setValue(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submit();
                }}
                placeholder="…"
                className="mx-1 w-32 border-b-2 border-teal bg-transparent px-1 pb-0.5 text-center font-semibold text-teal outline-none focus:border-navy disabled:opacity-70"
              />
            )}
          </span>
        ))}
      </div>

      {data.hint && !revealed && (
        <p className="text-sm italic text-navy/60">💡 {data.hint}</p>
      )}

      {revealed && data.blanks && (
        <p className="text-sm text-navy/70">
          Accepted answer{data.blanks.length > 1 ? 's' : ''}:{' '}
          <span className="font-semibold text-navy">
            {data.blanks.join(', ')}
          </span>
        </p>
      )}

      {!locked && (
        <button
          type="button"
          onClick={submit}
          disabled={values.every((v) => v.trim() === '')}
          className="self-start rounded-btn bg-teal px-6 py-3 font-semibold text-white transition-colors hover:bg-teal/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit
        </button>
      )}
    </div>
  );
}
