import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { GAME_CODE } from '@/lib/types';

// POST /api/host/session
//  Authenticates the host and ensures the BUS481 session exists.
//  Returns the session row so the dashboard knows the session id.
export async function POST(request: NextRequest) {
  const password = request.headers.get('x-host-password');
  if (!password || password !== process.env.HOST_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  // Find the session, or create it if it doesn't exist yet.
  const { data: existing, error: findError } = await supabase
    .from('game_sessions')
    .select('*')
    .eq('game_code', GAME_CODE)
    .maybeSingle();

  if (findError) {
    return NextResponse.json({ error: findError.message }, { status: 500 });
  }

  if (existing) {
    return NextResponse.json({ session: existing });
  }

  const { data: created, error: createError } = await supabase
    .from('game_sessions')
    .insert({ game_code: GAME_CODE, current_slide_index: 0, status: 'lobby' })
    .select('*')
    .single();

  if (createError) {
    return NextResponse.json({ error: createError.message }, { status: 500 });
  }

  return NextResponse.json({ session: created });
}

// GET /api/host/session — public read of the current session (no secrets).
export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('game_sessions')
    .select('*')
    .eq('game_code', GAME_CODE)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ session: data });
}
