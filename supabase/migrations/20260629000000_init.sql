-- ════════════════════════════════════════════════════════════════
--  Internal Selection — Supabase schema
--  Run this in the Supabase SQL editor (Dashboard → SQL Editor).
--  Slides live in lib/slides-data.ts (static config), so there is NO
--  `slides` table — answers reference slides by their integer index.
-- ════════════════════════════════════════════════════════════════

-- ── Tables ──────────────────────────────────────────────────────

create table if not exists game_sessions (
  id                  uuid primary key default gen_random_uuid(),
  game_code           text unique not null,        -- e.g. "BUS481"
  current_slide_index integer default 0,
  status              text default 'lobby',         -- lobby | active | checkpoint | ended
  created_at          timestamptz default now()
);

create table if not exists players (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid references game_sessions(id) on delete cascade,
  username    text not null,
  score       integer default 0,
  is_active   boolean default true,
  joined_at   timestamptz default now(),
  unique(session_id, username)                       -- same username can rejoin
);

create table if not exists answers (
  id            uuid primary key default gen_random_uuid(),
  player_id     uuid references players(id) on delete cascade,
  slide_index   integer not null,                    -- references SLIDES[index] in lib/slides-data.ts
  answer_data   jsonb,
  is_correct    boolean,
  points_earned integer default 0,
  time_taken_ms integer,
  answered_at   timestamptz default now(),
  unique(player_id, slide_index)                     -- one scored answer per question
);

create index if not exists answers_slide_idx on answers (slide_index);
create index if not exists players_session_idx on players (session_id);

-- ── Atomic score increment (avoids read-modify-write races) ─────

create or replace function add_player_points(p_player_id uuid, p_points integer)
returns void
language sql
as $$
  update players set score = score + p_points where id = p_player_id;
$$;

-- ── Seed the single classroom session ───────────────────────────

insert into game_sessions (game_code, current_slide_index, status)
values ('BUS481', 0, 'lobby')
on conflict (game_code) do nothing;

-- ── Row Level Security ──────────────────────────────────────────
--  Reads are public (anon) so the browser realtime subscriptions
--  work. All writes go through API routes using the service-role
--  key, which bypasses RLS. (Per project convention: enable RLS
--  with a permissive read policy rather than leaving it off.)

alter table game_sessions enable row level security;
alter table players       enable row level security;
alter table answers       enable row level security;

drop policy if exists "public read sessions" on game_sessions;
create policy "public read sessions" on game_sessions for select using (true);

drop policy if exists "public read players" on players;
create policy "public read players" on players for select using (true);

drop policy if exists "public read answers" on answers;
create policy "public read answers" on answers for select using (true);

-- ── Realtime ────────────────────────────────────────────────────
--  Enable realtime broadcast for the three tables players subscribe to.

alter publication supabase_realtime add table game_sessions;
alter publication supabase_realtime add table players;
alter publication supabase_realtime add table answers;
