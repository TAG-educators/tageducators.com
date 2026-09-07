// ---------- Shared subject data ----------
// One record per subject. courses.html cards are written by hand (safest,
// no render step) but MUST keep --card-accent in sync with .accent here.
// index.html's orbit strip and subject.html's theme/icon lookup both read
// this file directly, so it's the single place per-subject color and copy
// live.

var TAG_SUBJECTS = [
  {
    slug: "physics",
    name: "Physics",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "Mechanics, waves and electricity, built around exam technique, not just theory.",
    accent: "#6FA8FF", btn: "#2F5FD1",
    bg: "#0E1730", panel: "#16234A", panel2: "#1C2C5B",
    icon: '<circle cx="12" cy="12" r="2.4" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" stroke-width="1.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" stroke-width="1.5" transform="rotate(120 12 12)"/>'
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "From the periodic table to organic reactions, taught with real past-paper practice.",
    accent: "#4ADE9B", btn: "#1F8F5F",
    bg: "#0A2A20", panel: "#123B2C", panel2: "#164A37",
    icon: '<path d="M9 3h6M10 3v5l-5.5 9c-.8 1.4.2 3 1.8 3h11.4c1.6 0 2.6-1.6 1.8-3L14 8V3" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 15h8" stroke="currentColor" stroke-width="1.6"/>'
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "Algebra through calculus, with steady, methodical problem-solving practice.",
    accent: "#7C93FF", btn: "#4A5FD1",
    bg: "#12173A", panel: "#1A2050", panel2: "#222863",
    icon: '<path d="M5 6h14M9 6c0 6-2 11-4 12M13 6c1.5 3 1 8 3 12M8 12h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
  },
  {
    slug: "biology",
    name: "Biology",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "Cell biology, genetics and ecology, connected back to how exams actually ask it.",
    accent: "#4DD9C7", btn: "#1F9E8F",
    bg: "#0A2B2B", panel: "#123D3D", panel2: "#164C4C",
    icon: '<path d="M12 21c-4-3.5-7-7.5-7-11.5A7 7 0 0112 3a7 7 0 017 6.5C19 13.5 16 17.5 12 21z" stroke="currentColor" stroke-width="1.6"/><path d="M12 21V10" stroke="currentColor" stroke-width="1.6"/>'
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "Programming fundamentals and theory, taught with real code, not just diagrams.",
    accent: "#4DD8EF", btn: "#1690AC",
    bg: "#08262E", panel: "#103642", panel2: "#134454",
    icon: '<rect x="7" y="7" width="10" height="10" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
  },
  {
    slug: "business-studies",
    name: "Business Studies",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "How real businesses operate, market and grow, framed around the syllabus.",
    accent: "#FFC94D", btn: "#C68A1A",
    bg: "#2E2208", panel: "#3F2F0C", panel2: "#4E3B0F",
    icon: '<rect x="3.5" y="8" width="17" height="11" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 8V6.5A1.5 1.5 0 0110 5h4a1.5 1.5 0 011.5 1.5V8" stroke="currentColor" stroke-width="1.6"/>'
  },
  {
    slug: "economics",
    name: "Economics",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "Micro and macro concepts made concrete with real-world examples.",
    accent: "#FF7A93", btn: "#C23A57",
    bg: "#2E0E16", panel: "#401322", panel2: "#50172B",
    icon: '<path d="M4 19V9M10 19V5M16 19v-7M20 19V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'
  },
  {
    slug: "accounts",
    name: "Accounts",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "Ledgers, statements and adjustments, practiced the way examiners mark them.",
    accent: "#FFA45C", btn: "#C9631E",
    bg: "#301708", panel: "#40200C", panel2: "#4F280F",
    icon: '<rect x="5" y="3.5" width="14" height="17" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
  }
];

function tagSubjectByName(name) {
  for (var i = 0; i < TAG_SUBJECTS.length; i++) {
    if (TAG_SUBJECTS[i].name === name) return TAG_SUBJECTS[i];
  }
  return null;
}
