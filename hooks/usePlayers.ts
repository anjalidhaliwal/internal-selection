'use client';

import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase';
import type { Player } from '@/lib/types';

// Subscribes to the players table for a session — powers the lobby list
// and live leaderboard. Sorted by score (desc) then join time.
export function usePlayers(sessionId: string | null | undefined) {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!sessionId) return;
    const supabase = getSupabaseBrowser();
    let mounted = true;

    async function load() {
      const { data } = await supabase
        .from('players')
        .select('*')
        .eq('session_id', sessionId)
        .order('score', { ascending: false })
        .order('joined_at', { ascending: true });
      if (mounted) setPlayers((data as Player[]) ?? []);
    }
    load();

    const channel = supabase
      .channel(`players-${sessionId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'players', filter: `session_id=eq.${sessionId}` },
        () => load()
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  return players;
}
