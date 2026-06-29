'use client';

import { useEffect } from 'react';

// App-wide client error boundary. Keeps a single runtime hiccup from
// blanking the screen with the browser's default "couldn't load" page.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 p-6 text-center">
      <div className="text-5xl">🙈</div>
      <h1 className="text-2xl font-extrabold text-navy">Something hiccuped</h1>
      <p className="max-w-sm text-navy/60">
        The game hit a snag. Try again — your score is safe.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-btn bg-teal px-6 py-3 font-semibold text-white transition-colors hover:bg-teal/90"
        >
          Try again
        </button>
        <a
          href="/play"
          className="rounded-btn border-2 border-navy/15 px-6 py-3 font-semibold text-navy transition-colors hover:bg-navy/5"
        >
          Back to game
        </a>
      </div>
    </main>
  );
}
