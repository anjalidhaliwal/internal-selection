'use client';

import { usePlayers } from '@/hooks/usePlayers';
import { Leaderboard } from '@/components/ui/Leaderboard';

interface CheckpointScreenProps {
  sessionId: string;
  title: string;
  playerId: string;
}

export function CheckpointScreen({
  sessionId,
  title,
  playerId,
}: CheckpointScreenProps) {
  const players = usePlayers(sessionId);
  const myRank = players.findIndex((p) => p.id === playerId) + 1;

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
      <h1 className="text-balance text-2xl font-extrabold text-navy sm:text-3xl">
        {title}
      </h1>
      {myRank > 0 && (
        <p className="rounded-pill bg-white px-5 py-2 font-semibold text-navy shadow-sm">
          You&apos;re #{myRank} of {players.length}
        </p>
      )}
      <Leaderboard players={players} highlightId={playerId} limit={5} />
    </div>
  );
}
