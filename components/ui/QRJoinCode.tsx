'use client';

import { QRCodeSVG } from 'qrcode.react';

interface QRJoinCodeProps {
  url: string;
  size?: number;
}

// Renders the join URL as a scannable QR code (navy on white to match
// the brand). Shown big on the lobby projector view and small on the host.
export function QRJoinCode({ url, size = 180 }: QRJoinCodeProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-navy/70">Scan to join</p>
      <QRCodeSVG
        value={url}
        size={size}
        bgColor="#FFFFFF"
        fgColor="#2D3250"
        level="M"
        marginSize={0}
      />
      <p className="max-w-[180px] break-all text-center text-xs text-navy/50">
        {url}
      </p>
    </div>
  );
}
