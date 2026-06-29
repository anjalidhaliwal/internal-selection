'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameSession } from '@/hooks/useGameSession';
import { usePlayers } from '@/hooks/usePlayers';
import { getSlide, TOTAL_SLIDES, FIRST_SLIDE } from '@/lib/slides-data';
import { BlobBackground } from '@/components/ui/BlobBackground';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ScoreDisplay } from '@/components/ui/ScoreDisplay';
import { LobbyScreen } from '@/components/screens/LobbyScreen';
import { TitleScreen } from '@/components/screens/TitleScreen';
import { RevealScreen } from '@/components/screens/RevealScreen';
import { DiscussionScreen } from '@/components/screens/DiscussionScreen';
import { CheckpointScreen } from '@/components/screens/CheckpointScreen';
import { WaitingScreen } from '@/components/screens/WaitingScreen';
import { EndScreen } from '@/components/screens/EndScreen';
import { QuestionWrapper } from '@/components/questions/QuestionWrapper';

export default function PlayPage() {
  const router = useRouter();
  const { session, loading } = useGameSession();
  const [me, setMe] = useState<{ id: string; username: string; sessionId: string } | null>(
    null
  );

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    (typeof window !== 'undefined' ? window.location.origin : '');

  useEffect(() => {
    const id = localStorage.getItem('player_id');
    const username = localStorage.getItem('username');
    const sessionId = localStorage.getItem('session_id');
    if (!id || !username || !sessionId) {
      router.replace('/');
      return;
    }
    setMe({ id, username, sessionId });
  }, [router]);

  const players = usePlayers(me?.sessionId);
  const myScore = players.find((p) => p.id === me?.id)?.score ?? 0;

  if (!me || loading) {
    return (
      <main className="flex min-h-dvh items-center justify-center p-6">
        <BlobBackground />
        <WaitingScreen message="Connecting…" />
      </main>
    );
  }

  const rawIndex = session?.current_slide_index ?? FIRST_SLIDE;
  const index = Math.min(TOTAL_SLIDES, Math.max(FIRST_SLIDE, rawIndex));
  const slide = getSlide(index);

  function renderSlide() {
    if (!slide) return <WaitingScreen />;
    switch (slide.type) {
      case 'lobby':
        return (
          <LobbyScreen sessionId={me!.sessionId} username={me!.username} appUrl={appUrl} />
        );
      case 'title':
        return <TitleScreen title={slide.title} />;
      case 'question':
        return slide.question_type ? (
          <QuestionWrapper slide={slide} playerId={me!.id} />
        ) : (
          <TitleScreen title={slide.title} />
        );
      case 'reveal':
        return <RevealScreen slideIndex={index} />;
      case 'discussion':
        return <DiscussionScreen title={slide.title} prompt={slide.prompt ?? ''} />;
      case 'checkpoint':
      case 'wheel':
        return (
          <CheckpointScreen
            sessionId={me!.sessionId}
            title={slide.title}
            playerId={me!.id}
          />
        );
      case 'break':
        return (
          <WaitingScreen title={slide.title} message="Take a breather — back soon! ☕" />
        );
      case 'end':
        return <EndScreen sessionId={me!.sessionId} playerId={me!.id} />;
      case 'lecture':
      default:
        return <TitleScreen title={slide.title} />;
    }
  }

  return (
    <main className="flex min-h-dvh flex-col p-4 sm:p-6">
      <BlobBackground />

      {/* Top bar */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1">
          <ProgressBar current={index - FIRST_SLIDE} total={TOTAL_SLIDES} />
        </div>
        <div className="flex items-center gap-3 rounded-pill bg-white px-4 py-2 shadow-sm">
          <span className="max-w-[120px] truncate text-sm font-semibold text-navy">
            {me.username}
          </span>
          <ScoreDisplay
            score={myScore}
            className="font-mono text-sm font-extrabold text-teal"
          />
        </div>
      </div>

      {/* Slide body */}
      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="flex w-full justify-center"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
