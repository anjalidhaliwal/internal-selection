// ── Domain types ────────────────────────────────────────────────

export type SlideType =
  | 'lobby' // intro / welcome — shows QR + roster
  | 'title' // section title / transition — "eyes up front"
  | 'question' // interactive question for players
  | 'reveal' // answer reveal — recaps the previous question's answer
  | 'discussion' // discussion prompt, no input
  | 'checkpoint' // leaderboard reveal
  | 'break' // timed break
  | 'wheel' // Wheel of Fortune — big final-ish leaderboard
  | 'end' // final results + CSV
  | 'lecture'; // generic display slide

export type QuestionType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'match'
  | 'drag_drop'
  | 'bubble_pop';

export interface MultipleChoiceData {
  question: string;
  options: string[];
  correct_index: number;
  correct_indices?: number[]; // if set, ANY of these counts as correct
  explanation?: string;
}

export interface FillBlankData {
  sentence: string;
  blanks: string[];
  hint?: string;
  any_order?: boolean; // accept the blanks in any order (e.g. "attract / identify")
}

export interface MatchPair {
  term: string;
  definition: string;
}

export interface MatchData {
  pairs: MatchPair[];
}

export interface DragDropZone {
  id: string;
  label: string;
}

export interface DragDropItem {
  id: string;
  content: string;
  correct_zone: string;
}

export interface DragDropData {
  zones: DragDropZone[];
  items: DragDropItem[];
}

export type QuestionData =
  | MultipleChoiceData
  | FillBlankData
  | MatchData
  | DragDropData;

export interface Slide {
  index: number;
  type: SlideType;
  title: string;
  question_type?: QuestionType | null;
  time_limit?: number;
  question_data?: QuestionData;
  prompt?: string; // discussion slides
}

// ── DB row shapes ───────────────────────────────────────────────

export interface GameSession {
  id: string;
  game_code: string;
  current_slide_index: number;
  status: 'lobby' | 'active' | 'checkpoint' | 'ended';
  created_at: string;
}

export interface Player {
  id: string;
  session_id: string;
  username: string;
  score: number;
  is_active: boolean;
  joined_at: string;
}

export interface AnswerRow {
  id: string;
  player_id: string;
  slide_index: number;
  answer_data: Record<string, unknown> | null;
  is_correct: boolean | null;
  points_earned: number;
  time_taken_ms: number | null;
  answered_at: string;
}

// What the player's client submits to /api/answer
export interface AnswerSubmission {
  player_id: string;
  slide_index: number;
  answer_data: Record<string, unknown>;
  time_taken_ms: number;
}

export const GAME_CODE = 'BUS481';
