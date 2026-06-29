// ── Points calculation ──────────────────────────────────────────
//  Speed-weighted, Kahoot-style. Full points for a fast correct answer,
//  scaling down to a 300-point floor at the time limit. Wrong = 0.

export function calculatePoints(
  timeLimit: number, // seconds
  timeTakenMs: number, // milliseconds player took to answer
  isCorrect: boolean,
  maxPoints: number = 1000
): number {
  if (!isCorrect) return 0;

  const timeTakenSeconds = timeTakenMs / 1000;
  const ratio = Math.min(1, Math.max(0, timeTakenSeconds / timeLimit)); // 0 = instant, 1 = last second

  const speedScore = Math.max(300, Math.round(maxPoints * (1 - ratio * 0.7)));
  return speedScore;
}
