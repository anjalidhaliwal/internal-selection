import type { Slide } from './types';

// ════════════════════════════════════════════════════════════════
//  Master content — BUS 481 Internal Recruitment interactive deck.
//  Every content slide carries its question; discussion slides carry
//  only a `prompt`. Slides are served statically (no DB seeding).
//
//  index 0 is the lobby/title slide. The host advances from there.
// ════════════════════════════════════════════════════════════════

export const SLIDES: Slide[] = [
  // ── LOBBY / TITLE ──────────────────────────────────
  {
    index: 0,
    type: 'lecture',
    title: 'Internal Recruitment',
    question_type: null,
  },

  // ── SECTION 6.1 — STRATEGY, MOBILITY, OPEN/CLOSED ──
  {
    index: 1,
    type: 'question',
    title: 'What is Internal Recruitment?',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Internal recruitment means filling a job with someone who is already ___ the company.',
      options: ['Outside', 'Inside', 'Retiring from', 'Interviewing at'],
      correct_index: 1,
    },
  },
  {
    index: 2,
    type: 'question',
    title: 'Advantages of Internal Hires',
    question_type: 'drag_drop',
    time_limit: 30,
    question_data: {
      zones: [
        { id: 'advantage', label: '✅ Advantage' },
        { id: 'not', label: '❌ Not an advantage' },
      ],
      items: [
        { id: '1', content: 'Knows the culture', correct_zone: 'advantage' },
        { id: '2', content: 'Less training needed', correct_zone: 'advantage' },
        { id: '3', content: 'Brings brand new outside ideas', correct_zone: 'not' },
      ],
    },
  },
  {
    index: 3,
    type: 'question',
    title: 'Strategic Recruitment Planning',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'What does KSAO stand for?',
      options: [
        'Knowledge, Skills, Abilities, Other characteristics',
        'Keep Searching, Always Onboard',
        'Key Staff Allocation Office',
        'Knowledge of Salary and Operations',
      ],
      correct_index: 0,
    },
  },
  {
    index: 4,
    type: 'question',
    title: 'Strategic Goals',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Strategic recruitment tries to find the right ___, right ___, at the right ___.',
      options: [
        'Salary, benefits, time',
        'Type of person, number of people, time',
        'Manager, job, department',
        'Resume, interview, offer',
      ],
      correct_index: 1,
    },
  },
  {
    index: 5,
    type: 'question',
    title: 'Mobility Paths',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'A promotion ladder where you can only move UP is called a ___ mobility path.',
      options: ['Alternative', 'Lateral', 'Hierarchical', 'Rotational'],
      correct_index: 2,
    },
  },
  {
    index: 6,
    type: 'question',
    title: 'Hierarchical vs Alternative',
    question_type: 'match',
    time_limit: 25,
    question_data: {
      pairs: [
        { term: 'Hierarchical', definition: 'Move upward, like a promotion ladder' },
        { term: 'Alternative', definition: 'Move in any direction: up, down, or sideways' },
      ],
    },
  },
  {
    index: 7,
    type: 'discussion',
    title: 'Discussion 💬',
    prompt: 'What is an example of some "prizes" an employee might receive with a promotion?',
  },
  {
    index: 8,
    type: 'question',
    title: 'Pros & Cons of Hierarchical',
    question_type: 'drag_drop',
    time_limit: 30,
    question_data: {
      zones: [
        { id: 'pro', label: '👍 Pro' },
        { id: 'con', label: '👎 Con' },
      ],
      items: [
        { id: '1', content: 'Easy to know where to look for candidates', correct_zone: 'pro' },
        { id: '2', content: 'Not very flexible', correct_zone: 'con' },
        { id: '3', content: 'May not get the best person', correct_zone: 'con' },
        { id: '4', content: 'Clear promotion path for employees', correct_zone: 'pro' },
      ],
    },
  },
  {
    index: 9,
    type: 'question',
    title: 'Alternative Mobility',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Which of these is an example of alternative mobility?',
      options: [
        'Getting promoted straight up the ladder',
        'A job swap between two departments',
        'Being hired from outside the company',
        'Retiring early',
      ],
      correct_index: 1,
    },
  },
  {
    index: 10,
    type: 'question',
    title: 'Policy Development',
    question_type: 'fill_blank',
    time_limit: 20,
    question_data: {
      sentence: 'Mobility policies must meet organizational ___, be seen as fair, and be easy to administer.',
      blanks: ['goals'],
    },
  },
  {
    index: 11,
    type: 'question',
    title: 'Closed Recruitment',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'In a CLOSED recruitment system, who knows about the job opening?',
      options: [
        'Everyone in the company',
        'Only HR and managers with a vacancy',
        'External candidates only',
        'The public via LinkedIn',
      ],
      correct_index: 1,
    },
  },
  {
    index: 12,
    type: 'question',
    title: 'Open Recruitment',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'An OPEN recruitment system lets employees ___ for internal vacancies.',
      options: ['Vote', 'Negotiate', 'Apply', 'Ignore'],
      correct_index: 2,
    },
  },
  {
    index: 13,
    type: 'question',
    title: 'Hybrid System',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'A hybrid recruitment system uses ___ systems at the same time.',
      options: ['Open and external', 'Open and closed', 'Closed and external', 'Online and offline'],
      correct_index: 1,
    },
  },
  {
    index: 14,
    type: 'question',
    title: 'Open, Closed, or Hybrid? 🤔',
    question_type: 'multiple_choice',
    time_limit: 25,
    question_data: {
      question:
        'A supervisor quietly picks two employees they already have in mind for a Systems Analyst role. No posting goes up. This is:',
      options: ['Open', 'Closed', 'Hybrid', 'External'],
      correct_index: 1,
      explanation: 'Only a few people are involved and no vacancy is posted — a closed system.',
    },
  },
  {
    index: 15,
    type: 'question',
    title: 'Open, Closed, or Hybrid? 🤔',
    question_type: 'multiple_choice',
    time_limit: 25,
    question_data: {
      question: 'A Senior Accountant vacancy is posted on the company intranet. Anyone can apply. This is:',
      options: ['Open', 'Closed', 'Hybrid', 'External'],
      correct_index: 0,
      explanation: 'All employees have equal access and visibility — an open system.',
    },
  },
  {
    index: 16,
    type: 'question',
    title: 'Open, Closed, or Hybrid? 🤔',
    question_type: 'multiple_choice',
    time_limit: 25,
    question_data: {
      question: 'HR pre-selects 3 people from the talent pipeline AND posts the role so others can apply too. This is:',
      options: ['Open', 'Closed', 'Hybrid', 'External'],
      correct_index: 2,
      explanation: 'A closed search AND an open posting happen at once — hybrid!',
    },
  },
  {
    index: 17,
    type: 'question',
    title: 'Organization & Admin',
    question_type: 'match',
    time_limit: 25,
    question_data: {
      pairs: [
        { term: 'Recruitment Guide', definition: 'Formal document laying out the full hiring process' },
        { term: 'Lead Time', definition: 'Filling a role internally creates a new vacancy where that person left' },
      ],
    },
  },
  {
    index: 18,
    type: 'question',
    title: "What's the concern? 🚨",
    question_type: 'multiple_choice',
    time_limit: 30,
    question_data: {
      question:
        'HR posts a Finance role externally before telling internal placement. A strong internal candidate feels overlooked and quits. What went wrong?',
      options: ['Budget', 'Coordination', 'Lead Time', 'Time Sequence'],
      correct_index: 1,
      explanation: 'Internal and external teams didn’t work together from the start — a coordination failure.',
    },
  },

  // ── CHECKPOINT 1 ───────────────────────────────────
  {
    index: 19,
    type: 'checkpoint',
    title: '🏆 Checkpoint 1 — Leaderboard',
  },

  // ── SECTION 6.2 / 6.3 — REACTIONS & COMMUNICATION ──
  {
    index: 20,
    type: 'question',
    title: 'Internal vs External Applicants',
    question_type: 'drag_drop',
    time_limit: 30,
    question_data: {
      zones: [
        { id: 'internal', label: '🏢 Internal' },
        { id: 'external', label: '🌐 External' },
      ],
      items: [
        { id: '1', content: 'Can simply leave if rejected', correct_zone: 'external' },
        { id: '2', content: 'Already knows the culture', correct_zone: 'internal' },
        { id: '3', content: 'Short-term career focus', correct_zone: 'external' },
        { id: '4', content: 'Long-term career focus', correct_zone: 'internal' },
      ],
    },
  },
  {
    index: 21,
    type: 'question',
    title: 'Perceived Fairness',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'An internal applicant who feels the promotion process was UNFAIR is most likely to:',
      options: [
        'Sue the company immediately',
        'Stay but become less motivated and engaged',
        'Get promoted anyway',
        'Ask for a raise instead',
      ],
      correct_index: 1,
    },
  },
  {
    index: 22,
    type: 'question',
    title: 'Types of Justice',
    question_type: 'match',
    time_limit: 30,
    question_data: {
      pairs: [
        { term: 'Distributive justice', definition: 'Was the OUTCOME fair? (Did the best person get the job?)' },
        { term: 'Procedural justice', definition: 'Was the PROCESS fair? (Did everyone get the same chance?)' },
        { term: 'Interactional justice', definition: 'Was the person treated RESPECTFULLY?' },
      ],
    },
  },
  {
    index: 23,
    type: 'question',
    title: 'When Denied a Promotion',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: "When someone doesn't get a promotion, a good company should:",
      options: [
        'Ignore it and move on',
        "Tell them they weren't good enough",
        'Explain why and give guidance on how to improve',
        'Offer them a pay cut instead',
      ],
      correct_index: 2,
    },
  },
  {
    index: 24,
    type: 'question',
    title: 'Quick Poll — Satisfaction 📊',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Which has a bigger impact on employee satisfaction?',
      options: ['Getting the promotion', 'Feeling the process was fair'],
      correct_index: 1,
      explanation: 'Perceived fairness of the process often matters more than the outcome itself!',
    },
  },
  {
    index: 25,
    type: 'discussion',
    title: 'Discussion 💬',
    prompt:
      "Think of a time you (or someone you know) didn't get an internal promotion. How was it communicated, and what would have made it feel fairer?",
  },
  {
    index: 26,
    type: 'question',
    title: 'Three Message Types',
    question_type: 'match',
    time_limit: 25,
    question_data: {
      pairs: [
        { term: 'Realistic', definition: 'Shows the job as it really is, good AND bad' },
        { term: 'Targeted', definition: "Matches the job specifically to this applicant's needs" },
        { term: 'Branded', definition: "Sells the team's culture and values" },
      ],
    },
  },
  {
    index: 27,
    type: 'question',
    title: 'RJPs',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'RJP stands for:',
      options: [
        'Realistic Job Preview',
        'Recruitment Job Posting',
        'Required Job Performance',
        'Rapid Job Placement',
      ],
      correct_index: 0,
    },
  },
  {
    index: 28,
    type: 'question',
    title: 'The Word-of-Mouth Problem',
    question_type: 'drag_drop',
    time_limit: 25,
    question_data: {
      zones: [{ id: 'problem', label: '⚠️ Problem with word of mouth' }],
      items: [
        { id: '1', content: 'Not everyone hears about it (Selective)', correct_zone: 'problem' },
        { id: '2', content: 'Information gets distorted (Inaccurate)', correct_zone: 'problem' },
        { id: '3', content: 'Shared inconsistently (Haphazard)', correct_zone: 'problem' },
      ],
    },
  },
  {
    index: 29,
    type: 'question',
    title: 'Quick Poll — Message Type 📊',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'For an internal promotion, which message type would YOU choose?',
      options: ['Realistic', 'Targeted', 'Branded', 'It depends'],
      correct_index: 3,
      explanation: "The best answer is 'It depends' — it depends on the role, applicant, and context!",
    },
  },
  {
    index: 30,
    type: 'discussion',
    title: 'Discussion 💬',
    prompt:
      "Word of mouth can't be fully eliminated. How could an organization reduce its negative effects without trying to eliminate it completely?",
  },

  // ── CHECKPOINT 2 ───────────────────────────────────
  {
    index: 31,
    type: 'checkpoint',
    title: '🏆 Checkpoint 2 — Leaderboard',
  },

  // ── SECTION 6.4 — APPLICANT SOURCING ───────────────
  {
    index: 32,
    type: 'question',
    title: 'Position vs System Based',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Job postings, nominations, and temp pools are all examples of ___ sourcing.',
      options: ['System-based', 'Position-based', 'External', 'Strategic'],
      correct_index: 1,
    },
  },
  {
    index: 33,
    type: 'question',
    title: 'Sourcing Methods',
    question_type: 'drag_drop',
    time_limit: 30,
    question_data: {
      zones: [
        { id: 'position', label: '📌 Position-based' },
        { id: 'system', label: '🔄 System-based' },
      ],
      items: [
        { id: '1', content: 'Job Posting', correct_zone: 'position' },
        { id: '2', content: 'Nominations', correct_zone: 'position' },
        { id: '3', content: 'Succession Planning', correct_zone: 'system' },
        { id: '4', content: 'Talent Management System', correct_zone: 'system' },
      ],
    },
  },
  {
    index: 34,
    type: 'question',
    title: 'Job Posting Pitfall',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: "A 'bagged' job means:",
      options: [
        'The job was advertised on a shopping app',
        'Everyone applied and it took forever to screen them',
        'Employees suspect someone was already chosen before the posting went up',
        'The job was cancelled before anyone was hired',
      ],
      correct_index: 2,
    },
  },
  {
    index: 35,
    type: 'question',
    title: 'Talent Management System',
    question_type: 'fill_blank',
    time_limit: 25,
    question_data: {
      sentence: 'A talent management system tracks employee ___ across the organization to support internal recruitment.',
      blanks: ['KSAOs'],
    },
  },
  {
    index: 36,
    type: 'question',
    title: 'Succession Planning',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Who should LEAD CEO succession planning according to best practice?',
      options: ['The current CEO', 'The HR department', 'The board of directors', 'External consultants'],
      correct_index: 2,
    },
  },
  {
    index: 37,
    type: 'question',
    title: 'Measuring Success',
    question_type: 'match',
    time_limit: 25,
    question_data: {
      pairs: [
        { term: 'Quantity', definition: 'Did enough qualified people apply?' },
        { term: 'Quality', definition: 'Were the applicants actually qualified?' },
      ],
    },
  },
  {
    index: 38,
    type: 'question',
    title: 'Quick Poll — Sourcing 📊',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'If YOU were filling a leadership role, which method would you pick first?',
      options: ['Job Posting', 'Nominations', 'Talent Management System', 'Succession Plan'],
      correct_index: 2,
      explanation: 'A Talent Management System proactively identifies ready candidates — the most strategic choice.',
    },
  },
  {
    index: 39,
    type: 'discussion',
    title: 'Discussion 💬',
    prompt: 'Which sourcing method did you choose? What are its advantages and disadvantages?',
  },

  // ── CHECKPOINT 3 ───────────────────────────────────
  {
    index: 40,
    type: 'checkpoint',
    title: '🏆 Checkpoint 3 — Leaderboard',
  },

  // ── SECTION 6.5 / 6.6 — SELECTION & LEGAL ──────────
  {
    index: 41,
    type: 'question',
    title: 'Transition to Selection',
    question_type: 'fill_blank',
    time_limit: 20,
    question_data: {
      sentence: 'Recruitment = ___ applicants. Selection = ___ the best one.',
      blanks: ['attract', 'identify'],
      any_order: true,
    },
  },
  {
    index: 42,
    type: 'question',
    title: 'What Happens After Applying',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'After an employee applies for an internal role, the company evaluates their:',
      options: ['Salary history', 'KSAOs', 'Social media', 'Commute distance'],
      correct_index: 1,
    },
  },
  {
    index: 43,
    type: 'question',
    title: 'Preparing for Promotion',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Successful promotions begin:',
      options: [
        'The day the vacancy is posted',
        'When the employee asks their manager',
        'Long before a position becomes vacant',
        'After the employee gets rejected once',
      ],
      correct_index: 2,
    },
  },
  {
    index: 44,
    type: 'question',
    title: 'Legal Issues',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Internal promotions must be all of the following EXCEPT:',
      options: ['Fair', 'Transparent', 'Guaranteed to go to the most senior person', 'Non-discriminatory'],
      correct_index: 2,
    },
  },
  {
    index: 45,
    type: 'question',
    title: 'Affirmative Action Programs',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'An Affirmative Action Program (AAP) is designed to:',
      options: [
        'Guarantee promotions for underrepresented groups',
        'Remove barriers and expand opportunities for underrepresented groups',
        "Replace the hiring manager's judgment",
        'Speed up the recruitment process',
      ],
      correct_index: 1,
    },
  },
  {
    index: 46,
    type: 'question',
    title: "What AAP Is / Isn't",
    question_type: 'drag_drop',
    time_limit: 30,
    question_data: {
      zones: [
        { id: 'is', label: '✅ What AAP IS' },
        { id: 'not', label: '❌ What AAP is NOT' },
      ],
      items: [
        { id: '1', content: 'Removing barriers', correct_zone: 'is' },
        { id: '2', content: 'Expanding opportunities', correct_zone: 'is' },
        { id: '3', content: 'Guaranteed promotions', correct_zone: 'not' },
        { id: '4', content: 'Hiring unqualified people', correct_zone: 'not' },
      ],
    },
  },
  {
    index: 47,
    type: 'question',
    title: 'Bona Fide Seniority',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'A seniority-based promotion system is generally legal as long as it was not created with ___ intent.',
      options: ['Financial', 'Discriminatory', 'Competitive', 'Political'],
      correct_index: 1,
    },
  },
  {
    index: 48,
    type: 'question',
    title: 'Glass Ceiling',
    question_type: 'fill_blank',
    time_limit: 20,
    question_data: {
      sentence: 'The glass ceiling refers to ___ barriers that stop qualified people, especially women, from reaching senior leadership.',
      blanks: ['invisible'],
      hint: 'These barriers are hard to see but very real',
    },
  },
  {
    index: 49,
    type: 'question',
    title: 'Barriers & Solutions',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Which of these helps break the glass ceiling?',
      options: [
        'Keeping promotion criteria secret',
        'Mentorship and leadership development programs',
        'Promoting only the most senior employees',
        'Reducing the number of internal job postings',
      ],
      correct_index: 1,
    },
  },

  // ── FINAL CHECKPOINT + END ─────────────────────────
  {
    index: 50,
    type: 'checkpoint',
    title: '🏆 Final Checkpoint — Full Leaderboard 🎉',
  },
  {
    index: 51,
    type: 'lecture',
    title: '🎉 Thanks everyone!',
    question_type: null,
  },
];

export const TOTAL_SLIDES = SLIDES.length;

export function getSlide(index: number): Slide | undefined {
  return SLIDES.find((s) => s.index === index);
}
