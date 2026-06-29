// Decorative organic blobs in the corners — matches the slide deck's
// aesthetic. Solid colors at low opacity with lopsided border-radius,
// NOT gradients. Purely decorative + non-interactive.
export function BlobBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* teal — bottom-left */}
      <div
        className="absolute -bottom-32 -left-32 h-[28rem] w-[28rem] bg-teal opacity-35"
        style={{ borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%' }}
      />
      {/* tan — top-right */}
      <div
        className="absolute -top-40 -right-24 h-[26rem] w-[26rem] bg-tan opacity-35"
        style={{ borderRadius: '63% 37% 38% 62% / 49% 53% 47% 51%' }}
      />
      {/* sage — top-right secondary */}
      <div
        className="absolute -top-10 right-40 h-[16rem] w-[16rem] bg-sage opacity-35"
        style={{ borderRadius: '50% 50% 33% 67% / 55% 38% 62% 45%' }}
      />
    </div>
  );
}
