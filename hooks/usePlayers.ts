'use client';

import { useEffect, useRef, useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase';
import type { Player } from '@/lib/types';

// Per-instance unique channel suffix — multiple components subscribe to the
// players table at once (play page + lobby/checkpoint/end screens), and
// supabase-js throws if two channels share a topic name.
let channelSeq = 0;

// Subscribes to the players table for a session — powers the lobby list
// and live leaderboard. Sorted by score (desc) then join time.
export function usePlayers(sessionId: string | null | undefined) {
  const [players, setPlayers] = useState<Player[]>([]);
  const cid = useRef<number>(++channelSeq);

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
      .channel(`players-${sessionId}-${cid.current}`)
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
