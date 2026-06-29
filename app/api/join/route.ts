import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { GAME_CODE } from '@/lib/types';

// POST /api/join
//  Body: { username }
//  Joins (or rejoins) the BUS481 session. Same username => same player
//  row reactivated, preserving their score.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const username = typeof body.username === 'string' ? body.username.trim() : '';

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }
  if (username.length > 24) {
    return NextResponse.json(
      { error: 'Username must be 24 characters or fewer' },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  // Ensure the session exists.
  const { data: session, error: sessionError } = await supabase
    .from('game_sessions')
    .select('*')
    .eq('game_code', GAME_CODE)
    .maybeSingle();

  if (sessionError) {
    return NextResponse.json({ error: sessionError.message }, { status: 500 });
  }

  let sessionId = session?.id as string | undefined;
  if (!sessionId) {
    const { data: created, error: createError } = await supabase
      .from('game_sessions')
      .insert({ game_code: GAME_CODE, current_slide_index: 0, status: 'lobby' })
      .select('*')
      .single();
    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 500 });
    }
    sessionId = created.id;
  }

  // Upsert on (session_id, username) so rejoining keeps the same row + score.
  const { data: player, error: upsertError } = await supabase
    .from('players')
    .upsert(
      { session_id: sessionId, username, is_active: true },
      { onConflict: 'session_id,username', ignoreDuplicates: false }
    )
    .select('*')
    .single();

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  return NextResponse.json({ player, session_id: sessionId });
}
