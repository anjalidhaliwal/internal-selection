'use client';

import { usePlayers } from '@/hooks/usePlayers';
import { Leaderboard } from '@/components/ui/Leaderboard';

export function LeaderboardPreview({ sessionId }: { sessionId: string }) {
  const players = usePlayers(sessionId);
  return (
    <div className="flex flex-col gap-3 rounded-card bg-bg/70 p-4">
      <h3 className="text-sm font-bold uppercase tracking-wide text-navy/60">
        Leaderboard
      </h3>
      <Leaderboard players={players} limit={8} compact />
    </div>
  );
}
