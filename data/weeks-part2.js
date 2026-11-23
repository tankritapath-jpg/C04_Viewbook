/* ==========================================================================
   data/weeks-part2.js
   Owner: Teammate 2 (Weeks 08 – 13, Midterm Break & Upcoming W14 – W16)
   To add a photo: put the image in assets/img/ and set src: "assets/img/..."
   ========================================================================== */

window.VIEWBOOK = window.VIEWBOOK || {};

window.VIEWBOOK.midtermBreak = {
  date: "12–28 Oct 2026",
  title: "Midterm Exam Period",
  text: "Mid-semester breather to review Weeks 1–9 before jumping into Game Jam, Security, Linux OS, and Final Project."
};

window.VIEWBOOK.weeksPart2 = [
  {
    id: "w8",
    code: "W08",
    num: "08",
    category: "milestone",
    categoryLabel: "Projects & Exams",
    color: "var(--cat-milestone)",
    date: "2 Oct",
    title: "The First Project Competition",
    subtitle: "Arena competition day for our gemstone colour-sorting robots",
    lecturer: "CPE102 Lecturers & TAs",
    summary:
      "The milestone of the first half: every team brought their custom-built robot into the arena to sort colored gemstones across both Manual and Autonomous rounds.",
    photos: [
      {
        src: "",
        placeholderPath: "assets/img/w08-1.jpg",
        label: "W08 · Pit Inspection",
        caption: "Measuring chassis dimensions, checking batteries, and tuning sensors"
      },
      {
        src: "",
        placeholderPath: "assets/img/w08-2.jpg",
        label: "W08 · Arena Match",
        caption: "Sorting gemstones against the clock during official match rounds"
      },
      {
        src: "",
        placeholderPath: "assets/img/w08-3.jpg",
        label: "W08 · Team Debrief",
        caption: "Post-match team photo after finishing our competition runs"
      }
    ],
    concepts: [
      {
        title: "Real-World Variance",
        body: "Battery voltage sag, arena surface friction, and overhead spotlights all behave slightly differently from test benches—leaving margin in code matters."
      },
      {
        title: "Fast Pit Recovery",
        body: "Having a clean reset button, labeled connectors, and spare fasteners lets a team recover between rounds in under two minutes."
      }
    ],
    whatWeDid: [
      "Passed size, weight, and hardware compliance checks at the pit table",
      "Competed across both manual Wi-Fi control and autonomous sorting rounds",
      "Documented mechanical and timing lessons in our Project 1 log"
    ],
    checklist: [
      { id: "r-w8-1", text: "Record what worked and what failed during live arena runs" },
      { id: "r-w8-2", text: "Fill in robot specs and evolution log in data/projects.js" }
    ],
    tip: "Pack two fully charged battery packs, spare screws, zip ties, and electrical tape on competition day—something always vibrates loose."
  },

  {
    id: "w9",
    code: "W09",
    num: "09",
    category: "milestone",
    categoryLabel: "Projects & Exams",
    color: "var(--cat-milestone)",
    date: "9 Oct",
    title: "Midterm Exams",
    subtitle: "Checking our understanding of the first-half engineering topics",
    lecturer: "CPE102 Faculty",
    summary:
      "Midterm assessment covering the engineering design loop, RACI/DISC, ISO 128 CAD projection, basic circuits, computer vision arrays, NLP tokens, and programming logic.",
    photos: [
      {
        src: "",
        placeholderPath: "assets/img/w09-1.jpg",
        label: "W09 · Study Group",
        caption: "Reviewing CAD projections and Ohm's law problems together"
      },
      {
        src: "",
        placeholderPath: "assets/img/w09-2.jpg",
        label: "W09 · Summary Sheet",
        caption: "Condensing Weeks 1–7 tables and formulas onto one sheet"
      },
      {
        src: "",
        placeholderPath: "assets/img/w09-3.jpg",
        label: "W09 · Post-Exam",
        caption: "Wrapping up midterms and planning the second-half sprint"
      }
    ],
    concepts: [
      {
        title: "Application Over Memorization",
        body: "Questions test whether you can choose the right sensor, read a projection view, or trace circuit behavior rather than recite definitions."
      }
    ],
    whatWeDid: [
      "Compiled notes from Weeks 1–7 into concise concept cards",
      "Practiced circuit calculations and 3-view orthographic sketching",
      "Completed the midterm exam and noted weak areas to strengthen"
    ],
    checklist: [
      { id: "r-w9-1", text: "Review all checkboxes across W01–W07" },
      { id: "r-w9-2", text: "Note any tricky exam topics to revisit before Finals" }
    ],
    tip: "Use the checkboxes inside each week card as a quick pre-exam self-test—if you cannot explain a bullet out loud, re-read that concept card."
  },

  {
    id: "w10",
    code: "W10",
    num: "10",
    category: "systems",
    categoryLabel: "Code & Systems",
    color: "var(--cat-systems)",
    date: "30 Oct",
    title: "Game & Game Jam",
    subtitle: "Rapid game design, Unity physics, and shipping a playable build",
    lecturer: "CPE102 Game Dev Speakers",
    summary:
      "A fast-paced intro to game architecture: core gameplay loops, collision detection, UI feedback, and scoping a playable mini-game within a tight jam deadline.",
    photos: [
      {
        src: "",
        placeholderPath: "assets/img/w10-1.jpg",
        label: "W10 · Paper Prototype",
        caption: "Mapping controls, win conditions, and level flow on paper"
      },
      {
        src: "",
        placeholderPath: "assets/img/w10-2.jpg",
        label: "W10 · Unity Scene",
        caption: "Wiring player movement scripts, colliders, and score UI"
      },
      {
        src: "",
        placeholderPath: "assets/img/w10-3.jpg",
        label: "W10 · Playtest",
        caption: "Watching classmates playtest to spot confusing controls"
      }
    ],
    concepts: [
      {
        title: "The Core Gameplay Loop",
        body: "Every memorable game nails a tight loop: Player Action -> Clear Feedback -> Meaningful Reward—polish that loop before adding extra levels."
      },
      {
        title: "Scope for a Game Jam",
        body: "A small, complete game with clear start, play, and restart screens always beats an ambitious unfinished prototype."
      }
    ],
    whatWeDid: [
      "Brainstormed a mini-game concept and split coding, art, and sound tasks",
      "Built player controls, obstacles, and win/loss triggers in Unity",
      "Exported a playable build and published it to our team's itch.io page"
    ],
    beforeClass: [
      "Install Unity Hub, the recommended LTS editor, and WebGL Build Support beforehand"
    ],
    extraLink: {
      label: "Play Our Game Jam Build on itch.io ↗",
      url: "https://itch.io/"
    },
    checklist: [
      { id: "r-w10-1", text: "Trace the Input -> Update -> Render frame loop" },
      { id: "r-w10-2", text: "Distinguish solid Colliders from Trigger zones in Unity" },
      { id: "r-w10-3", text: "Update our real itch.io URL in data/weeks-part2.js" }
    ],
    tip: "Download Unity and the WebGL module the night before class—waiting on multi-gigabyte downloads eats half your jam time."
  },

  {
    id: "w11",
    code: "W11",
    num: "11",
    category: "systems",
    categoryLabel: "Code & Systems",
    color: "var(--cat-systems)",
    date: "6 Nov",
    title: "Network Security",
    subtitle: "The CIA Triad, encryption vs hashing, and practical cyber hygiene",
    lecturer: "CPE102 Security Instructors",
    summary:
      "Learned how attackers exploit human habits and weak configurations, and how engineers defend systems using the CIA Triad, strong authentication, and secret hygiene.",
    photos: [],
    concepts: [
      {
        title: "The CIA Triad",
        body: "The three core pillars used to evaluate any system's security:",
        table: [
          ["Confidentiality", "Only authorized users can read sensitive data (encryption, access control)"],
          ["Integrity", "Data cannot be altered undetected in transit or storage (hashes, signatures)"],
          ["Availability", "Systems stay reachable when needed (backups, redundancy, rate limits)"]
        ]
      },
      {
        title: "Developer Security Checklist",
        body: "Essential everyday habits before pushing any group project online:",
        terminal: "$ checklist --stay-safe\n[OK] Use unique passwords + a password manager\n[OK] Enable 2FA / MFA on GitHub, Google, and Vercel\n[OK] Inspect links carefully to spot phishing domains\n[OK] Never commit API keys or .env files to public repos"
      }
    ],
    whatWeDid: [
      "Reviewed real phishing, credential stuffing, and spoofing examples",
      "Compared one-way hashing against symmetric and asymmetric encryption",
      "Audited our project repositories to make sure no secrets were exposed"
    ],
    checklist: [
      { id: "r-w11-1", text: "Give one concrete defense for Confidentiality, Integrity, and Availability" },
      { id: "r-w11-2", text: "Explain why passwords are hashed instead of encrypted" },
      { id: "r-w11-3", text: "Turn on 2FA and keep .env secrets out of Git history" }
    ],
    tip: "Never paste API keys directly into frontend JavaScript files—once pushed to GitHub, bots scan and abuse exposed keys within minutes."
  },

  {
    id: "w12",
    code: "W12",
    num: "12",
    category: "systems",
    categoryLabel: "Code & Systems",
    color: "var(--cat-systems)",
    date: "13 Nov",
    title: "Operating Systems",
    subtitle: "Linux CLI, file permissions, processes, and Ubuntu Server networking",
    lecturer: "CPE102 Systems Team",
    summary:
      "Stepped inside the operating system to see how processes share CPU and memory, and practiced managing headless Linux servers from the terminal.",
    photos: [],
    concepts: [
      {
        title: "Essential Linux Server Commands",
        body: "Checking network interfaces, file permissions, and running processes:",
        terminal: "student@cpe-server:~$ ip a\n2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500\n    inet 192.168.56.101/24 brd 192.168.56.255\nstudent@cpe-server:~$ ls -la\n-rwxr-xr-x 1 student student 2048 Nov 13 deploy.sh\nstudent@cpe-server:~$ ps aux | head -n 4"
      },
      {
        title: "Processes & Octal Permissions",
        body: "Read (4), Write (2), and Execute (1) bits control access for Owner, Group, and Others—for example, chmod 755 allows owner edit/run and read/run for others."
      }
    ],
    whatWeDid: [
      "Booted Ubuntu Server inside a Virtual Machine (VMware / VirtualBox)",
      "Practiced navigating files, filtering logs with grep, and setting permissions",
      "Checked server IP configuration and tested basic SSH connectivity"
    ],
    beforeClass: [
      "Download the Ubuntu Server ISO and install VMware or VirtualBox ahead of lab"
    ],
    checklist: [
      { id: "r-w12-1", text: "Decode and set Linux permissions like chmod 755 and 644" },
      { id: "r-w12-2", text: "Navigate directories and check processes/IPs using CLI commands" },
      { id: "r-w12-3", text: "Explain the OS role in managing CPU scheduling, RAM, and files" }
    ],
    tip: "Hit the Tab key constantly in Linux terminals to auto-complete paths and filenames—it cuts typos in half."
  },

  {
    id: "w13",
    code: "W13",
    num: "13",
    category: "milestone",
    categoryLabel: "Projects & Exams",
    color: "var(--cat-milestone)",
    date: "20 Nov",
    title: "Project Progress Presentations",
    subtitle: "Mid-sprint review of Project 2 architecture, live prototype, and next steps",
    lecturer: "CPE102 Faculty & Project TAs",
    summary:
      "Every group pitched their Final Project progress—problem statement, system flow, Release 1 prototype—and collected actionable feedback from lecturers and TAs.",
    photos: [],
    concepts: [
      {
        title: "Demo-First Reviews",
        body: "Showing a clickable prototype instead of just mockup slides helps TAs spot UX bottlenecks and technical risks immediately."
      },
      {
        title: "Feature Freeze Before Finals",
        body: "After Week 13, lock down new feature ideas and focus on stability, real user testing, and a crisp final presentation."
      }
    ],
    whatWeDid: [
      "Presented our Project 2 progress deck within the time limit",
      "Walked TAs through our working Release 1 prototype",
      "Logged every piece of feedback into prioritized fixes for Weeks 14–16"
    ],
    checklist: [
      { id: "r-w13-1", text: "Convert all TA feedback into concrete action items" },
      { id: "r-w13-2", text: "Update Done / In progress / To do feature badges in data/projects.js" }
    ],
    tip: "Stop editing slides at least 15 minutes before presenting—use that buffer to test HDMI cables, Wi-Fi, and your live demo link."
  }
];

window.VIEWBOOK.upcomingWeeks = [
  {
    id: "w14",
    code: "W14",
    num: "14",
    category: "milestone",
    categoryLabel: "Projects & Exams",
    color: "var(--cat-milestone)",
    date: "23 Nov",
    title: "Game Day",
    subtitle: "Cross-section playtesting and final stretch community session",
    note: "Add screenshots and key takeaways in data/weeks-part2.js once completed."
  },
  {
    id: "w15",
    code: "W15",
    num: "15",
    category: "milestone",
    categoryLabel: "Projects & Exams",
    color: "var(--cat-milestone)",
    date: "11 Dec",
    title: "Final Exam & Viewbook",
    subtitle: "Final written exam and final group Viewbook submission",
    note: "Verify all photos, links, team credits, and checklist items before deploying to Vercel."
  },
  {
    id: "w16",
    code: "W16",
    num: "16",
    category: "milestone",
    categoryLabel: "Projects & Exams",
    color: "var(--cat-milestone)",
    date: "14 Dec",
    title: "Final Project Presentations",
    subtitle: "Poster showcase, live product demos, and final project report",
    note: "Prepare poster visuals, demo script, and user test metrics for Demo Day."
  }
];
