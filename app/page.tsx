'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BlobBackground } from '@/components/ui/BlobBackground';

export default function JoinPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already joined this session, skip straight to play.
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('player_id')) {
      router.replace('/play');
    }
  }, [router]);

  async function join(e: React.FormEvent) {
    e.preventDefault();
    const name = username.trim();
    if (!name) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Could not join');
        setLoading(false);
        return;
      }
      localStorage.setItem('player_id', data.player.id);
      localStorage.setItem('username', data.player.username);
      localStorage.setItem('session_id', data.session_id);
      router.push('/play');
    } catch {
      setError('Network error — try again');
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center p-6">
      <BlobBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-card bg-white p-8 shadow-lg"
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-navy">Internal Selection</h1>
          <p className="mt-1 font-medium text-teal">Play along. Learn along.</p>
        </div>

        <form onSubmit={join} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-semibold text-navy">What&apos;s your name?</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={24}
              autoFocus
              placeholder="e.g. RecruitGuru"
              className="rounded-btn border-2 border-navy/15 bg-bg px-4 py-3 text-lg text-navy outline-none focus:border-teal"
            />
          </label>

          {error && <p className="text-sm font-medium text-error">{error}</p>}

          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="rounded-btn bg-teal px-6 py-4 text-lg font-bold text-white transition-colors hover:bg-teal/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? 'Joining…' : 'Join Game 🎉'}
          </button>
        </form>
      </motion.div>

      <a
        href="/host"
        className="mt-8 flex items-center gap-1 text-xs font-medium text-navy/35 transition-colors hover:text-navy/60"
      >
        🔒 Presenter access (password required)
      </a>
    </main>
  );
}
