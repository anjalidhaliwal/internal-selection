import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';
import { getSupabaseAdmin } from '@/lib/supabase';
import { GAME_CODE } from '@/lib/types';

// GET /api/export — host-only CSV of final standings.
export async function GET(request: NextRequest) {
  const password = request.headers.get('x-host-password');
  if (!password || password !== process.env.HOST_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const { data: players, error } = await supabase
    .from('players')
    .select('username, score, joined_at, game_sessions!inner(game_code)')
    .eq('game_sessions.game_code', GAME_CODE)
    .order('score', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const csvData = (players ?? []).map((player, index) => ({
    Rank: index + 1,
    Username: player.username,
    'Final Score': player.score,
    'Joined At': new Date(player.joined_at).toLocaleString(),
  }));

  const csv = Papa.unparse(csvData, { header: true, quotes: true });
  const date = new Date().toISOString().split('T')[0];

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="BUS481-scores-${date}.csv"`,
    },
  });
}
