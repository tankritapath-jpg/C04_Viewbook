/* ==========================================================================
   data/site.js
   Owner: Group Lead (Course Info, Hero Specs, About, Grading, Footer)
   Edit group name, room, overview text, and tool links here.
   ========================================================================== */

window.VIEWBOOK = window.VIEWBOOK || {};

window.VIEWBOOK.site = {
  courseCode: "CPE102",
  courseName: "Engineering Exploration",
  semester: "Semester 1/2026",
  section: "Section C (International)",
  room: "CPE 1114",
  groupName: "Group C00 (Edit Group Name)",

  disciplines: [
    { id: "foundation", label: "Design & Team", color: "var(--cat-foundation)" },
    { id: "hardware", label: "Hardware & AI", color: "var(--cat-hardware)" },
    { id: "systems", label: "Code & Systems", color: "var(--cat-systems)" },
    { id: "milestone", label: "Projects & Exams", color: "var(--cat-milestone)" }
  ],

  hero: {
    eyebrow: "KMUTT · COMPUTER ENGINEERING · SEMESTER 1/2026",
    title: "Engineering Exploration",
    subtitle:
      "A shared lab notebook and freshmen field guide by our group—covering 16 weeks of hands-on workshops, robot specs, survival tips, and interactive study checklists.",
    stats: [
      { value: "16", label: "Weeks Logged" },
      { value: "4", label: "Skill Tracks" },
      { value: "2", label: "Major Projects" },
      { value: "1", label: "Game Jam" }
    ],
    specs: [
      { label: "Course", value: "CPE102" },
      { label: "Group", value: "Group C00" },
      { label: "Section", value: "Sec C · Fri 08:30" },
      { label: "Room", value: "CPE 1114" }
    ]
  },

  about: {
    eyebrow: "01 // COURSE OVERVIEW",
    title: "What is CPE102?",
    lead:
      "A first-year studio course that introduces computer engineering through making—from 3D CAD and embedded circuits to computer vision, Linux servers, and team projects.",
    overviewParagraphs: [
      "CPE102 Engineering Exploration gives freshmen a wide look across the computer engineering discipline before deeper theory courses begin. Each week mixes short lectures from faculty and industry guests with hands-on labs.",
      "This Viewbook combines two tools in one place: a practical Freshmen Guide so incoming students know what to prepare, and a clean Study Log for reviewing key formulas, models, and commands before exams."
    ],
    studyLegend: [
      {
        title: "What we did",
        desc: "A quick recap of the real lab activities and team builds we completed in class."
      },
      {
        title: "What we understood",
        desc: "Core concepts, comparison tables, and terminal snippets worth remembering."
      },
      {
        title: "Review at home",
        desc: "Interactive study checkboxes saved in your browser so you can track exam prep."
      }
    ],
    workflow: [
      {
        step: "STEP 01",
        title: "Pre-read",
        desc: "Skim the weekly topic and check what software or accounts are needed before Friday."
      },
      {
        step: "STEP 02",
        title: "Set Up Tools",
        desc: "Install IDEs, drivers, or virtual machines ahead of time so lab hours go into building."
      },
      {
        step: "STEP 03",
        title: "Build & Test",
        desc: "Split tasks across hardware, code, and testing—measure early instead of guessing."
      },
      {
        step: "STEP 04",
        title: "Log & Review",
        desc: "Save photos, note what broke and how you fixed it, and tick off the review checklist."
      }
    ],
    grading: [
      { label: "Attendance & Lab Participation", pct: 5 },
      { label: "Weekly Exercises & Quizzes", pct: 10 },
      { label: "Midterm Examination", pct: 15 },
      { label: "Project 1: Gemstone Robot Competition", pct: 20 },
      { label: "Project 2: Final Group Project", pct: 30 },
      { label: "Final Exam & Viewbook Submission", pct: 20 }
    ],
    rules: [
      "Arrive with required software installed (check the 'Before class, have ready' list).",
      "Assign clear owners for every task so nobody assumes someone else already did it.",
      "Take photos and keep brief notes during every lab—future you will thank you.",
      "Always disconnect power before rewiring breadboards or motor drivers."
    ]
  },

  footer: {
    sources: [
      "CPE102 Course Syllabus & Lecture Slides (Semester 1/2026)",
      "Group Lab Notes, CAD Drawings & Experiment Logs",
      "Project 1 Competition Brief & Project 2 Progress Deck",
      "Ubuntu Server & Network Security Lab Handouts",
      "Activity photos taken by group members (update credits in data/site.js)"
    ],
    tools: [
      { name: "Onshape CAD", url: "https://www.onshape.com/" },
      { name: "Arduino IDE", url: "https://www.arduino.cc/en/software" },
      { name: "Teachable Machine", url: "https://teachablemachine.withgoogle.com/" },
      { name: "Google Colab", url: "https://colab.research.google.com/" },
      { name: "Unity", url: "https://unity.com/" },
      { name: "itch.io", url: "https://itch.io/" },
      { name: "Ubuntu Server", url: "https://ubuntu.com/server" }
    ],
    copyright:
      "CPE102 Engineering Exploration · KMUTT Computer Engineering · Semester 1/2026"
  }
};
