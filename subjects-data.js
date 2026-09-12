// ---------- Shared subject data ----------
// Unified under the strict TAG Educators Amethyst & Slate brand palette.

var TAG_SUBJECTS = [
  {
    slug: "physics",
    name: "Physics",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "Mechanics, waves and electricity, built around exam technique, not just theory.",
    accent: "#7A3B85", btn: "#5A2A64",
    icon: '<circle cx="12" cy="12" r="2.4" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" stroke-width="1.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" stroke-width="1.5" transform="rotate(120 12 12)"/>',
    pattern: '<circle cx="34" cy="34" r="3" fill="currentColor"/><ellipse cx="34" cy="34" rx="24" ry="10" stroke="currentColor" stroke-width="1.3" fill="none"/><ellipse cx="34" cy="34" rx="24" ry="10" stroke="currentColor" stroke-width="1.3" fill="none" transform="rotate(60 34 34)"/><ellipse cx="34" cy="34" rx="24" ry="10" stroke="currentColor" stroke-width="1.3" fill="none" transform="rotate(120 34 34)"/><path d="M90 128q9-18 18 0t18 0t18 0" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/>'
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "From the periodic table to organic reactions, taught with real past-paper practice.",
    accent: "#7A3B85", btn: "#5A2A64",
    icon: '<path d="M9 3h6M10 3v5l-5.5 9c-.8 1.4.2 3 1.8 3h11.4c1.6 0 2.6-1.6 1.8-3L14 8V3" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 15h8" stroke="currentColor" stroke-width="1.6"/>',
    pattern: '<polygon points="122,18 137,27 137,45 122,54 107,45 107,27" stroke="currentColor" stroke-width="1.3" fill="none"/><path d="M38 108h11v15l-15 26c-2 4 .6 9 5.5 9h30c5 0 7.5-5 5.5-9l-15-26v-15h11" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linejoin="round"/><line x1="34" y1="150" x2="70" y2="150" stroke="currentColor" stroke-width="1.3"/>'
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "Algebra through calculus, with steady, methodical problem-solving practice.",
    accent: "#7A3B85", btn: "#5A2A64",
    icon: '<path d="M5 6h14M9 6c0 6-2 11-4 12M13 6c1.5 3 1 8 3 12M8 12h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    pattern: '<text x="18" y="52" font-family="Georgia, serif" font-size="30" fill="currentColor">\u03c0</text><text x="96" y="34" font-family="Georgia, serif" font-size="28" fill="currentColor">\u2211</text><text x="26" y="140" font-family="Georgia, serif" font-size="24" fill="currentColor">\u221a</text><text x="104" y="134" font-family="Georgia, serif" font-size="26" fill="currentColor">\u03b8</text>'
  },
  {
    slug: "biology",
    name: "Biology",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "Cell biology, genetics and ecology, connected back to how exams actually ask it.",
    accent: "#7A3B85", btn: "#5A2A64",
    icon: '<path d="M12 21c-4-3.5-7-7.5-7-11.5A7 7 0 0112 3a7 7 0 017 6.5C19 13.5 16 17.5 12 21z" stroke="currentColor" stroke-width="1.6"/><path d="M12 21V10" stroke="currentColor" stroke-width="1.6"/>',
    pattern: '<path d="M26 10c15 20-15 40 0 60c15 20-15 40 0 60" stroke="currentColor" stroke-width="1.3" fill="none"/><path d="M46 10c-15 20 15 40 0 60c-15 20 15 40 0 60" stroke="currentColor" stroke-width="1.3" fill="none"/><line x1="29" y1="24" x2="43" y2="24" stroke="currentColor" stroke-width="1.3"/><line x1="22" y1="44" x2="50" y2="44" stroke="currentColor" stroke-width="1.3"/><line x1="29" y1="64" x2="43" y2="64" stroke="currentColor" stroke-width="1.3"/><line x1="22" y1="84" x2="50" y2="84" stroke="currentColor" stroke-width="1.3"/><line x1="29" y1="104" x2="43" y2="104" stroke="currentColor" stroke-width="1.3"/>'
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "Programming fundamentals and theory, taught with real code, not just diagrams.",
    accent: "#7A3B85", btn: "#5A2A64",
    icon: '<rect x="7" y="7" width="10" height="10" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    pattern: '<text x="88" y="42" font-family="Menlo, Consolas, monospace" font-size="22" fill="currentColor">{ }</text><text x="18" y="104" font-family="Menlo, Consolas, monospace" font-size="18" fill="currentColor">01</text><text x="96" y="140" font-family="Menlo, Consolas, monospace" font-size="18" fill="currentColor">10</text><path d="M28 28h18v18M118 92h18v18" stroke="currentColor" stroke-width="1.3" fill="none"/>'
  },
  {
    slug: "business-studies",
    name: "Business Studies",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "How real businesses operate, market and grow, framed around the syllabus.",
    accent: "#7A3B85", btn: "#5A2A64",
    icon: '<rect x="3.5" y="8" width="17" height="11" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 8V6.5A1.5 1.5 0 0110 5h4a1.5 1.5 0 011.5 1.5V8" stroke="currentColor" stroke-width="1.6"/>',
    pattern: '<rect x="22" y="44" width="36" height="26" rx="3" stroke="currentColor" stroke-width="1.3" fill="none"/><path d="M32 44v-7a4 4 0 014-4h8a4 4 0 014 4v7" stroke="currentColor" stroke-width="1.3" fill="none"/><rect x="100" y="112" width="9" height="22" fill="currentColor"/><rect x="113" y="98" width="9" height="36" fill="currentColor"/><rect x="126" y="80" width="9" height="54" fill="currentColor"/>'
  },
  {
    slug: "economics",
    name: "Economics",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "Micro and macro concepts made concrete with real-world examples.",
    accent: "#7A3B85", btn: "#5A2A64",
    icon: '<path d="M4 19V9M10 19V5M16 19v-7M20 19V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    pattern: '<path d="M22 132l38-34l26 16l52-72" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M120 26h18v18" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="34" cy="34" r="13" stroke="currentColor" stroke-width="1.3" fill="none"/><text x="28" y="40" font-family="Georgia, serif" font-size="15" fill="currentColor">$</text>'
  },
  {
    slug: "accounts",
    name: "Accounts",
    levels: ["O Level", "A Level", "IGCSE"],
    blurb: "Ledgers, statements and adjustments, practiced the way examiners mark them.",
    accent: "#7A3B85", btn: "#5A2A64",
    icon: '<rect x="5" y="3.5" width="14" height="17" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    pattern: '<rect x="20" y="18" width="104" height="74" rx="2" stroke="currentColor" stroke-width="1.1" fill="none"/><line x1="20" y1="40" x2="124" y2="40" stroke="currentColor" stroke-width="1.1"/><line x1="20" y1="60" x2="124" y2="60" stroke="currentColor" stroke-width="1.1"/><line x1="20" y1="80" x2="124" y2="80" stroke="currentColor" stroke-width="1.1"/><line x1="84" y1="18" x2="84" y2="92" stroke="currentColor" stroke-width="1.1"/><text x="128" y="140" font-family="Georgia, serif" font-size="26" fill="currentColor">$</text>'
  }
];

function tagSubjectByName(name) {
  for (var i = 0; i < TAG_SUBJECTS.length; i++) {
    if (TAG_SUBJECTS[i].name === name) return TAG_SUBJECTS[i];
  }
  return null;
}
