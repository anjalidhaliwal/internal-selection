import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { GAME_CODE } from '@/lib/types';
import { FIRST_SLIDE } from '@/lib/slides-data';

// POST /api/host/reset
//  Host-only. Wipes every player (their answers cascade-delete via FK) and
//  snaps the session back to the lobby — a clean slate for a new class or
//  another test run. The game_sessions row itself is kept.
export async function POST(request: NextRequest) {
  const password = request.headers.get('x-host-password');
  if (!password || password !== process.env.HOST_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const { data: session, error: findError } = await supabase
    .from('game_sessions')
    .select('id')
    .eq('game_code', GAME_CODE)
    .maybeSingle();

  if (findError) {
    return NextResponse.json({ error: findError.message }, { status: 500 });
  }
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  // Delete all players in this session — answers cascade via FK.
  const { error: delError } = await supabase
    .from('players')
    .delete()
    .eq('session_id', session.id);

  if (delError) {
    return NextResponse.json({ error: delError.message }, { status: 500 });
  }

  // Back to the lobby.
  const { error: updError } = await supabase
    .from('game_sessions')
    .update({ current_slide_index: FIRST_SLIDE, status: 'lobby' })
    .eq('id', session.id);

  if (updError) {
    return NextResponse.json({ error: updError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
