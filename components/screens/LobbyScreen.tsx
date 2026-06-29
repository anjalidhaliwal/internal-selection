'use client';

import { motion } from 'framer-motion';
import { usePlayers } from '@/hooks/usePlayers';
import { QRJoinCode } from '@/components/ui/QRJoinCode';

interface LobbyScreenProps {
  sessionId: string;
  username: string;
  appUrl: string;
}

export function LobbyScreen({ sessionId, username, appUrl }: LobbyScreenProps) {
  const players = usePlayers(sessionId);

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
      <div className="flex items-center gap-2 rounded-pill bg-white px-5 py-2 text-sm font-semibold text-navy shadow-sm">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-sage" />
        You&apos;re in, {username}!
      </div>

      <h1 className="text-3xl font-extrabold text-navy sm:text-4xl">
        Waiting for the presenter to start… 👀
      </h1>

      <p className="text-navy/60">
        {players.length} {players.length === 1 ? 'player' : 'players'} in the room
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {players.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-pill px-3 py-1.5 text-sm font-medium ${
              p.username === username
                ? 'bg-teal text-white'
                : 'bg-white text-navy'
            }`}
          >
            {p.username}
          </motion.span>
        ))}
      </div>

      <div className="pt-4">
        <QRJoinCode url={appUrl} size={200} />
      </div>
    </div>
  );
}
