'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlobBackground } from '@/components/ui/BlobBackground';

export default function HostLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/host/session', {
        method: 'POST',
        headers: { 'x-host-password': password },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(res.status === 401 ? 'Wrong password' : data.error ?? 'Failed');
        setLoading(false);
        return;
      }
      sessionStorage.setItem('host_password', password);
      router.push(`/host/${data.session.id}`);
    } catch {
      setError('Network error — try again');
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center p-6">
      <BlobBackground />
      <form
        onSubmit={login}
        className="w-full max-w-sm rounded-card bg-white p-8 shadow-lg"
      >
        <h1 className="text-2xl font-extrabold text-navy">Presenter sign-in</h1>
        <p className="mb-6 mt-1 text-sm text-navy/60">
          Enter the host password to control the game.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          placeholder="Host password"
          className="w-full rounded-btn border-2 border-navy/15 bg-bg px-4 py-3 text-navy outline-none focus:border-teal"
        />
        {error && <p className="mt-3 text-sm font-medium text-error">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="mt-5 w-full rounded-btn bg-navy px-6 py-3 font-bold text-white transition-colors hover:bg-navy/90 disabled:opacity-40"
        >
          {loading ? 'Checking…' : 'Open dashboard'}
        </button>
      </form>
    </main>
  );
}
