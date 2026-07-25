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
  icon: "drone" | "solar" | "eye";
  title: string;
  category: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  technologies: string[];
  links: {
    label: string;
    url: string;
  }[];
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
    headlineAccent: string;
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

export const portfolioData: PortfolioData = {
  profile: {
    name: "RAHUL CHIMATA",
    initials: "RC",
    eyebrow: "Robotics · Computer Science · Computer Engineering",
    headline: "Building intelligent systems across",
    headlineAccent: "software & robotics.",
    introduction:
      "I’m a University of Minnesota engineer working across enterprise AI, robotics research, infrastructure software, and embedded systems. I turn complex technical problems into practical, well-tested tools.",
    location: "Minneapolis, Minnesota",
    availability: "M.S. Robotics · Expected Dec. 2027",
    email: "rahul.chimata@gmail.com",
  },
  experience: [
    {
      period: "MAY — AUG. 2026",
      role: "Software Developer Intern",
      organization: "IBM · Lowell, Massachusetts",
      summary:
        "Architected and developed InfraHub, a production-grade enterprise knowledge retrieval system that helps HashiCorp engineers find infrastructure documentation, decisions, ownership information, and relevant code.",
      highlights: [
        "Built a watsonx-powered RAG pipeline spanning Backstage, Confluence, GitHub, and W3, combining BM25 and vector search with intent-aware ranking and trust scoring.",
        "Developed an MCP-based repository relationship tracker using graph and vector databases to map dependencies across HashiCorp repositories and broaden context for engineers and AI coding agents.",
      ],
    },
    {
      period: "MAY 2024 — SEP. 2025",
      role: "Software Developer & SCADA/P&C Engineering Intern",
      organization: "Mortenson Engineering Services · Golden Valley, Minnesota",
      summary:
        "Developed a Python, React, and FastAPI application that expedited protection and control engineering work by 15% by extracting structured data from electrical substation schematics.",
      highlights: [
        "Applied RAG, deep-learning image models, YOLO, agentic AI, Pandas, and REST APIs to process hundreds of schematics and prepare data for AutoCAD.",
        "Designed electrical and fiber-optic layouts, programmed real-time automation controllers, aggregated field data, and configured human-machine interfaces.",
      ],
    },
    {
      period: "NOV. 2025 — PRESENT",
      role: "Undergraduate Research Assistant",
      organization: "University of Minnesota · Minneapolis, Minnesota",
      summary:
        "Contribute to machine-learning research in the Minnesota Interactive Robotics and Vision Laboratory and to research on natural language processing.",
      highlights: [
        "Generate synthetic underwater-trash datasets with Blender, diffusion models, LLMs, and YOLOv11 to improve vision-model accuracy for underwater robots.",
        "Investigate dataset sparsity and agreement scaling laws while exploring NLP models that predict individual annotator responses to sentiment and offensiveness tasks.",
      ],
    },
    {
      period: "SEP. — DEC. 2024",
      role: "Undergraduate Teaching Assistant",
      organization: "University of Minnesota · Minneapolis, Minnesota",
      summary:
        "Supported Machine Architecture and Organization and Introduction to Robotics through hands-on instruction, mentoring, office hours, and assessment.",
      highlights: [
        "Led laboratory instruction in ROS 2, robotics principles, C, x86-64 assembly, and computer architecture.",
        "Mentored students, conducted office hours, and graded technical coursework.",
      ],
    },
    {
      period: "JUL. 2020 — MAY 2023",
      role: "EyeDA Project Co-Founder",
      organization: "Shreya R. Dixit Memorial Foundation · Eden Prairie, Minnesota",
      summary:
        "Co-founded a driver-safety project centered on a Python facial-recognition prototype for detecting driver distraction.",
      highlights: [
        "Built the prototype with OpenCV and MediaPipe.",
        "Managed interns and collaborated with industry, news, and community organizations to advance the project.",
      ],
    },
  ],
  projects: [
    {
      id: "autonomous-drone",
      number: "01",
      icon: "drone",
      title: "Autonomous Drone Simulation",
      category: "AUTONOMY · BACKEND SYSTEMS",
      summary:
        "A containerized backend for a reproducible drone-simulation environment and autonomous path-planning experiments.",
      challenge:
        "Create a scalable simulation backend that could model route constraints and environmental effects while supporting repeatable engineering experiments.",
      approach:
        "Used C++, containerization, CI/CD practices, and agile Git workflows to implement path planning, package routing, singleton data accumulation, weather-impact accounting, and robust backend endpoints.",
      outcome:
        "Delivered a reproducible simulation backend designed to support research, experimentation, and future system scaling.",
      technologies: ["C++", "Backend", "Docker", "CI/CD", "Git", "Agile"],
      links: [
        {
          label: "Docker Hub",
          url: "https://hub.docker.com/r/rahulchimata/drone_sim_final_project",
        },
      ],
    },
    {
      id: "solar-tracker",
      number: "02",
      icon: "solar",
      title: "Solar Tracking System",
      category: "EMBEDDED SYSTEMS · CIRCUIT DESIGN",
      summary:
        "An embedded control system that reads external sensor hardware and automatically adjusts solar-panel movement.",
      challenge:
        "Reliably move a solar panel in response to analog sensor data using constrained embedded hardware and low-level communication.",
      approach:
        "Developed C and assembly interfaces around the I²C protocol to retrieve analog-to-digital converter measurements from external hardware.",
      outcome:
        "Integrated sensing, communication, and motion logic into an automated solar-tracking prototype.",
      technologies: ["C", "Assembly", "I²C", "ADC", "Microcontrollers", "Circuits"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/RahulChimata/Solar-Tracking-Project",
        },
      ],
    },
    {
      id: "eyeda",
      number: "03",
      icon: "eye",
      title: "EyeDA Driver Safety",
      category: "COMPUTER VISION · PROJECT LEADERSHIP",
      summary:
        "A facial-recognition prototype that detects driver distraction and supports safer driving behavior.",
      challenge:
        "Translate computer-vision research into an approachable driver-safety prototype while coordinating a small project team.",
      approach:
        "Built the detection prototype in Python with OpenCV and MediaPipe, managed interns, and collaborated with external organizations.",
      outcome:
        "Advanced the project through technical development and recognition from industry, news, and community organizations.",
      technologies: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "CAD"],
      links: [
        {
          label: "Project site",
          url: "https://shreyadixit.org/shreya-innovation-lab/",
        },
      ],
    },
  ],
  skills: [
    {
      category: "SOFTWARE",
      items: ["Python", "C / C++", "Java", "JavaScript & TypeScript", "SQL"],
    },
    {
      category: "AI & DATA",
      items: ["RAG & Vector Search", "Computer Vision", "YOLO", "Diffusion Models", "NLP"],
    },
    {
      category: "FRAMEWORKS",
      items: ["React", "Node.js", "FastAPI", "Flask", "Docker & Terraform"],
    },
    {
      category: "ROBOTICS",
      items: ["ROS 2", "Embedded Systems", "I²C & Microcontrollers", "Verilog", "Vivado"],
    },
  ],
  education: [
    {
      degree: "Master’s in Robotics",
      school: "University of Minnesota - Twin Cities",
      period: "May 2026 — Dec. 2027",
      focus:
        "Graduate study focused on robotics, intelligent systems, perception, autonomy, and the software that connects research to real-world machines.",
    },
    {
      degree: "B.S. in Computer Science & Computer Engineering",
      school: "University of Minnesota - Twin Cities",
      period: "Aug. 2023 — May 2027",
      focus:
        "An interdisciplinary foundation spanning computer architecture, software systems, machine learning, electronics, and robotics.",
    },
  ],
  contact: {
    email: "rahul.chimata@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/rchimata/",
    githubUrl: "https://github.com/RahulChimata",
  },
  resumeUrl: "/resume.pdf",
};
