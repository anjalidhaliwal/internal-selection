'use client';

import { useEffect, useRef, useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase';

let channelSeq = 0;

// Host-side: live count of answers submitted for a given slide.
export function useAnswerCount(slideIndex: number | null | undefined) {
  const [count, setCount] = useState(0);
  const cid = useRef<number>(++channelSeq);

  useEffect(() => {
    if (slideIndex === null || slideIndex === undefined) {
      setCount(0);
      return;
    }
    const supabase = getSupabaseBrowser();
    let mounted = true;

    async function load() {
      const { count: c } = await supabase
        .from('answers')
        .select('*', { count: 'exact', head: true })
        .eq('slide_index', slideIndex);
      if (mounted) setCount(c ?? 0);
    }
    load();

    const channel = supabase
      .channel(`answers-${slideIndex}-${cid.current}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'answers', filter: `slide_index=eq.${slideIndex}` },
        () => load()
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [slideIndex]);

  return count;
}
