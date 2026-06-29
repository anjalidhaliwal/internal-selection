'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { usePlayers } from '@/hooks/usePlayers';
import { Leaderboard } from '@/components/ui/Leaderboard';

interface EndScreenProps {
  sessionId: string;
  playerId: string;
}

export function EndScreen({ sessionId, playerId }: EndScreenProps) {
  const players = usePlayers(sessionId);
  const myRank = players.findIndex((p) => p.id === playerId) + 1;
  const me = players.find((p) => p.id === playerId);

  useEffect(() => {
    const duration = 2500;
    const end = Date.now() + duration;
    const colors = ['#5B8FA8', '#8AAD8B', '#B8A98A', '#2D3250'];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
      <div className="text-6xl">🎉</div>
      <h1 className="text-3xl font-extrabold text-navy">That&apos;s a wrap!</h1>
      {myRank > 0 && me && (
        <p className="rounded-pill bg-teal px-6 py-2 text-lg font-semibold text-white">
          You finished #{myRank} with {me.score.toLocaleString()} points
        </p>
      )}
      <Leaderboard players={players} highlightId={playerId} limit={5} />
      <p className="text-navy/60">Thanks for playing — play along, learn along! 🍯</p>
    </div>
  );
}
