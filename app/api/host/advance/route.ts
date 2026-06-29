import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { GAME_CODE } from '@/lib/types';
import { FIRST_SLIDE, LAST_SLIDE, getSlide } from '@/lib/slides-data';

// POST /api/host/advance
//  Body: { target?: number, direction?: 'next' | 'prev' }
//  Moves the session to a specific slide (target) or steps by direction.
//  Also syncs `status` to match the slide type so players render the
//  right screen.
export async function POST(request: NextRequest) {
  const password = request.headers.get('x-host-password');
  if (!password || password !== process.env.HOST_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const supabase = getSupabaseAdmin();

  const { data: session, error: findError } = await supabase
    .from('game_sessions')
    .select('*')
    .eq('game_code', GAME_CODE)
    .single();

  if (findError || !session) {
    return NextResponse.json(
      { error: findError?.message ?? 'Session not found' },
      { status: 500 }
    );
  }

  let nextIndex = session.current_slide_index as number;
  if (typeof body.target === 'number') {
    nextIndex = body.target;
  } else if (body.direction === 'prev') {
    nextIndex = session.current_slide_index - 1;
  } else {
    nextIndex = session.current_slide_index + 1;
  }

  nextIndex = Math.max(FIRST_SLIDE, Math.min(LAST_SLIDE, nextIndex));

  // Derive status from the destination slide type.
  const slide = getSlide(nextIndex);
  let status: string = 'active';
  if (slide?.type === 'lobby') status = 'lobby';
  else if (slide?.type === 'checkpoint' || slide?.type === 'wheel') status = 'checkpoint';
  else if (slide?.type === 'end') status = 'ended';

  const { data: updated, error: updateError } = await supabase
    .from('game_sessions')
    .update({ current_slide_index: nextIndex, status })
    .eq('id', session.id)
    .select('*')
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ session: updated });
}
