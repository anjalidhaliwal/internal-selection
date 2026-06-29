'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameSession } from '@/hooks/useGameSession';
import { SLIDES, TOTAL_SLIDES, getSlide } from '@/lib/slides-data';
import { LiveAnswerTracker } from './LiveAnswerTracker';
import { LeaderboardPreview } from './LeaderboardPreview';
import { QRJoinCode } from '@/components/ui/QRJoinCode';

const TYPE_BADGE: Record<string, string> = {
  lecture: 'bg-navy/10 text-navy',
  question: 'bg-teal/15 text-teal',
  discussion: 'bg-tan/25 text-navy',
  checkpoint: 'bg-sage/20 text-sage',
  break: 'bg-navy/10 text-navy',
};

export function HostDashboard({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const { session } = useGameSession();
  const [password, setPassword] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    (typeof window !== 'undefined' ? window.location.origin : '');

  useEffect(() => {
    const stored = sessionStorage.getItem('host_password');
    if (!stored) {
      router.replace('/host');
      return;
    }
    setPassword(stored);
  }, [router]);

  const advance = useCallback(
    async (body: Record<string, unknown>) => {
      if (!password || busy) return;
      setBusy(true);
      try {
        const res = await fetch('/api/host/advance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-host-password': password,
          },
          body: JSON.stringify(body),
        });
        if (res.status === 401) {
          sessionStorage.removeItem('host_password');
          router.replace('/host');
        }
      } finally {
        setBusy(false);
      }
    },
    [password, busy, router]
  );

  async function handleExport() {
    if (!password) return;
    const res = await fetch('/api/export', {
      headers: { 'x-host-password': password },
    });
    if (!res.ok) {
      alert('Export failed');
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BUS481-scores-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const index = session?.current_slide_index ?? 0;
  const slide = getSlide(index);
  const nextSlide = getSlide(index + 1);
  const isQuestion = slide?.type === 'question';

  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-navy/50">
            Host · BUS481
          </p>
          <h1 className="text-2xl font-extrabold text-navy">Control Panel</h1>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-btn bg-sage px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sage/90"
        >
          📥 Export Scores CSV
        </button>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        {/* Main control */}
        <div className="flex flex-col gap-5">
          <div className="rounded-card bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span
                className={`rounded-pill px-3 py-1 text-xs font-bold uppercase ${
                  TYPE_BADGE[slide?.type ?? 'lecture']
                }`}
              >
                {slide?.type}
              </span>
              <span className="text-sm text-navy/50">
                Slide {index} / {TOTAL_SLIDES - 1}
              </span>
            </div>
            <h2 className="text-balance text-3xl font-extrabold text-navy">
              {slide?.title}
            </h2>
            {slide?.prompt && (
              <p className="mt-3 text-lg text-navy/70">{slide.prompt}</p>
            )}
            {isQuestion && slide?.question_data && 'question' in slide.question_data && (
              <p className="mt-3 text-lg text-navy/70">
                {(slide.question_data as { question: string }).question}
              </p>
            )}

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => advance({ direction: 'prev' })}
                disabled={busy || index <= 0}
                className="rounded-btn border-2 border-navy/15 px-5 py-3 font-semibold text-navy transition-colors hover:bg-navy/5 disabled:opacity-30"
              >
                ← Back
              </button>
              <button
                onClick={() => advance({ direction: 'next' })}
                disabled={busy || index >= TOTAL_SLIDES - 1}
                className="flex-1 rounded-btn bg-teal px-5 py-4 text-lg font-bold text-white transition-colors hover:bg-teal/90 disabled:opacity-40"
              >
                {nextSlide ? `Next: ${nextSlide.title} →` : 'Next →'}
              </button>
            </div>
          </div>

          <LiveAnswerTracker
            sessionId={sessionId}
            slideIndex={index}
            isQuestion={isQuestion}
          />

          {/* Jump-to */}
          <div className="rounded-card bg-white p-4">
            <label className="text-sm font-semibold text-navy/60">
              Jump to slide
            </label>
            <select
              value={index}
              onChange={(e) => advance({ target: Number(e.target.value) })}
              className="mt-2 w-full rounded-btn border-2 border-navy/15 bg-bg px-3 py-2 text-navy"
            >
              {SLIDES.map((s) => (
                <option key={s.index} value={s.index}>
                  {s.index}. [{s.type}] {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-5">
          <div className="flex justify-center">
            <QRJoinCode url={appUrl} size={120} />
          </div>
          <LeaderboardPreview sessionId={sessionId} />
        </aside>
      </div>
    </div>
  );
}
