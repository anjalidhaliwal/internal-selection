import type { Slide, SlideType } from './types';

// ════════════════════════════════════════════════════════════════
//  Master content — BUS 481 Internal Recruitment, full 103-slide deck.
//
//  The app mirrors the Google Slides deck 1:1 so the presenter advances
//  both in lockstep. That means answer-reveal (⏭️), title/transition
//  (🎬), break (☕) and discussion (💬) slides all appear here too — not
//  just the interactive questions. The 4 checkpoint leaderboards are
//  inserted at their noted positions (after deck 44 / 61 / 76 / 91).
//
//  Indices are assigned from array order (1-based) — never hand-numbered.
// ════════════════════════════════════════════════════════════════

type RawSlide = Omit<Slide, 'index'>;

const t = (type: SlideType, title: string): RawSlide => ({ type, title });
const reveal = (): RawSlide => ({ type: 'reveal', title: 'Answer' });
const discuss = (title: string, prompt: string): RawSlide => ({
  type: 'discussion',
  title,
  prompt,
});

const RAW: RawSlide[] = [
  // ── INTRO (deck 1–3) ───────────────────────────────
  t('lobby', 'Internal Recruitment'),
  t('title', 'Learning Objectives'),
  t('lobby', 'Welcome — enter your name to join! 🎉'),

  // ── 6.1 STRATEGY & MOBILITY ────────────────────────
  // deck 4
  {
    type: 'question',
    title: 'What is Internal Recruitment?',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Internal recruitment means filling a job with someone who is already ___ the company.',
      options: ['Outside', 'Inside', 'Leaving', 'New to'],
      correct_index: 1,
    },
  },
  reveal(), // deck 5
  // deck 6
  {
    type: 'question',
    title: 'Strategic Recruitment Planning',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'KSAO stands for Knowledge, Skills, Abilities, and ___.',
      options: ['Outcomes', 'Other characteristics', 'Objectives', 'Opinions'],
      correct_index: 1,
    },
  },
  // deck 7
  {
    type: 'question',
    title: 'Strategic Internal Recruitment Goals',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Strategic internal recruitment sets goals around three things. Which is NOT one of them?',
      options: ['Right type of applicant', 'Right number', 'Right time', 'Right salary'],
      correct_index: 3,
    },
  },
  // deck 8
  {
    type: 'question',
    title: 'Mobility Paths',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Mobility in HR refers to how employees ___ within the organization.',
      options: ['Get paid', 'Move', 'Are fired', 'Are trained'],
      correct_index: 1,
    },
  },
  // deck 9
  {
    type: 'question',
    title: 'Types of Mobility Paths',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'There are two types of mobility paths. Which pair is correct?',
      options: ['Hierarchical and Alternative', 'Open and Closed', 'Internal and External', 'Fast and Slow'],
      correct_index: 0,
    },
  },
  // deck 10
  {
    type: 'question',
    title: 'Hierarchical Mobility Paths',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Hierarchical mobility is best described as a ___ ladder.',
      options: ['Pay', 'Promotion', 'Training', 'Networking'],
      correct_index: 1,
    },
  },
  // deck 11
  {
    type: 'question',
    title: "What is an example of 'prizes'?",
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: "Which of these is a 'prize' an employee might get from a promotion? (pick the best one)",
      options: ['A longer commute', 'Higher pay and a new title', 'More meetings', 'Less vacation'],
      correct_index: 1,
    },
  },
  reveal(), // deck 12
  // deck 13
  {
    type: 'question',
    title: 'Lateral Moves',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'A lateral move helps an employee become more ___.',
      options: ['Senior', 'Well-rounded', 'Expensive', 'Specialized only'],
      correct_index: 1,
    },
  },
  // deck 14
  {
    type: 'question',
    title: 'Pros & Cons of Hierarchical Mobility',
    question_type: 'drag_drop',
    time_limit: 30,
    question_data: {
      zones: [
        { id: 'pro', label: '👍 Pro' },
        { id: 'con', label: '👎 Con' },
      ],
      items: [
        { id: '1', content: 'Easy to identify where to look for candidates', correct_zone: 'pro' },
        { id: '2', content: 'For promotions, look at the next level down', correct_zone: 'pro' },
        { id: '3', content: 'Not very flexible', correct_zone: 'con' },
        { id: '4', content: 'May not get the best person', correct_zone: 'con' },
      ],
    },
  },
  reveal(), // deck 15
  t('title', 'Transition'), // deck 16 (empty)
  // deck 17
  {
    type: 'question',
    title: 'Alternative Mobility Paths',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Alternative mobility paths allow employees to move in which directions?',
      options: ['Only upward', 'Up, down, and sideways', 'Only sideways', 'Only downward'],
      correct_index: 1,
    },
  },
  t('title', 'Transition'), // deck 18 (empty)
  discuss('Discussion 💬', 'Where have YOU seen alternative mobility paths in real life or in a workplace you know?'), // deck 19
  // deck 20
  {
    type: 'question',
    title: 'Meaningful Work',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'If an organization has limited promotion opportunities, what is the biggest risk?',
      options: ['Employees work harder', 'Turnover of good employees', 'Lower salaries', 'More job postings'],
      correct_index: 1,
    },
  },
  // deck 21
  {
    type: 'question',
    title: 'Policy Development',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'An effective mobility policy must be seen as ___ by employees.',
      options: ['Complicated', 'Fair', 'Secret', 'Optional'],
      correct_index: 1,
    },
  },
  // deck 22
  {
    type: 'question',
    title: 'Policy Implementation',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Policy implementation should match the components of ___.',
      options: ['External hiring', 'Policy creation', 'Budget planning', 'The recruitment guide'],
      correct_index: 1,
    },
  },

  // ── CLOSED / OPEN / HYBRID ─────────────────────────
  t('title', 'Closed, Open & Hybrid'), // deck 23
  // deck 24
  {
    type: 'question',
    title: 'Closed Internal Recruitment',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'In a CLOSED system, who knows about the job opening?',
      options: ['Everyone', 'Only HR and managers with a vacancy', 'The public', 'External recruiters only'],
      correct_index: 1,
    },
  },
  // deck 25
  {
    type: 'question',
    title: 'Open Internal Recruitment',
    question_type: 'drag_drop',
    time_limit: 30,
    question_data: {
      zones: [
        { id: 'pro', label: '✅ Pro of Open' },
        { id: 'con', label: '❌ Con of Open' },
      ],
      items: [
        { id: '1', content: 'Minimizes favoritism', correct_zone: 'pro' },
        { id: '2', content: 'Uncovers hidden talent', correct_zone: 'pro' },
        { id: '3', content: 'Creates unwanted competition', correct_zone: 'con' },
        { id: '4', content: 'Very time-consuming to screen everyone', correct_zone: 'con' },
      ],
    },
  },
  // deck 26
  {
    type: 'question',
    title: 'Hybrid System',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'The BIGGEST disadvantage of a hybrid system is that it is:',
      options: ['Too secretive', 'Time-consuming and costly', 'Only for small companies', 'Not very thorough'],
      correct_index: 1,
    },
  },
  discuss('Discussion 💬', 'Based on the Serhant examples — which system do you think works best in a competitive sales environment, and why?'), // deck 27
  // deck 28
  {
    type: 'question',
    title: 'Choosing Among Open, Closed, Hybrid',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'When should you use a CLOSED system? When managers need someone to start ___.',
      options: ['Eventually', 'Immediately', 'Next year', 'After external search'],
      correct_index: 1,
    },
  },
  // deck 29
  {
    type: 'question',
    title: 'Open, Closed, or Hybrid? 🤔',
    question_type: 'multiple_choice',
    time_limit: 25,
    question_data: {
      question: 'A supervisor quietly picks two employees for a role, no posting. This is:',
      options: ['Open', 'Closed', 'Hybrid', 'External'],
      correct_index: 1,
      explanation: 'Only a few people involved, no posting — a closed system.',
    },
  },
  reveal(), // deck 30
  // deck 31
  {
    type: 'question',
    title: 'Open, Closed, or Hybrid? 🤔',
    question_type: 'multiple_choice',
    time_limit: 25,
    question_data: {
      question: 'A vacancy is posted on the intranet, any employee can apply. This is:',
      options: ['Open', 'Closed', 'Hybrid', 'External'],
      correct_index: 0,
      explanation: 'Equal access and visibility for all employees — open.',
    },
  },
  reveal(), // deck 32
  // deck 33
  {
    type: 'question',
    title: 'Open, Closed, or Hybrid? 🤔',
    question_type: 'multiple_choice',
    time_limit: 25,
    question_data: {
      question: 'HR pre-selects talent AND posts the role publicly internally. This is:',
      options: ['Open', 'Closed', 'Hybrid', 'External'],
      correct_index: 2,
      explanation: 'A closed search AND an open posting at once — hybrid.',
    },
  },
  reveal(), // deck 34
  // deck 35
  {
    type: 'question',
    title: 'Organization & Administration',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Administrative matters in internal recruitment include coordination, budget, and ___.',
      options: ['Job offers', 'Recruitment guide', 'Performance reviews', 'Exit interviews'],
      correct_index: 1,
    },
  },
  // deck 36
  {
    type: 'question',
    title: 'Coordination',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: "What happens if internal and external teams DON'T coordinate before the candidate search?",
      options: ['Nothing much', 'Disastrous results can occur', 'It speeds things up', 'Costs go down'],
      correct_index: 1,
    },
  },
  // deck 37
  {
    type: 'question',
    title: 'Budget',
    question_type: 'multiple_choice',
    time_limit: 25,
    question_data: {
      question: 'Sometimes internal recruitment costs MORE than external. Why?',
      options: [
        'Internal candidates demand higher pay',
        'Rejected internal candidates need career counseling',
        'Job postings are more expensive internally',
        'Internal candidates take longer to interview',
      ],
      correct_index: 1,
    },
  },
  // deck 38
  {
    type: 'question',
    title: 'Recruitment Guide',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'A recruitment guide is a formal document that details the full process for attracting applicants to a ___.',
      options: ['Training program', 'Vacant job', 'New company', 'Performance review'],
      correct_index: 1,
    },
  },
  // deck 39
  {
    type: 'question',
    title: 'Lead Time Concerns',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'When you fill a role internally, what always happens?',
      options: ['Nothing changes', 'A new vacancy is created where that person came from', 'Costs go to zero', 'HR takes a break'],
      correct_index: 1,
    },
  },
  // deck 40
  {
    type: 'question',
    title: 'Time Sequence Concerns',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'When filling a vacancy, most organizations start with ___ recruitment, then move to external.',
      options: ['Government', 'Internal', 'Agency', 'Campus'],
      correct_index: 1,
    },
  },
  // deck 41
  {
    type: 'question',
    title: 'What is the concern? 🚨',
    question_type: 'multiple_choice',
    time_limit: 30,
    question_data: {
      question: 'HR posts a Finance role externally before telling the internal team. Strong internal candidates feel overlooked, one quits. The problem is:',
      options: ['Budget', 'Coordination', 'Lead Time', 'Time Sequence'],
      correct_index: 1,
      explanation: 'Internal and external teams never aligned — a coordination failure.',
    },
  },
  reveal(), // deck 42
  // deck 43
  {
    type: 'question',
    title: 'What is the concern? 🚨',
    question_type: 'multiple_choice',
    time_limit: 30,
    question_data: {
      question: 'Internal and external candidates are tied, no policy exists, everyone disagrees, both candidates withdraw. The problem is:',
      options: ['Budget', 'Coordination', 'Lead Time', 'Time Sequence'],
      correct_index: 3,
      explanation: 'The internal and external searches were run at the same time with no agreed order — a time-sequence problem.',
    },
  },
  reveal(), // deck 44

  // ── 🏆 CHECKPOINT 1 (after deck 44) ────────────────
  t('checkpoint', '🏆 Checkpoint 1 — Section 6.1'),

  t('break', '☕ 5-Minute Break'), // deck 45

  // ── 6.2 APPLICANT REACTIONS ────────────────────────
  t('title', '6.2 Applicant Reactions'), // deck 46
  // deck 47
  {
    type: 'question',
    title: 'Internal Applicants See the Job Differently',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Why do internal applicants think about promotions with a LONGER time horizon?',
      options: ['They have less to lose', 'They already know the culture and consequences', "They're older", 'They earn more'],
      correct_index: 1,
    },
  },
  // deck 48
  {
    type: 'question',
    title: 'Why Internal Applicants Are Different',
    question_type: 'drag_drop',
    time_limit: 30,
    question_data: {
      zones: [
        { id: 'internal', label: '🏢 Internal' },
        { id: 'external', label: '🌐 External' },
      ],
      items: [
        { id: '1', content: 'Already knows the culture', correct_zone: 'internal' },
        { id: '2', content: 'Long-term career focus', correct_zone: 'internal' },
        { id: '3', content: 'Can simply leave if rejected', correct_zone: 'external' },
        { id: '4', content: 'Short-term focus', correct_zone: 'external' },
      ],
    },
  },
  // deck 49
  {
    type: 'question',
    title: 'Perceived Fairness Is Make-or-Break',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'An external applicant who feels a process is unfair will usually just ___, but an internal one stays and becomes disengaged.',
      options: ['Sue', 'Leave', 'Get promoted anyway', 'Tell their friends'],
      correct_index: 1,
    },
  },
  // deck 50
  {
    type: 'question',
    title: 'When Someone Is Denied a Promotion',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: "Which is a GOOD policy response when someone doesn't get the promotion?",
      options: [
        "Ignore them and hope they're fine",
        'Offer them a pay cut instead',
        'Explain why and give guidance on how to improve',
        'Ask them to resign',
      ],
      correct_index: 2,
    },
  },
  // deck 51
  {
    type: 'question',
    title: 'Quick Poll — 6.2 📊',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Which has a bigger impact on employee satisfaction?',
      options: ['Getting the promotion', 'Feeling the process was fair'],
      correct_index: 1,
      explanation: 'Perceived fairness often matters more than the outcome itself!',
    },
  },
  reveal(), // deck 52
  discuss('Discussion 💬', "Think of a time you (or someone you know) didn't get something they wanted. What would have made it feel fairer?"), // deck 53

  // ── 6.3 COMMUNICATION ──────────────────────────────
  t('title', '6.3 Communication'), // deck 54
  // deck 55
  {
    type: 'question',
    title: 'Three Types of Recruitment Messages',
    question_type: 'match',
    time_limit: 25,
    question_data: {
      pairs: [
        { term: 'Realistic', definition: 'Shows the job as it really is, including the bad stuff' },
        { term: 'Targeted', definition: "Matches the job to THIS specific applicant's needs" },
        { term: 'Branded', definition: "Sells the team's values and culture" },
      ],
    },
  },
  // deck 56
  {
    type: 'question',
    title: 'Realistic Job Previews (RJPs)',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'RJPs are especially important when an internal candidate is moving to an ___ position.',
      options: ['Higher-paying', 'Unfamiliar', 'Easier', 'External'],
      correct_index: 1,
    },
  },
  // deck 57
  {
    type: 'question',
    title: 'Communication Media: Official Channels',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Which of these is an OFFICIAL communication channel?',
      options: ['Gossip in the break room', 'A job posting on the intranet', 'Texting a friend', 'Word of mouth'],
      correct_index: 1,
    },
  },
  // deck 58
  {
    type: 'question',
    title: 'The Word-of-Mouth Problem',
    question_type: 'drag_drop',
    time_limit: 25,
    question_data: {
      zones: [{ id: 'problem', label: '⚠️ Problem with word of mouth' }],
      items: [
        { id: '1', content: 'Not everyone hears about it (Selective)', correct_zone: 'problem' },
        { id: '2', content: 'Info gets distorted (Inaccurate)', correct_zone: 'problem' },
        { id: '3', content: 'Shared inconsistently (Haphazard)', correct_zone: 'problem' },
      ],
    },
  },
  // deck 59
  {
    type: 'question',
    title: 'Quick Poll — 6.3 📊',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Which message type would you use for an internal promotion?',
      options: ['Realistic', 'Targeted', 'Branded', 'It depends'],
      correct_index: 3,
      explanation: 'It depends — on the role, applicant, and context!',
    },
  },
  reveal(), // deck 60
  discuss('Discussion 💬', "Word of mouth can't be fully eliminated. How could an org reduce its negative effects without killing it completely?"), // deck 61

  // ── 🏆 CHECKPOINT 2 (after deck 61) ────────────────
  t('checkpoint', '🏆 Checkpoint 2 — Sections 6.2 & 6.3'),

  // ── 6.4 APPLICANT SOURCING ─────────────────────────
  t('title', '6.4 Applicant Sourcing'), // deck 62
  // deck 63
  {
    type: 'question',
    title: 'Position-Based vs System-Based',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Position-based sourcing fills ___ jobs. System-based sourcing prepares for ___ jobs.',
      options: ["Yesterday's / Today's", "Today's / Tomorrow's", 'External / Internal', 'Cheap / Expensive'],
      correct_index: 1,
    },
  },
  // deck 64
  {
    type: 'question',
    title: 'Position-Based Sourcing',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Which of these is a position-based sourcing method?',
      options: ['Succession Planning', 'Job Posting', 'Talent Management System', 'Career Development Center'],
      correct_index: 1,
    },
  },
  // deck 65
  {
    type: 'question',
    title: 'Job Postings',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: "A 'bagged' job means employees suspect someone was chosen ___ the posting went up.",
      options: ['After', 'Before', 'While', 'Despite'],
      correct_index: 1,
    },
  },
  // deck 66
  {
    type: 'question',
    title: 'Nominations & In-House Temporary Pools',
    question_type: 'match',
    time_limit: 25,
    question_data: {
      pairs: [
        { term: 'Nominations', definition: 'Supervisors and peers identify qualified candidates; self-nomination prevents overlooking minorities' },
        { term: 'In-House Temp Pools', definition: 'Legally full employees; less orientation needed; can serve as an audition' },
      ],
    },
  },
  // deck 67
  {
    type: 'question',
    title: 'System-Based Sourcing',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'System-based sourcing is focused on the ___.',
      options: ['Current vacancy', "Entire workforce's future development", 'External market', 'Budget'],
      correct_index: 1,
    },
  },
  // deck 68
  {
    type: 'question',
    title: 'Talent Management Systems',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'What is Step 1 of a Talent Management System?',
      options: ['Query the system', 'Assess the workforce', 'Identify required KSAOs', 'Review regularly'],
      correct_index: 2,
    },
  },
  // deck 69
  {
    type: 'question',
    title: 'Replacement & Succession Plans',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Who should lead CEO succession planning?',
      options: ['The CEO', 'The HR department', 'The board of directors', 'External consultants'],
      correct_index: 2,
    },
  },
  // deck 70
  {
    type: 'question',
    title: 'Career Development Centers',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Career development centers help employees with two goals: self-assessment and ___.',
      options: ['Salary negotiation', 'Organization awareness', 'External job searching', 'Performance reviews'],
      correct_index: 1,
    },
  },
  // deck 71
  {
    type: 'question',
    title: 'Measuring Internal Recruitment Success',
    question_type: 'match',
    time_limit: 25,
    question_data: {
      pairs: [
        { term: 'Quantity', definition: 'Did enough qualified people apply?' },
        { term: 'Quality', definition: 'Were they actually qualified?' },
      ],
    },
  },
  // deck 72
  {
    type: 'question',
    title: 'Quick Poll — 6.4 📊',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: "You're filling a leadership role. Which method first?",
      options: ['Job Posting', 'Nominations', 'Talent Management System', 'Succession Plan'],
      correct_index: 2,
      correct_indices: [2, 3],
      explanation: 'Both a Talent Management System and a Succession Plan proactively identify ready leaders — either is a strong first move.',
    },
  },
  reveal(), // deck 73
  discuss('Discussion 💬', 'Why did you pick that method? What are its advantages and disadvantages?'), // deck 74
  t('title', 'Transition'), // deck 75 (duplicate)
  // deck 76
  {
    type: 'question',
    title: 'Key Takeaways (6.2–6.4)',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Which of these is NOT one of the four metrics for measuring internal recruitment success?',
      options: ['Quantity', 'Quality', 'Cost', 'Speed'],
      correct_index: 3,
      explanation: 'The four are Quantity, Quality, Cost, and HR Outcomes — not Speed.',
    },
  },

  // ── 🏆 CHECKPOINT 3 (after deck 76) ────────────────
  t('checkpoint', '🏆 Checkpoint 3 — Section 6.4'),

  // ── 6.5 TRANSITION TO SELECTION ────────────────────
  t('title', '6.5 Transition to Selection'), // deck 77
  // deck 78
  {
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
  // deck 79
  {
    type: 'question',
    title: 'What is the Transition to Selection?',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: "After applying internally, the organization evaluates whether the employee is the best ___, not just whether they're interested.",
      options: ['Fit', 'Friend', 'Senior person', 'Available'],
      correct_index: 0,
    },
  },
  // deck 80
  {
    type: 'question',
    title: 'Preparing Employees for Promotion',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Successful promotions begin ___.',
      options: ['When the job is posted', 'Long before a position becomes vacant', 'After someone else gets the role', 'When the employee asks HR'],
      correct_index: 1,
    },
  },
  t('break', '☕ 5-Minute Break'), // deck 82

  // ── 6.6 LEGAL ISSUES ───────────────────────────────
  t('title', '6.6 Legal Issues'), // deck 83
  // deck 84
  {
    type: 'question',
    title: 'Legal Issues in Internal Recruitment',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Internal promotions must be all of the following EXCEPT:',
      options: ['Fair', 'Transparent', 'Guaranteed to the most senior person', 'Non-discriminatory'],
      correct_index: 2,
    },
  },
  // deck 85
  {
    type: 'question',
    title: 'Affirmative Action Programs',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'An AAP does NOT guarantee promotions. Its purpose is to make sure everyone has an equal ___ to compete.',
      options: ['Salary', 'Opportunity', 'Interview', 'Manager'],
      correct_index: 1,
    },
  },
  // deck 86
  {
    type: 'question',
    title: 'EEOC Best Practices',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'What is Step 1 of EEOC best practices for AAPs?',
      options: ['Set goals and timetables', 'Monitor results', 'Identify problem areas', 'Develop action programs'],
      correct_index: 2,
    },
  },
  // deck 87
  {
    type: 'question',
    title: 'Bona Fide Seniority Systems',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'A seniority-based promotion system is legal as long as it was not created with ___ intent.',
      options: ['Financial', 'Competitive', 'Discriminatory', 'Political'],
      correct_index: 2,
    },
  },
  // deck 88
  {
    type: 'question',
    title: 'Glass Ceiling',
    question_type: 'multiple_choice',
    time_limit: 25,
    question_data: {
      question: "The glass ceiling doesn't stop people from ___ an organization, it limits how far they can ___ within it.",
      options: ['Leaving / descend', 'Entering / advance', 'Joining / apply', 'Quitting / stay'],
      correct_index: 1,
    },
  },
  // deck 89
  {
    type: 'question',
    title: 'Barriers & Solutions',
    question_type: 'multiple_choice',
    time_limit: 20,
    question_data: {
      question: 'Which of these helps BREAK the glass ceiling?',
      options: ['Keeping promotion criteria secret', 'Mentorship and leadership development', 'Seniority-only promotions', 'Reducing job postings'],
      correct_index: 1,
    },
  },
  // deck 90
  {
    type: 'question',
    title: 'Barriers & Solutions (cont.)',
    question_type: 'drag_drop',
    time_limit: 30,
    question_data: {
      zones: [
        { id: 'breaks', label: '✅ Breaks barriers' },
        { id: 'not', label: '❌ Does NOT help' },
      ],
      items: [
        { id: '1', content: 'Transparent promotion processes', correct_zone: 'breaks' },
        { id: '2', content: 'Train managers on unconscious bias', correct_zone: 'breaks' },
        { id: '3', content: 'Promote based on who the manager likes', correct_zone: 'not' },
        { id: '4', content: 'Keep promotion data hidden', correct_zone: 'not' },
      ],
    },
  },
  // deck 91
  {
    type: 'question',
    title: 'Key Takeaways (6.5 & 6.6)',
    question_type: 'multiple_choice',
    time_limit: 25,
    question_data: {
      question: 'Which of the following best summarizes how to create fair internal promotion systems?',
      options: [
        'Promote the longest-serving employee always',
        'Invest in development, remove barriers, use objective criteria, monitor outcomes',
        'Let managers decide privately',
        'Only post jobs externally',
      ],
      correct_index: 1,
    },
  },

  // ── 🏆 FINAL CHECKPOINT (after deck 91) ────────────
  t('checkpoint', '🏆 Final Checkpoint — Sections 6.5 & 6.6'),

  // ── CASE STUDY: BANK OF MONTREAL ───────────────────
  // deck 92
  {
    type: 'question',
    title: 'Case Study: Bank of Montreal 🏦',
    question_type: 'multiple_choice',
    time_limit: 25,
    question_data: {
      question: 'The BMO Task Force found women were disadvantaged by an informal ___ system where managers handpicked candidates from HRIS before vacancies were public.',
      options: ['Open', 'Hybrid', 'Closed', 'Government'],
      correct_index: 2,
      explanation: 'Handpicking before anything is posted = a closed system.',
    },
  },
  discuss('Case Study — Issue Identification I 💬', "Santo's main concern is managing employee expectations. Which three types of justice are at play in this case?"), // deck 93
  discuss('Case Study — Issue Identification II 💬', 'The JVNS fixes recruitment — but what does it leave untouched?'), // deck 94
  discuss('Case Study — Alternatives 💬', 'What alternatives could Santo consider for improving the JVNS and the broader internal recruitment system?'), // deck 95
  discuss('Case Study — Decision Criteria 💬', 'What criteria should Santo use to evaluate these alternatives?'), // deck 96
  // deck 97
  {
    type: 'question',
    title: 'Case Study — Decision',
    question_type: 'multiple_choice',
    time_limit: 30,
    question_data: {
      question: 'The recommended decision combines Alternative 3 with elements of Alternative 1. What two things does it add to the JVNS?',
      options: [
        'A delay and a budget increase',
        'An honest communication campaign (like an RJP) + structured selection criteria',
        'A new HR team and a performance bonus',
        'External recruitment and mandatory training',
      ],
      correct_index: 1,
    },
  },
  discuss('Case Study — Action & Implementation 💬', 'How should Santo implement the chosen solution? What are the key steps and risks?'), // deck 98
  discuss('Case Study — Discussion Q1 💬', 'Is the JVNS effective? Is it better than the old system? Will it improve outcomes for women?'), // deck 99
  discuss('Case Study — Discussion Q2 💬', 'Who benefits from the JVNS? Who resists it, and why?'), // deck 100
  discuss('Case Study — Discussion Q3 💬', 'What must Santo do next — to improve the JVNS itself AND the overall internal recruitment system?'), // deck 101

  // ── FINALE ─────────────────────────────────────────
  t('wheel', '🎡 Wheel of Fortune!'), // deck 102
  t('end', '🎉 Thanks everyone!'), // deck 103
];

export const SLIDES: Slide[] = RAW.map((s, i) => ({ ...s, index: i + 1 }));

export const FIRST_SLIDE = 1;
export const TOTAL_SLIDES = SLIDES.length;
export const LAST_SLIDE = SLIDES.length;

export function getSlide(index: number): Slide | undefined {
  return SLIDES.find((s) => s.index === index);
}

// For an answer-reveal slide, find the question it follows (nearest
// preceding 'question' slide).
export function getPreviousQuestion(index: number): Slide | undefined {
  for (let i = index - 1; i >= 1; i--) {
    const s = getSlide(i);
    if (s?.type === 'question') return s;
    // Stop if we hit another reveal/checkpoint boundary without a question.
    if (s && s.type !== 'reveal' && s.type !== 'title') break;
  }
  return undefined;
}
