/* ==========================================================================
   data/weeks-part1.js
   Owner: Teammate 1 (Weeks 01 – 07 content & photos)
   To add a photo: put the image in assets/img/ and set src: "assets/img/..."
   ========================================================================== */

window.VIEWBOOK = window.VIEWBOOK || {};

window.VIEWBOOK.weeksPart1 = [
  {
    id: "w1",
    code: "W01",
    num: "01",
    category: "foundation",
    categoryLabel: "Design & Team",
    color: "var(--cat-foundation)",
    date: "7 Aug",
    title: "What Engineers Do?",
    subtitle: "Course orientation, engineering mindset, and how the 16-week journey works",
    lecturer: "Asst. Prof. Dr. Jumpol Polvichai",
    summary:
      "We kicked off the semester by reframing what computer engineers actually do: we do not just write code—we define real problems, weigh trade-offs, test prototypes, and explain our work clearly.",
    photos: [
      {
        src: "assets/img/w01-1.jpg",
        placeholderPath: "assets/img/w01-1.jpg",
        label: "Week 01 // First-Day Orientation",
        caption: "Freshmen seated across CPE 1114 with laptops and notebooks as the instructor kicks off CPE102 orientation."
      },
      {
        src: "assets/img/w01-2.jpg",
        placeholderPath: "assets/img/w01-2.jpg",
        label: "Week 01 // House Sorting Ceremony",
        caption: "Instructor and TA lowering the white engineering hard hat onto a freshman during the house sorting ceremony."
      },
      {
        src: "assets/img/w01-3.jpg",
        placeholderPath: "assets/img/w01-3.jpg",
        label: "Week 01 // Welcome to the House",
        caption: "Another freshman takes a seat at the front of the room for the traditional hard-hat house sorting moment."
      }
    ],
    concepts: [
      {
        title: "The Engineering Design Loop",
        body: "Define -> Ideate -> Prototype -> Test -> Iterate. Good engineering is rarely a straight line; every failed test reveals a constraint we missed on paper."
      },
      {
        title: "Where Software Meets Hardware",
        body: "CPE102 connects digital logic with physical machines, taking us from 2D sketches and sensors all the way to full team products."
      },
      {
        title: "Document Early",
        body: "Keeping a weekly photo log and short lab notes saves hours of guesswork when building final reports and this Viewbook."
      }
    ],
    whatWeDid: [
      "Reviewed the CPE102 syllabus, grading weights, and key project deadlines",
      "Formed our group and set up a shared folder and chat channel",
      "Practiced breaking vague problems into measurable engineering goals"
    ],
    checklist: [
      { id: "r-w1-1", text: "Explain all 5 stages of the Engineering Design Process" },
      { id: "r-w1-2", text: "Mark Project 1 (W08) and Project 2 (W16) dates on calendar" },
      { id: "r-w1-3", text: "Create a shared folder for lab photos and test notes" }
    ],
    tip: "Start a shared photo album in Week 1 and drop 2–3 snapshots after every lab. Searching for photos at Week 14 is painful."
  },

  {
    id: "w2",
    code: "W02",
    num: "02",
    category: "foundation",
    categoryLabel: "Design & Team",
    color: "var(--cat-foundation)",
    date: "14 Aug",
    title: "Working Foundation",
    subtitle: "Teamwork mechanics, RACI ownership, and DISC communication styles",
    lecturer: "Guest Speaker & CPE102 Team",
    summary:
      "Most student projects stall from unclear communication, not technical bugs. This session introduced simple frameworks to divide ownership fairly and understand how different teammates work best.",
    photos: [
      {
        src: "assets/img/w02-1.jpg",
        placeholderPath: "assets/img/w02-1.jpg",
        label: "Week 02 // Timed Problem Sprint",
        caption: "Teams huddle around laptops under a live countdown timer to solve the first-day lost-classroom scenario."
      },
      {
        src: "assets/img/w02-2.jpg",
        placeholderPath: "assets/img/w02-2.jpg",
        label: "Week 02 // Engineering Soft Skills",
        caption: "Lecturer introducing the seven core engineering soft skills—from creativity and ethics to teamwork and communication."
      },
      {
        src: "assets/img/w02-3.jpg",
        placeholderPath: "assets/img/w02-3.jpg",
        label: "Week 02 // Problem–Solution Pitch",
        caption: "A student team presenting their one-page Problem, Solution, and Why slide at the front of the classroom."
      },
      {
        src: "assets/img/w02-4.jpg",
        placeholderPath: "assets/img/w02-4.jpg",
        label: "Week 02 // Project Charter Presentation",
        caption: "Team presenters walking through their Goal, Tasks, Owners, Risks, and Timeline board during the sprint review."
      },
      {
        src: "assets/img/w02-5.jpg",
        placeholderPath: "assets/img/w02-5.jpg",
        label: "Week 02 // Platform Idea Demo",
        caption: "Student presenter using a pointer stick to explain a unified classroom information and chat platform."
      }
    ],
    concepts: [
      {
        title: "RACI Responsibility Matrix",
        body: "A quick grid so nobody says 'I thought someone else handled that':",
        table: [
          ["R · Responsible", "Person who actually builds or executes the task"],
          ["A · Accountable", "Single final decision-maker who signs off on quality"],
          ["C · Consulted", "Teammates asked for technical input (two-way chat)"],
          ["I · Informed", "Teammates kept updated on progress (one-way notice)"]
        ]
      },
      {
        title: "DISC Working Styles",
        body: "Understanding how teammates react under tight deadlines:",
        table: [
          ["D · Dominance", "Direct, results-driven, moves quickly to decisions"],
          ["I · Influence", "Energetic, expressive, keeps morale high"],
          ["S · Steadiness", "Calm, dependable, keeps collaboration smooth"],
          ["C · Conscientiousness", "Detail-oriented, analytical, checks edge cases"]
        ]
      }
    ],
    whatWeDid: [
      "Took a quick DISC assessment and discussed each member's strengths",
      "Built a RACI responsibility sheet for our Project 1 sub-tasks",
      "Ran a timed problem-solving sprint and held a short retrospective"
    ],
    checklist: [
      { id: "r-w2-1", text: "Tell the difference between Responsible (R) and Accountable (A)" },
      { id: "r-w2-2", text: "Know each teammate's preferred way of receiving feedback" },
      { id: "r-w2-3", text: "Agree on weekly check-in times for team progress" }
    ],
    tip: "Whenever you assign a task in chat, always write two things next to it: an owner's name and a deadline."
  },

  {
    id: "w3",
    code: "W03",
    num: "03",
    category: "foundation",
    categoryLabel: "Design & Team",
    color: "var(--cat-foundation)",
    date: "21 Aug",
    title: "Computer Aided Design",
    subtitle: "2D engineering drawings, ISO 128 line standards, and 3D modeling in Onshape",
    lecturer: "CPE102 CAD Instructors",
    summary:
      "We moved from rough paper sketches to precise CAD parts—learning how orthographic views describe 3D geometry and how to prepare parts for laser cutting and 3D printing.",
    photos: [
      {
        src: "assets/img/w03-1.jpg",
        placeholderPath: "assets/img/w03-1.jpg",
        label: "Week 03 // INNO-X 3D Printing Lab",
        caption: "Staff introducing fabrication workflows around the workbench with a row of 3D printers lining the INNO-X wall."
      },
      {
        src: "assets/img/w03-2.jpg",
        placeholderPath: "assets/img/w03-2.jpg",
        label: "Week 03 // Onshape CAD Lecture",
        caption: "Instructor breaking down the core Onshape workflow: Sketch, Forming and Cutting, and View Orientation."
      },
      {
        src: "assets/img/w03-3.jpg",
        placeholderPath: "assets/img/w03-3.jpg",
        label: "Week 03 // Orthographic Drawing Help",
        caption: "A TA guiding students through top, front, and right-side orthographic projection worksheets alongside Onshape."
      },
      {
        src: "assets/img/w03-4.jpg",
        placeholderPath: "assets/img/w03-4.jpg",
        label: "Week 03 // INNO-X Orientation",
        caption: "Makerspace staff briefing freshmen on INNO-X (Innovation Exchange) access, safety, and prototyping equipment."
      }
    ],
    concepts: [
      {
        title: "ISO 128 Line Types",
        body: "Standard line styles tell machinists what is solid, hidden, or symmetric:",
        table: [
          ["Continuous Thick", "Visible outer edges and object outlines"],
          ["Dashed Line", "Hidden edges behind a face"],
          ["Chain Thin", "Centerlines and axes of symmetry"],
          ["Dimension Line", "Exact measurements and radii in millimeters (mm)"]
        ]
      },
      {
        title: "Parametric Modeling",
        body: "Using variables and sketch constraints in Onshape lets you change material thickness (e.g., 3 mm to 5 mm acrylic) once and update every slot automatically."
      }
    ],
    whatWeDid: [
      "Created fully defined 2D sketches with geometric and dimensional constraints",
      "Built 3D parts and mated assemblies inside Onshape",
      "Exported DXF profiles for laser cutting and STL meshes for 3D printing"
    ],
    beforeClass: [
      "Register a free Onshape Education account using your university email",
      "Bring an external mouse—orbiting 3D parts on a laptop trackpad slows you down"
    ],
    checklist: [
      { id: "r-w3-1", text: "Read Top, Front, and Right Side orthographic projections accurately" },
      { id: "r-w3-2", text: "Identify Visible, Hidden, and Centerline strokes per ISO 128" },
      { id: "r-w3-3", text: "Export clean DXF and STL files ready for fabrication" }
    ],
    tip: "Always add 0.2–0.4 mm tolerance to press-fit slots and screw holes—laser kerf and 3D printer shrinkage will make exact fits too tight."
  },

  {
    id: "w4",
    code: "W04",
    num: "04",
    category: "hardware",
    categoryLabel: "Hardware & AI",
    color: "var(--cat-hardware)",
    date: "28 Aug",
    title: "Basic Embedded Systems",
    subtitle: "Circuits, Ohm's Law, PWM signals, sensors, and microcontrollers",
    lecturer: "CPE102 Embedded Team",
    summary:
      "Hands-on electronics week: wiring breadboards safely, measuring voltage with a multimeter, reading analog sensors, and driving motors via PWM from a microcontroller.",
    photos: [
      {
        src: "assets/img/w04-1.jpg",
        placeholderPath: "assets/img/w04-1.jpg",
        label: "Week 04 // Robotics Lab Session",
        caption: "Freshmen assembling InEngBot kits and writing code across the lab desks while TAs circulate to troubleshoot."
      },
      {
        src: "assets/img/w04-2.jpg",
        placeholderPath: "assets/img/w04-2.jpg",
        label: "Week 04 // Motor & Chassis Wiring",
        caption: "Close-up of wiring the 2WD motor leads from the yellow-wheeled chassis into the controller board."
      },
      {
        src: "assets/img/w04-3.jpg",
        placeholderPath: "assets/img/w04-3.jpg",
        label: "Week 04 // InEngMotor Arduino Sketch",
        caption: "Writing forward, stop, and backward drive sequences with InEngMotor.h in Arduino IDE next to the rover board."
      },
      {
        src: "assets/img/w04-4.jpg",
        placeholderPath: "assets/img/w04-4.jpg",
        label: "Week 04 // Assembled 2WD Rover",
        caption: "Showing off a freshly assembled yellow-base InEngBot outside room 1120 after completing motor wiring."
      }
    ],
    concepts: [
      {
        title: "Ohm's Law & Pull-Up Resistors",
        body: "V = I × R helps size resistors so LEDs do not burn out. Pull-up or pull-down resistors prevent button input pins from floating randomly."
      },
      {
        title: "PWM (Pulse Width Modulation)",
        body: "Switching a digital pin HIGH and LOW rapidly controls average power—letting us dim LEDs, set servo angles, and vary robot wheel speeds."
      },
      {
        title: "Lab Safety Rule",
        body: "Always unplug USB and battery power before changing breadboard wires, and double-check +5V/3.3V vs GND polarity first."
      }
    ],
    whatWeDid: [
      "Measured circuit voltage and continuity using a digital multimeter",
      "Wrote Arduino sketches for digital I/O, analog sensors, and Serial Monitor logs",
      "Tested motor driver wiring in preparation for our competition robot"
    ],
    beforeClass: [
      "Install Arduino IDE and USB-to-Serial drivers (CP210x / CH340)",
      "Bring a USB cable that supports data transfer (not charge-only)"
    ],
    checklist: [
      { id: "r-w4-1", text: "Calculate resistor values quickly using V = I × R" },
      { id: "r-w4-2", text: "Explain the difference between Digital I/O, ADC input, and PWM" },
      { id: "r-w4-3", text: "Remember to connect a Common Ground (GND) between board and battery" }
    ],
    tip: "If your microcontroller randomly resets when motors spin, check two things: shared GND wire and whether your battery can handle motor current spikes."
  },

  {
    id: "w5",
    code: "W05",
    num: "05",
    category: "hardware",
    categoryLabel: "Hardware & AI",
    color: "var(--cat-hardware)",
    date: "4 Sep",
    title: "Intelligent Systems",
    subtitle: "How computers see images, color spaces, and basic image classification",
    lecturer: "CPE102 AI & Vision Team",
    summary:
      "We explored how raw camera frames become numeric arrays, why HSV beats RGB under changing lights, and how to train and evaluate an image classifier properly.",
    photos: [
      {
        src: "assets/img/w05-1.jpg",
        placeholderPath: "assets/img/w05-1.jpg",
        label: "Week 05 // Computer Vision Lecture",
        caption: "TA explaining the difference between Image Processing and Computer Vision at the front of the classroom."
      },
      {
        src: "assets/img/w05-2.jpg",
        placeholderPath: "assets/img/w05-2.jpg",
        label: "Week 05 // Teachable Machine Poses",
        caption: "Capturing live hand-gesture samples in front of the Teachable Machine challenge prompt."
      },
      {
        src: "assets/img/w05-3.jpg",
        placeholderPath: "assets/img/w05-3.jpg",
        label: "Week 05 // Gesture Model Testing",
        caption: "Testing a thumbs-down hand gesture in front of the tripod camera while a TA verifies live classification."
      }
    ],
    concepts: [
      {
        title: "Image Array Shapes",
        body: "To code, a digital photo is simply a multi-dimensional grid of numbers:",
        table: [
          ["Grayscale", "(Height, Width, 1) — brightness 0 to 255 per pixel"],
          ["RGB Color", "(Height, Width, 3) — Red, Green, and Blue channels"],
          ["HSV Space", "Hue, Saturation, Value — isolates color better under shadows"]
        ]
      },
      {
        title: "Train / Validation / Test Split",
        body: "Never evaluate a model on images it already trained on. Unseen test data exposes overfitting before deployment."
      }
    ],
    whatWeDid: [
      "Collected a balanced multi-class image dataset with varied backgrounds",
      "Trained a quick classifier in Teachable Machine and inspected Colab scripts",
      "Converted camera frames to HSV to detect distinct gemstone colors reliably"
    ],
    checklist: [
      { id: "r-w5-1", text: "Read and explain image tensor shapes (H, W, Channels)" },
      { id: "r-w5-2", text: "Explain why Train, Validation, and Test splits must stay separate" },
      { id: "r-w5-3", text: "Understand why Hue in HSV is more stable than raw RGB values" }
    ],
    tip: "Classroom lighting is not competition arena lighting! Always collect sample images under dim, bright, and angled lights before locking thresholds."
  },

  {
    id: "w6",
    code: "W06",
    num: "06",
    category: "hardware",
    categoryLabel: "Hardware & AI",
    color: "var(--cat-hardware)",
    date: "11 Sep",
    title: "Natural Language Processing",
    subtitle: "Tokenization, word embeddings, semantic similarity, and LLM limits",
    lecturer: "CPE102 NLP Instructors",
    summary:
      "Opened the black box behind language models—tracing how sentences split into tokens, map into vector space, and why clear prompts and verification still matter.",
    photos: [
      {
        src: "assets/img/w06-1.jpg",
        placeholderPath: "assets/img/w06-1.jpg",
        label: "Week 06 // Python Workshop",
        caption: "Instructor leading the Python fundamentals session from the front desk while students follow along on laptops."
      },
      {
        src: "assets/img/w06-2.jpg",
        placeholderPath: "assets/img/w06-2.jpg",
        label: "Week 06 // Python Environment Setup",
        caption: "Downloading Python for Windows to configure the local interpreter before starting the coding exercises."
      }
    ],
    concepts: [
      {
        title: "Tokens & Embeddings",
        body: "Models process subword chunks called tokens, then map each token into a dense vector where words with similar meaning sit close together."
      },
      {
        title: "Cosine Similarity",
        body: "Measures the angle between two embedding vectors—closer to 1.0 means stronger semantic similarity, regardless of exact wording."
      }
    ],
    whatWeDid: [
      "Ran a Google Colab notebook exploring text preprocessing and tokenization",
      "Calculated vector similarity scores across sample FAQ queries",
      "Tested prompt patterns to enforce structured output and reduce hallucinations"
    ],
    beforeClass: [
      "Log in to a Google account so you can copy and run Colab notebooks smoothly"
    ],
    checklist: [
      { id: "r-w6-1", text: "Understand why non-English text often splits into more tokens" },
      { id: "r-w6-2", text: "Explain what a text embedding and cosine similarity measure" },
      { id: "r-w6-3", text: "Know how to verify LLM answers instead of trusting output blindly" }
    ],
    tip: "When using an AI API inside a project, give it a strict JSON schema and 1–2 examples—it makes downstream parsing far more reliable."
  },

  {
    id: "w7",
    code: "W07",
    num: "07",
    category: "systems",
    categoryLabel: "Code & Systems",
    color: "var(--cat-systems)",
    date: "25 Sep",
    title: "Programming Concept",
    subtitle: "Problem decomposition, timing math, and Finite State Machines (FSM)",
    lecturer: "CPE102 Programming Team",
    summary:
      "Focused on writing clean, predictable control logic—breaking big behaviors into focused functions and using State Machines instead of tangled nested loops.",
    photos: [
      {
        src: "assets/img/w07-1.jpg",
        placeholderPath: "assets/img/w07-1.jpg",
        label: "Week 07 // Raspberry Pi Pair Debug",
        caption: "Teammates checking GPIO pinouts and code together beside a breadboard and Raspberry Pi kit."
      },
      {
        src: "assets/img/w07-2.jpg",
        placeholderPath: "assets/img/w07-2.jpg",
        label: "Week 07 // Blinking LED Circuit",
        caption: "Testing a wired red LED circuit on the breadboard while editing the Python GPIO script on a laptop."
      },
      {
        src: "assets/img/w07-3.jpg",
        placeholderPath: "assets/img/w07-3.jpg",
        label: "Week 07 // Group Breadboard Bench",
        caption: "Multiple pairs wiring Raspberry Pi breadboards around the workbench while a TA explains circuit checks."
      }
    ],
    concepts: [
      {
        title: "Frequency & Period Timing",
        body: "Converting audio or control loop frequency into exact microsecond delays:",
        terminal: "// Middle C note -> period timing\nf = 261.626 Hz\nT = 1 / f = 0.003822 s = 3.82 ms\nhalf_period = 1911 us"
      },
      {
        title: "Finite State Machine (FSM)",
        body: "Splitting behavior into clear states (IDLE -> SEEK -> GRAB -> SORT) keeps robot firmware easy to debug when something gets stuck mid-run."
      }
    ],
    whatWeDid: [
      "Refactored monolithic scripts into clean, single-purpose helper functions",
      "Designed a non-blocking Finite State Machine for autonomous robot steps",
      "Tested edge-case inputs and added clear serial debug logs"
    ],
    beforeClass: [
      "Have VS Code and Python/C++ installed and tested before the lab starts"
    ],
    checklist: [
      { id: "r-w7-1", text: "Break a multi-step problem into small, testable functions" },
      { id: "r-w7-2", text: "Draw a clean State Machine diagram with clear transition triggers" },
      { id: "r-w7-3", text: "Convert frequency (Hz) to period (ms / us) accurately" }
    ],
    tip: "Change one thing at a time, test it, and commit working code before tweaking more—debugging 5 changes at once right before competition is brutal."
  }
];
