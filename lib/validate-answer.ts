import type {
  Slide,
  MultipleChoiceData,
  FillBlankData,
  DragDropData,
} from './types';

// ── Fuzzy text match for fill-in-the-blank ──────────────────────
//  lowercase + trim + allow a single-character typo (Levenshtein ≤ 1).

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const prev = new Array(n + 1);
  const curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= n; j++) prev[j] = curr[j];
  }
  return prev[n];
}

function fuzzyEqual(a: string, b: string): boolean {
  const x = a.trim().toLowerCase();
  const y = b.trim().toLowerCase();
  if (x === y) return true;
  return levenshtein(x, y) <= 1;
}

// ── Server-side correctness check ───────────────────────────────
//  Returns whether the submitted answer is correct for the slide.
//  match / drag_drop are completion games: the client only submits
//  once everything is correctly placed, so we trust isCompleted but
//  also defensively verify drag_drop placements when provided.

export function isAnswerCorrect(
  slide: Slide,
  answerData: Record<string, unknown>
): boolean {
  switch (slide.question_type) {
    case 'multiple_choice': {
      const data = slide.question_data as MultipleChoiceData;
      const selected = answerData.selected_index;
      if (Array.isArray(data.correct_indices) && data.correct_indices.length) {
        return data.correct_indices.includes(selected as number);
      }
      return selected === data.correct_index;
    }

    case 'fill_blank': {
      const data = slide.question_data as FillBlankData;
      const submitted = answerData.answers;
      if (!Array.isArray(submitted)) return false;
      if (submitted.length !== data.blanks.length) return false;
      if (!submitted.every((s) => typeof s === 'string')) return false;

      if (data.any_order) {
        // Each blank must be matched by some unused submitted answer.
        const remaining = [...(submitted as string[])];
        return data.blanks.every((blank) => {
          const idx = remaining.findIndex((s) => fuzzyEqual(s, blank));
          if (idx === -1) return false;
          remaining.splice(idx, 1);
          return true;
        });
      }

      return data.blanks.every((blank, i) =>
        fuzzyEqual(submitted[i] as string, blank)
      );
    }

    case 'drag_drop': {
      const data = slide.question_data as DragDropData;
      // placements: { [itemId]: zoneId }
      const placements = answerData.placements as
        | Record<string, string>
        | undefined;
      if (!placements) {
        // Fall back to the client's completion flag.
        return answerData.completed === true;
      }
      return data.items.every((item) => placements[item.id] === item.correct_zone);
    }

    case 'match':
    case 'bubble_pop':
      // Matching games can only be submitted when fully solved.
      return answerData.completed === true;

    default:
      return false;
  }
}
