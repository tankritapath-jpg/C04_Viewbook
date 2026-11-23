/* ==========================================================================
   data/team-reflection.js
   Owner: Teammate 4 (Reflection Essay, Freshmen Advice & Team Profiles)
   Edit member names, student IDs, roles, and optional photo paths here.
   ========================================================================== */

window.VIEWBOOK = window.VIEWBOOK || {};

window.VIEWBOOK.reflection = {
  eyebrow: "RETROSPECTIVE",
  title: "What 16 Weeks in CPE102 Taught Us",
  lessonsTitle: "Five Lessons From the Workbench",
  quote:
    "Almost every project pushed us to teach ourselves before feeling ready. Waiting for step-by-step instructions slows the whole team down—testing early is how you learn.",
  paragraphs: [
    "Looking back at Semester 1/2026, the jump from Week 1 to Week 16 is huge. On day one, many of us had never constrained a 3D CAD assembly, tuned a color sensor, or configured a headless Linux server. By building real hardware and software under real deadlines, mistakes stopped feeling scary and became normal debugging steps.",
    "Equally important were the non-technical lessons: writing clear task lists, speaking up early when a component fails, and testing in realistic conditions before demo day. Those habits carried our team through every tight deadline."
  ],
  advice: [
    {
      num: "01",
      title: "Log Photos Every Week",
      body: "Drop 2–3 photos and quick notes right after each lab so you never scramble before finals."
    },
    {
      num: "02",
      title: "Install Tools the Night Before",
      body: "Download Onshape, Arduino drivers, Unity, or VM ISOs before Friday morning class."
    },
    {
      num: "03",
      title: "Test Under Real Conditions",
      body: "Desk tests lie—check lighting, battery voltage, and floor friction in the actual arena."
    },
    {
      num: "04",
      title: "Keep Ownership Crystal Clear",
      body: "Every task needs one named owner and one clear deadline so nothing falls through the cracks."
    },
    {
      num: "05",
      title: "Ask TAs Early",
      body: "Try debugging for 20 minutes first, then ask lecturers or TAs with clear symptoms—it saves hours."
    }
  ]
};

window.VIEWBOOK.team = {
  eyebrow: "GROUP DIRECTORY",
  title: "Group C04 · Section C",
  subtitle:
    "The student builders behind C04_Viewbook and our Semester 1/2026 engineering projects (update names & IDs in data/team-reflection.js).",
  members: [
    {
      initials: "M1",
      color: "var(--cat-foundation)",
      name: "Teammate One Full Name",
      nickname: "Member 1",
      studentId: "690705034XX",
      viewbookPart: "Viewbook: Weeks 01–07 + Photos",
      projectRole: "Site Lead & Documentation",
      photo: ""
    },
    {
      initials: "M2",
      color: "var(--cat-hardware)",
      name: "Teammate Two Full Name",
      nickname: "Member 2",
      studentId: "690705034XX",
      viewbookPart: "Viewbook: Weeks 08–16 + Study Logs",
      projectRole: "Hardware & Embedded Lead",
      photo: ""
    },
    {
      initials: "M3",
      color: "var(--cat-systems)",
      name: "Teammate Three Full Name",
      nickname: "Member 3",
      studentId: "690705034XX",
      viewbookPart: "Viewbook: Project 1 & Project 2",
      projectRole: "CAD, Mechanical & Testing",
      photo: ""
    },
    {
      initials: "M4",
      color: "var(--cat-milestone)",
      name: "Teammate Four Full Name",
      nickname: "Member 4",
      studentId: "690705034XX",
      viewbookPart: "Viewbook: Reflection, Team & UI",
      projectRole: "Software, UI & Presentation",
      photo: ""
    }
  ],
  taCredits:
    "Special thanks to all CPE102 lecturers, Section C instructors, and our project TAs for guidance throughout Semester 1/2026."
};
