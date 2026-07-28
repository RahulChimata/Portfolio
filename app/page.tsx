"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
import { EngineeringCanvas } from "./engineering-canvas";
import { portfolioData, type ProjectEntry } from "./portfolio-data";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectIcon({ icon }: { icon: ProjectEntry["icon"] }) {
  if (icon === "drone") {
    return (
      <span
        className="project-graphic project-graphic--drone"
        aria-hidden="true"
      >
        <svg className="drone-graphic" viewBox="0 0 260 180">
          <path
            className="drone-armature"
            d="M112 77L53 48M148 77L207 48M108 96L51 119M152 96L209 119"
          />
          <g className="drone-rotor">
            <ellipse cx="43" cy="43" rx="35" ry="10" />
            <path d="M11 43H75M25 37L61 49" />
            <circle cx="43" cy="43" r="5" />
          </g>
          <g className="drone-rotor">
            <ellipse cx="217" cy="43" rx="35" ry="10" />
            <path d="M185 43H249M199 37L235 49" />
            <circle cx="217" cy="43" r="5" />
          </g>
          <g className="drone-rotor">
            <ellipse cx="43" cy="122" rx="35" ry="10" />
            <path d="M11 122H75M25 116L61 128" />
            <circle cx="43" cy="122" r="5" />
          </g>
          <g className="drone-rotor">
            <ellipse cx="217" cy="122" rx="35" ry="10" />
            <path d="M185 122H249M199 116L235 128" />
            <circle cx="217" cy="122" r="5" />
          </g>
          <path
            className="drone-shell"
            d="M106 68H154L170 86L154 108H106L90 86L106 68Z"
          />
          <path className="drone-top-panel" d="M111 75H149L157 86L149 96H111L103 86L111 75Z" />
          <circle className="drone-status-light" cx="130" cy="85" r="5" />
          <path className="drone-landing-gear" d="M111 106L101 137H85M149 106L159 137H175" />
          <g className="drone-camera">
            <path d="M120 108V119H140V108" />
            <rect x="116" y="117" width="28" height="20" rx="6" />
            <circle cx="130" cy="127" r="6" />
            <circle cx="130" cy="127" r="2" />
          </g>
          <path className="drone-scan" d="M103 145Q130 160 157 145" />
        </svg>
      </span>
    );
  }

  if (icon === "solar") {
    return (
      <span
        className="project-graphic project-graphic--solar"
        aria-hidden="true"
      >
        <span className="solar-sun" />
        <span className="solar-beam" />
        <span className="solar-panel">
          <span className="solar-panel-highlight" />
        </span>
        <span className="solar-stand" />
      </span>
    );
  }

  if (icon === "eye") {
    return (
      <span className="project-graphic project-graphic--eye" aria-hidden="true">
        <span className="eye-outline">
          <span className="eye-iris">
            <span className="eye-pupil">
              <span className="eye-reflection" />
            </span>
          </span>
        </span>
        <span className="eye-target-ring" />
        <span className="eye-scan-line" />
      </span>
    );
  }

  if (icon === "circuit-heart") {
    return (
      <span
        className="project-graphic project-graphic--circuit-heart"
        aria-hidden="true"
      >
        <svg className="circuit-heart" viewBox="0 0 240 180">
          <path
            className="circuit-heart-outline"
            d="M120 158C101 139 47 108 47 66C47 42 64 27 86 27C101 27 113 35 120 47C127 35 139 27 154 27C176 27 193 42 193 66C193 108 139 139 120 158Z"
          />
          <path
            className="circuit-heart-trace"
            d="M25 91H76L91 66L108 119L126 75L140 101H215"
          />
          <path
            className="circuit-heart-branch"
            d="M76 91V49H95M140 101V132H165"
          />
          <circle className="circuit-heart-node" cx="25" cy="91" r="4" />
          <circle className="circuit-heart-node" cx="95" cy="49" r="4" />
          <circle className="circuit-heart-node" cx="165" cy="132" r="4" />
          <circle className="circuit-heart-node" cx="215" cy="101" r="4" />
        </svg>
      </span>
    );
  }

  return (
    <span
      className="project-graphic project-graphic--robot-arm"
      aria-hidden="true"
    >
      <svg className="robot-arm-graphic" viewBox="0 0 240 180">
        <path className="robot-arm-ground" d="M24 158H216" />
        <rect className="robot-arm-block robot-arm-block--one" x="27" y="130" width="27" height="27" />
        <rect className="robot-arm-block robot-arm-block--two" x="187" y="134" width="23" height="23" />
        <rect className="robot-arm-base" x="67" y="145" width="67" height="13" rx="3" />
        <path className="robot-arm-link" d="M91 145L105 101L153 72L177 92" />
        <circle className="robot-arm-joint" cx="91" cy="145" r="9" />
        <circle className="robot-arm-joint" cx="105" cy="101" r="9" />
        <circle className="robot-arm-joint" cx="153" cy="72" r="8" />
        <g className="robot-arm-claw">
          <path d="M177 92L189 83M177 92L188 103" />
          <circle cx="177" cy="92" r="6" />
        </g>
        <path className="robot-arm-signal" d="M74 123C56 105 56 78 75 59C94 40 122 40 141 58" />
        <circle className="robot-arm-signal-node" cx="74" cy="123" r="3" />
        <circle className="robot-arm-signal-node" cx="141" cy="58" r="3" />
      </svg>
    </span>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const data = portfolioData;

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0,
      );
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const navigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    setMobileOpen(false);
  }, []);

  return (
    <main>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <header className="site-header">
        <a
          className="wordmark"
          href="#home"
          aria-label={`${data.profile.name}, back to top`}
          onClick={(event) => {
            event.preventDefault();
            navigate("home");
          }}
        >
          <span className="wordmark-mark">{data.profile.initials}</span>
          <span className="wordmark-name">{data.profile.name}</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                navigate(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav
          id="mobile-navigation"
          className={`mobile-nav ${mobileOpen ? "is-open" : ""}`}
          aria-label="Mobile navigation"
        >
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                navigate(item.id);
              }}
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="hero-copy" id="main-content">
          <p className="eyebrow hero-eyebrow">{data.profile.eyebrow}</p>
          <h1>
            {data.profile.headline}{" "}
            <span>{data.profile.headlineAccent}</span>
          </h1>
          <p className="hero-intro">{data.profile.introduction}</p>
          <div className="hero-actions">
            <button
              className="button button--dark"
              type="button"
              onClick={() => navigate("experience")}
            >
              Explore my work <span aria-hidden="true">↓</span>
            </button>
            <a className="text-link" href={`mailto:${data.profile.email}`}>
              Start a conversation <ArrowIcon />
            </a>
          </div>
          <div className="hero-meta">
            <span>{data.profile.location}</span>
            <span>{data.profile.availability}</span>
          </div>
        </div>

        <EngineeringCanvas />

        <div className="hero-rail" aria-hidden="true">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>
      </section>

      <div className="content-shell">
        <section id="about" className="section about-section reveal">
          <div className="section-heading">
            <p className="section-number">01 / ABOUT</p>
            <h2>Learn about me.</h2>
          </div>
          <div className="about-grid">
            <figure className="about-portrait">
              <img
                src="/rahul-chimata-headshot.jpg"
                alt="Rahul Chimata wearing a suit and tie"
                width="800"
                height="800"
              />
              <figcaption>Rahul Chimata · Minneapolis, MN</figcaption>
            </figure>
            <div className="about-copy">
              <p className="about-kicker">Engineer · Researcher · Builder</p>
              <h3>
                Drawn to difficult problems and the learning that comes with
                solving them.
              </h3>
              <p>
                I’m a master’s student in Robotics at the University of
                Minnesota Twin Cities, where I’m also pursuing bachelor’s
                degrees in Computer Science and Computer Engineering. I enjoy
                work that asks me to learn quickly, think across disciplines,
                and connect software with real-world systems.
              </p>
              <p>
                My experience spans industry, academic research, teaching, and
                nonprofit leadership. I’ve built enterprise AI and engineering
                tools at IBM and Mortenson, contributed to computer-vision and
                NLP research at the University of Minnesota, and helped lead a
                driver-safety initiative through EyeDA.
              </p>
              <p>
                I’m currently seeking opportunities in software, robotics, or
                machine learning across engineering and research, where I can
                contribute to ambitious technical work, collaborate with
                thoughtful teams, and continue growing as an engineer.
              </p>
            </div>
          </div>
          <div className="principles" aria-label="Working principles">
            {["Think in systems", "Build to learn", "Document the why"].map(
              (principle, index) => (
                <div key={principle}>
                  <span>0{index + 1}</span>
                  <p>{principle}</p>
                </div>
              ),
            )}
          </div>
        </section>

        <section id="experience" className="section reveal">
          <div className="section-heading section-heading--split">
            <div>
              <p className="section-number">02 / EXPERIENCE</p>
              <h2>Professional background.</h2>
            </div>
            <p>
              Roles, research, and teams that shaped how I approach engineering
              problems.
            </p>
          </div>
          <div className="timeline">
            {data.experience.map((entry, index) => (
              <article className="timeline-item" key={`${entry.role}-${index}`}>
                <div className="timeline-index">0{index + 1}</div>
                <p className="timeline-period">{entry.period}</p>
                <div className="timeline-role">
                  <h3>{entry.role}</h3>
                  <p>{entry.organization}</p>
                </div>
                <div className="timeline-details">
                  <p>{entry.summary}</p>
                  <ul>
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section reveal">
          <div className="section-heading section-heading--split">
            <div>
              <p className="section-number">03 / PROJECTS</p>
              <h2>Built, tested, iterated.</h2>
            </div>
            <p>
              Selected engineering projects spanning autonomy, electrical
              engineering, embedded systems, and computer vision.
            </p>
          </div>
          <div className="project-grid">
            {data.projects.map((project, index) => (
              <article
                className={`project-card ${
                  data.projects.length % 2 === 1 &&
                  index === data.projects.length - 1
                    ? "project-card--wide"
                    : ""
                }`}
                key={project.id}
              >
                <span className="project-number">{project.number}</span>
                <span className="project-category">{project.category}</span>
                <ProjectIcon icon={project.icon} />
                <h3 className="project-title">{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <ul className="project-tech" aria-label="Project technologies">
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <div className="project-open">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label} <ArrowIcon />
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section skills-section reveal">
          <div className="section-heading section-heading--split">
            <div>
              <p className="section-number">04 / SKILLS & TOOLS</p>
              <h2>A practical toolkit.</h2>
            </div>
            <p>
              Tools are only useful when paired with sound judgment, clear
              communication, and a repeatable process.
            </p>
          </div>
          <div className="skills-grid">
            {data.skills.map((group, index) => (
              <article key={group.category}>
                <div className="skills-head">
                  <span>0{index + 1}</span>
                  <h3>{group.category}</h3>
                </div>
                <ul>
                  {group.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section education-section reveal">
          <div className="section-heading">
            <p className="section-number">05 / EDUCATION</p>
            <h2>Academic experience.</h2>
          </div>
          {data.education.map((entry) => (
            <article className="education-card" key={entry.degree}>
              <div className="education-monogram" aria-hidden="true">
                MN
              </div>
              <div>
                <p>{entry.period}</p>
                <h3>{entry.degree}</h3>
                <h4>{entry.school}</h4>
              </div>
              <p>{entry.focus}</p>
            </article>
          ))}
        </section>
      </div>

      <section id="contact" className="contact-section reveal">
        <div className="contact-orbit" aria-hidden="true">
          <span />
          <span />
          <i />
        </div>
        <div className="contact-inner">
          <p className="section-number section-number--light">06 / CONTACT</p>
          <h2>
            <span>Let&apos;s connect!</span>
          </h2>
          <p>
            I’m interested in software, robotics, AI, and research work where
            careful engineering turns ambitious ideas into useful systems.
          </p>
          <div className="contact-actions">
            <a
              className="button button--light"
              href={`mailto:${data.contact.email}`}
            >
              {data.contact.email} <ArrowIcon />
            </a>
            {data.resumeUrl && (
              <a
                className="text-link text-link--light"
                href={data.resumeUrl}
                download
              >
                Download résumé <span aria-hidden="true">↓</span>
              </a>
            )}
          </div>
          <div className="contact-footer">
            <span>© 2026 {data.profile.name}</span>
            <div>
              {data.contact.linkedinUrl && (
                <a
                  href={data.contact.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}
              {data.contact.githubUrl && (
                <a
                  href={data.contact.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}
              <button type="button" onClick={() => navigate("home")}>
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
