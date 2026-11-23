/* ==========================================================================
   data/projects.js
   Owner: Teammate 3 (Project 1 Robot Showcase & Project 2 Final Project)
   Edit robot specs, design evolution log, pipeline steps, and timeline here.
   ========================================================================== */

window.VIEWBOOK = window.VIEWBOOK || {};

window.VIEWBOOK.projects = {
  project1: {
    eyebrow: "PROJECT 1 · WEEKS 2–8",
    title: "Gemstone Colour-Sorting Robot",
    subtitle: "Dual-mode robot engineered for manual control and autonomous color sorting",
    summary:
      "Our first major hardware-software build—combining 3D CAD chassis design in Onshape, ESP32 motor/servo control, and color-sorting logic tested in the Week 8 arena competition.",
    gemstones: [
      { name: "Iridescent Violet", hex: "#8b5cf6" },
      { name: "Neon Cyan", hex: "#06b6d4" },
      { name: "Deep Crimson", hex: "#ef4444" },
      { name: "Marigold Accent", hex: "#f59e0b" },
      { name: "Deep Sky Blue", hex: "#0284c7" },
      { name: "Lime Green", hex: "#22c55e" }
    ],
    competitionSpecs: [
      ["Task", "Collect and sort 6 colored gemstones into matching target zones"],
      ["Size Limit", "Must fit inside the standard competition cube envelope"],
      ["Rounds", "Round 1 Manual Control + Round 2 Autonomous Sorting"],
      ["Hardware", "ESP32 microcontroller with standard competition actuators"],
      ["Scoring", "Points per correctly sorted gemstone plus speed/consistency bonus"]
    ],
    robotSpecs: [
      ["Robot Name", "Group C04 Bot (Edit Robot Name)"],
      ["Controller", "ESP32 DevKit + Dual H-Bridge Motor Driver"],
      ["Chassis", "3mm Laser-Cut Acrylic + 3D Printed Sensor Mounts"],
      ["Drivetrain", "2WD Geared DC Motors + Rear Caster"],
      ["Comms", "Wi-Fi UDP / ESP-NOW Low-Latency Link"]
    ],
    evolution: [
      {
        draft: "Draft 1",
        date: "1 Sep",
        concept: "Compact 2-wheel frame with a single front claw",
        problem: "Front-heavy balance caused tipping when extending the claw",
        next: "Widen wheelbase and shift battery pack toward the rear axle"
      },
      {
        draft: "Draft 2",
        date: "10 Sep",
        concept: "Front scoop ramp with a servo-driven sorting gate",
        problem: "Plastic micro-servo stalled when lifting multiple gems",
        next: "Upgrade to metal-gear servo and shorten the lever arm"
      },
      {
        draft: "Draft 3",
        date: "20 Sep",
        concept: "Added color detection + calibration routine before start",
        problem: "Ambient room light skewed RGB readings across arena corners",
        next: "Add light-shield shroud and switch logic to HSV thresholds"
      },
      {
        draft: "Final Build",
        date: "27 Sep",
        concept: "Rigid chassis running both UDP Manual and FSM Autonomous modes",
        problem: "Motor speed drifted as battery charge dropped over multiple runs",
        next: "Bring two fresh battery packs and verify PWM trim in the pit"
      }
    ],
    pipelines: [
      {
        title: "Round 1 · Manual Control Pipeline",
        steps: [
          "Laptop / Gamepad",
          "Wi-Fi UDP Packet",
          "ESP32 Receiver",
          "PWM Motor & Servo",
          "Collect & Drop Gems"
        ]
      },
      {
        title: "Round 2 · Autonomous Pipeline",
        steps: [
          "Camera / Color Sensor",
          "HSV Color Filter",
          "FSM Decision Logic",
          "Drive & Gate Actuation",
          "Target Color Zone"
        ]
      }
    ],
    rubric: [
      { label: "Mission Score (3 Arena Rounds)", pct: 30 },
      { label: "Engineering Design (2D CAD, 3D Model & Logic)", pct: 30 },
      { label: "Execution (Stability, Control & Troubleshooting)", pct: 20 },
      { label: "Project Plan & Teamwork", pct: 15 },
      { label: "Post-Competition Reflection", pct: 5 }
    ],
    photos: [
      {
        src: "",
        placeholderPath: "assets/img/robot-1.jpg",
        label: "Robot · 3D CAD",
        caption: "Full Onshape assembly showing drivetrain and sorting gate"
      },
      {
        src: "",
        placeholderPath: "assets/img/robot-2.jpg",
        label: "Robot · Wiring",
        caption: "Clean ESP32, motor driver, and battery layout inside chassis"
      },
      {
        src: "",
        placeholderPath: "assets/img/robot-3.jpg",
        label: "Robot · Arena Test",
        caption: "Live practice run calibrating gemstone color sorting"
      }
    ],
    reportLink: {
      label: "Open Robot Progress Report (PDF)",
      url: "#"
    }
  },

  project2: {
    eyebrow: "PROJECT 2 · WEEKS 9–16",
    title: "Final Group Project (Edit Project Title)",
    subtitle: "Software prototype solving a real campus or everyday problem",
    summary:
      "Our second-half capstone where we scoped a user problem, designed the system architecture, built an interactive Release 1 prototype, and iterated through user feedback.",
    liveLink: {
      label: "Try Live Prototype ↗",
      url: "https://expofinal-lyart.vercel.app"
    },
    slidesLink: {
      label: "View Progress Slides (Canva) ↗",
      url: "https://canva.link/t4x3cul1dj2ix2j"
    },
    features: [
      { name: "Core User Flow & UI Prototype", status: "done" },
      { name: "Data Model & Local Persistence", status: "done" },
      { name: "Key Feature #3 (Edit Feature Name)", status: "progress" },
      { name: "Mobile Responsive Polish", status: "progress" },
      { name: "User Testing & Bug Fixes", status: "todo" },
      { name: "Final Poster & Demo Deck", status: "todo" }
    ],
    timeline: [
      {
        date: "10 Nov",
        title: "Problem Discovery & Pitch",
        desc: "Defined target users, pain points, and Release 1 MVP scope"
      },
      {
        date: "15 Nov",
        title: "Wireframes & Data Design",
        desc: "Mapped user screens, data flow, and divided module ownership"
      },
      {
        date: "20 Nov",
        title: "Week 13 Progress Review",
        desc: "Demoed early prototype and collected lecturer & TA feedback"
      },
      {
        date: "1–10 Dec",
        title: "Integration & User Testing",
        desc: "Merged modules, fixed edge-case bugs, and ran usability checks"
      },
      {
        date: "14 Dec",
        title: "Final Poster & Demo Day",
        desc: "Live showcase, poster presentation, and final report delivery"
      }
    ],
    photos: [
      {
        src: "",
        placeholderPath: "assets/img/final-1.jpg",
        label: "Final · Title Slide",
        caption: "Opening slide introducing our Final Project problem and goal"
      },
      {
        src: "",
        placeholderPath: "assets/img/final-2.jpg",
        label: "Final · Release 1 UI",
        caption: "Main interactive screen of our Release 1 prototype"
      }
    ]
  }
};
