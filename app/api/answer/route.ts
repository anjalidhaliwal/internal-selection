import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getSlide } from '@/lib/slides-data';
import { calculatePoints } from '@/lib/scoring';
import { isAnswerCorrect } from '@/lib/validate-answer';

// POST /api/answer
//  Body: { player_id, slide_index, answer_data, time_taken_ms }
//  Validates correctness server-side, scores it, records the answer
//  (one per player+slide), and atomically bumps the player's score.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { player_id, slide_index, answer_data, time_taken_ms } = body;

  if (typeof player_id !== 'string' || typeof slide_index !== 'number') {
    return NextResponse.json(
      { error: 'player_id and slide_index are required' },
      { status: 400 }
    );
  }

  const slide = getSlide(slide_index);
  if (!slide || !slide.question_type) {
    return NextResponse.json(
      { error: 'Slide is not an answerable question' },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  // Idempotency: if this player already answered this slide, return the
  // stored result without re-scoring.
  const { data: existing } = await supabase
    .from('answers')
    .select('*')
    .eq('player_id', player_id)
    .eq('slide_index', slide_index)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({
      already_answered: true,
      is_correct: existing.is_correct,
      points_earned: existing.points_earned,
    });
  }

  const isCorrect = isAnswerCorrect(slide, answer_data ?? {});
  const timeLimit = slide.time_limit ?? 25;
  const points = calculatePoints(timeLimit, Number(time_taken_ms) || 0, isCorrect);

  // Insert the answer. The unique(player_id, slide_index) constraint is a
  // second line of defense against double scoring under a race.
  const { error: insertError } = await supabase.from('answers').insert({
    player_id,
    slide_index,
    answer_data: answer_data ?? {},
    is_correct: isCorrect,
    points_earned: points,
    time_taken_ms: Number(time_taken_ms) || null,
  });

  if (insertError) {
    // Likely a duplicate (already answered) — treat as idempotent success.
    if (insertError.code === '23505') {
      return NextResponse.json({ already_answered: true });
    }
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  if (points > 0) {
    const { error: rpcError } = await supabase.rpc('add_player_points', {
      p_player_id: player_id,
      p_points: points,
    });
    if (rpcError) {
      return NextResponse.json({ error: rpcError.message }, { status: 500 });
    }
  }

  const data = slide.question_data as Record<string, unknown> | undefined;
  return NextResponse.json({
    is_correct: isCorrect,
    points_earned: points,
    // Send back the correct answer so the client can reveal it.
    correct_index: data?.correct_index ?? null,
    correct_answers: data?.blanks ?? null,
    explanation: data?.explanation ?? null,
  });
}
