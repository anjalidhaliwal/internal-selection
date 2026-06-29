'use client';

import { motion } from 'framer-motion';
import type { Player } from '@/lib/types';

interface LeaderboardProps {
  players: Player[];
  highlightId?: string | null;
  limit?: number;
  compact?: boolean;
}

const MEDALS = ['🥇', '🥈', '🥉'];

export function Leaderboard({
  players,
  highlightId,
  limit = 5,
  compact = false,
}: LeaderboardProps) {
  const top = players.slice(0, limit);
  const mine = highlightId
    ? players.findIndex((p) => p.id === highlightId)
    : -1;
  const showMine = mine >= limit;

  return (
    <div className="flex w-full flex-col gap-2">
      {top.map((p, i) => {
        const isMine = p.id === highlightId;
        return (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: compact ? 0 : i * 0.08 }}
            className={`flex items-center gap-3 rounded-btn px-4 ${
              compact ? 'py-2' : 'py-3'
            } ${
              isMine
                ? 'bg-teal text-white'
                : i === 0
                  ? 'bg-tan/30 text-navy'
                  : 'bg-white text-navy'
            }`}
          >
            <span className="w-7 text-center text-lg font-bold">
              {MEDALS[i] ?? i + 1}
            </span>
            <span className="flex-1 truncate font-semibold">{p.username}</span>
            <span className="font-mono font-bold">
              {p.score.toLocaleString()}
            </span>
          </motion.div>
        );
      })}

      {showMine && (
        <>
          <div className="py-1 text-center text-navy/40">···</div>
          <div className="flex items-center gap-3 rounded-btn bg-teal px-4 py-3 text-white">
            <span className="w-7 text-center font-bold">{mine + 1}</span>
            <span className="flex-1 truncate font-semibold">
              {players[mine].username}
            </span>
            <span className="font-mono font-bold">
              {players[mine].score.toLocaleString()}
            </span>
          </div>
        </>
      )}

      {players.length === 0 && (
        <p className="py-6 text-center text-navy/50">No scores yet…</p>
      )}
    </div>
  );
}
