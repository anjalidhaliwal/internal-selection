interface ProgressBarProps {
  current: number; // 0-based slide index
  total: number;
}

// Thin progress indicator across the top of the play screen.
export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total <= 1 ? 0 : (current / (total - 1)) * 100;
  return (
    <div className="h-2 w-full overflow-hidden rounded-pill bg-navy/10">
      <div
        className="h-full rounded-pill bg-teal transition-all duration-500 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
      />
    </div>
  );
}
