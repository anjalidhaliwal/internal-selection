'use client';

import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase';
import { GAME_CODE, type GameSession } from '@/lib/types';

// Subscribes to the single BUS481 game_sessions row. Players watch
// current_slide_index + status to know what to render.
export function useGameSession() {
  const [session, setSession] = useState<GameSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    let mounted = true;

    async function load() {
      const { data } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('game_code', GAME_CODE)
        .maybeSingle();
      if (mounted) {
        setSession((data as GameSession) ?? null);
        setLoading(false);
      }
    }
    load();

    const channel = supabase
      .channel('game-session')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'game_sessions' },
        (payload) => {
          const row = payload.new as GameSession;
          if (row?.game_code === GAME_CODE) setSession(row);
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { session, loading };
}
