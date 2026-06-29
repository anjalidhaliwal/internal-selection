# Internal Selection

**Play along. Learn along.** — a Kahoot-style interactive quiz that syncs with a live BUS 481 *Internal Recruitment* presentation. Students join from their phones, the presenter advances slides from a host dashboard, and points are awarded for speed + correctness.

Built with **Next.js 16 (App Router)**, **Supabase** (Postgres + Realtime), **Tailwind v4**, **Framer Motion**, **@dnd-kit**, and **canvas-confetti**.

---

## 1. Setup

```bash
npm install
cp .env.example .env.local   # then fill in your values
npm run dev
```

### Environment variables (`.env.local`)

| Var | What it is |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key (browser realtime + reads) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role key (server-side writes only — never exposed) |
| `HOST_PASSWORD` | Password the presenter types at `/host` |
| `NEXT_PUBLIC_APP_URL` | Public URL the QR code points to (your deployed URL) |

### Supabase

1. Create a free Supabase project.
2. Open **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql). It creates the tables, the `add_player_points` RPC, RLS read policies, the seed `BUS481` session, and enables Realtime.
3. Copy the URL + keys from **Project Settings → API** into `.env.local`.

> Slides live in [`lib/slides-data.ts`](lib/slides-data.ts) as static config — there is **no** `slides` table. Answers reference slides by integer index.

---

## 2. How it runs

- **Players** open `/`, pick a username, and land on `/play`. The screen follows the session in realtime — lobby → question / discussion / lecture → checkpoint → final results.
- **Presenter** opens `/host`, signs in with `HOST_PASSWORD`, and drives the deck from `/host/[sessionId]`: Next / Back, jump-to-slide, a live "answered N / total" tracker, a live leaderboard, the join QR code, and **Export Scores CSV**.

### Scoring

`lib/scoring.ts` — correct answers earn `1000 × (1 − ratio·0.7)` points, floored at 300, where `ratio` is how late in the time limit you answered. Wrong = 0. Question correctness is validated **server-side** in `/api/answer` (fill-in-the-blank allows a 1-character typo).

---

## 3. Question types

| Type | Component | Interaction |
|---|---|---|
| `multiple_choice` | `MultipleChoice` | Tap one of 2–4 cards; correct/red reveal |
| `fill_blank` | `FillBlank` | Type the missing word(s); fuzzy match |
| `match` | `MatchDefinition` | Tap a term, pop the matching definition bubble |
| `drag_drop` | `DragDrop` | Drag cards into the right zone(s) |

---

## 4. Deploy (Vercel)

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add all the env vars above (set `NEXT_PUBLIC_APP_URL` to the assigned `*.vercel.app` URL).
4. Deploy. Auto-deploys on every push to `main`.

---

## 5. Project layout

```
app/            routes — /, /play, /host, /host/[sessionId], /api/*
components/     ui, questions, feedback, screens, host
hooks/          realtime subscriptions (session, players, answer count)
lib/            supabase clients, types, slides-data, scoring, answer validation
supabase/       schema.sql
```
