export type ExperienceEntry = {
  period: string;
  role: string;
  organization: string;
  summary: string;
  highlights: string[];
};

export type ProjectEntry = {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  technologies: string[];
  repositoryUrl?: string;
  demoUrl?: string;
};

export type EducationEntry = {
  degree: string;
  school: string;
  period: string;
  focus: string;
};

export type PortfolioData = {
  profile: {
    name: string;
    initials: string;
    eyebrow: string;
    headline: string;
    introduction: string;
    location: string;
    availability: string;
    email: string;
  };
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: { category: string; items: string[] }[];
  education: EducationEntry[];
  contact: {
    email: string;
    linkedinUrl?: string;
    githubUrl?: string;
  };
  resumeUrl?: string;
};

/**
 * Replace the sample copy in this file with your real portfolio details.
 * Optional links are intentionally omitted so the starter never renders
 * broken actions.
 */
export const portfolioData: PortfolioData = {
  profile: {
    name: "YOUR NAME",
    initials: "YN",
    eyebrow: "Engineering student · Systems thinker · Builder",
    headline: "Designing systems that move ideas into the real world.",
    introduction:
      "I’m an engineering student drawn to the space where hardware, software, and thoughtful design meet. I turn ambiguous problems into tested, practical systems—and document the decisions along the way.",
    location: "Based in your city",
    availability: "Open to internships & research roles",
    email: "hello@yourname.dev",
  },
  experience: [
    {
      period: "SUMMER 2026",
      role: "Engineering Intern",
      organization: "Technology Company",
      summary:
        "Use this entry to describe the system, product, or process you helped improve—and the people who benefited from it.",
      highlights: [
        "Quantify a result: cycle time, accuracy, reliability, cost, or test coverage.",
        "Name the engineering decision you owned and how you validated it.",
      ],
    },
    {
      period: "2025 — PRESENT",
      role: "Undergraduate Researcher",
      organization: "University Research Lab",
      summary:
        "Explain the research question, your experimental or computational contribution, and what the team learned.",
      highlights: [
        "Describe the apparatus, model, or analysis pipeline you developed.",
        "Reference a poster, paper, dataset, or milestone when available.",
      ],
    },
    {
      period: "2024 — 2025",
      role: "Design Team Lead",
      organization: "Engineering Design Team",
      summary:
        "Show how you coordinated technical work, handled constraints, and moved a multidisciplinary team toward a build.",
      highlights: [
        "Highlight a design review, prototype iteration, or competition result.",
        "Include collaboration across mechanical, electrical, and software work.",
      ],
    },
  ],
  projects: [
    {
      id: "autonomous-rover",
      number: "01",
      title: "Autonomous Rover",
      category: "ROBOTICS · SAMPLE PROJECT",
      summary:
        "A compact field robot that maps unfamiliar terrain and plans a safe route in real time.",
      challenge:
        "Create dependable navigation from noisy sensors while staying within a student-scale power, compute, and fabrication budget.",
      approach:
        "Combine modular mechanical packaging with sensor fusion, occupancy mapping, and repeatable bench-to-field test protocols.",
      outcome:
        "Replace this text with a measurable result such as route completion, localization error, runtime, or competition placement.",
      technologies: ["ROS 2", "C++", "Python", "LiDAR", "CAD"],
    },
    {
      id: "energy-monitor",
      number: "02",
      title: "Smart Energy Monitor",
      category: "EMBEDDED SYSTEMS · SAMPLE PROJECT",
      summary:
        "A non-invasive device that turns live electrical measurements into useful energy insights.",
      challenge:
        "Capture meaningful data safely, filter measurement noise, and make the resulting information clear enough to change behavior.",
      approach:
        "Prototype the sensing circuit, calibrate it against known loads, and stream summarized readings to a focused web interface.",
      outcome:
        "Add the accuracy achieved, sampling performance, or energy-saving insight your finished project produced.",
      technologies: ["ESP32", "C", "Signal Processing", "React", "PCB Design"],
    },
    {
      id: "composite-rig",
      number: "03",
      title: "Composite Test Rig",
      category: "MECHANICAL DESIGN · SAMPLE PROJECT",
      summary:
        "A modular fixture for repeatable structural testing of lightweight composite coupons.",
      challenge:
        "Design a safe, stiff, and adaptable rig that reduces setup variation without obscuring specimen behavior.",
      approach:
        "Use first-principles sizing and finite-element checks, then validate alignment and stiffness through progressive load tests.",
      outcome:
        "Insert a result such as reduced setup time, improved repeatability, maximum load, or correlation to simulation.",
      technologies: ["SolidWorks", "FEA", "GD&T", "DAQ", "Rapid Prototyping"],
    },
  ],
  skills: [
    {
      category: "DESIGN",
      items: ["CAD", "GD&T", "Design for Manufacturing", "Rapid Prototyping"],
    },
    {
      category: "COMPUTE",
      items: ["Python", "C / C++", "MATLAB", "React & TypeScript"],
    },
    {
      category: "ANALYSIS",
      items: ["FEA", "Data Acquisition", "Signal Processing", "Technical Writing"],
    },
    {
      category: "BUILD",
      items: ["3D Printing", "Machining", "Embedded Systems", "Test Planning"],
    },
  ],
  education: [
    {
      degree: "B.S. in Your Engineering Discipline",
      school: "Your University",
      period: "Expected 2027",
      focus:
        "Relevant focus: controls, product design, embedded systems, robotics, or the coursework that best supports your goals.",
    },
  ],
  contact: {
    email: "hello@yourname.dev",
  },
  resumeUrl: undefined,
};
