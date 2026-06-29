import { BlobBackground } from '@/components/ui/BlobBackground';
import { HostDashboard } from '@/components/host/HostDashboard';

// Next 16: route params are async and must be awaited.
export default async function HostControlPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return (
    <main className="flex min-h-dvh flex-col p-4 sm:p-6">
      <BlobBackground />
      <HostDashboard sessionId={sessionId} />
    </main>
  );
}
