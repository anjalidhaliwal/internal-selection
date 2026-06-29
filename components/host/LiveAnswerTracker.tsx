'use client';

import { useAnswerCount } from '@/hooks/useAnswerCount';
import { usePlayers } from '@/hooks/usePlayers';

interface LiveAnswerTrackerProps {
  sessionId: string;
  slideIndex: number;
  isQuestion: boolean;
}

export function LiveAnswerTracker({
  sessionId,
  slideIndex,
  isQuestion,
}: LiveAnswerTrackerProps) {
  const answered = useAnswerCount(isQuestion ? slideIndex : null);
  const players = usePlayers(sessionId);
  const total = players.length;
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

  if (!isQuestion) {
    return (
      <div className="rounded-card bg-white p-5 text-center">
        <p className="text-3xl font-extrabold text-navy">{total}</p>
        <p className="text-sm text-navy/60">players connected</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-card bg-white p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-bold uppercase tracking-wide text-navy/60">
          Answered
        </span>
        <span className="font-mono text-2xl font-extrabold text-teal">
          {answered}
          <span className="text-base text-navy/40"> / {total}</span>
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-pill bg-navy/10">
        <div
          className="h-full rounded-pill bg-teal transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
