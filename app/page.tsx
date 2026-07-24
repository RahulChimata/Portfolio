"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EngineeringCanvas } from "./engineering-canvas";
import { portfolioData } from "./portfolio-data";

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

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const projectButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const data = portfolioData;

  const selectedProject = useMemo(
    () => data.projects.find((project) => project.id === openProject),
    [data.projects, openProject],
  );

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
    if (!openProject) return;
    window.requestAnimationFrame(() => {
      document.getElementById(`project-detail-${openProject}`)?.focus();
    });
  }, [openProject]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openProject) {
        const projectId = openProject;
        setOpenProject(null);
        projectButtonRefs.current[projectId]?.focus();
      }
      setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [openProject]);

  const navigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    setMobileOpen(false);
  }, []);

  const closeProject = () => {
    if (!openProject) return;
    const projectId = openProject;
    setOpenProject(null);
    window.requestAnimationFrame(() => {
      projectButtonRefs.current[projectId]?.focus();
    });
  };

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
              onClick={() => navigate("projects")}
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
            <h2>Curiosity, made tangible.</h2>
          </div>
          <div className="about-grid">
            <p className="about-lead">
              I build at the intersection of robotics, artificial intelligence,
              infrastructure software, and embedded systems.
            </p>
            <div className="about-copy">
              <p>
                My work spans enterprise retrieval at IBM, AI-powered tools for
                protection and control engineering at Mortenson, and research
                in robotics vision and natural language processing at the
                University of Minnesota.
              </p>
              <p>
                Whether I’m tracing relationships across large codebases,
                analyzing electrical schematics, or generating data for
                underwater robots, I care about systems that are useful,
                measurable, and easier for the next engineer to understand.
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
              <h2>Learning by doing.</h2>
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
              <p className="section-number">03 / SELECTED PROJECTS</p>
              <h2>Built, tested, iterated.</h2>
            </div>
            <p>
              Select a project to see the engineering decisions behind the
              outcome.
            </p>
          </div>
          <div className="project-grid">
            {data.projects.map((project) => {
              const isOpen = project.id === openProject;
              return (
                <button
                  key={project.id}
                  ref={(node) => {
                    projectButtonRefs.current[project.id] = node;
                  }}
                  className={`project-card ${isOpen ? "is-active" : ""}`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`project-detail-${project.id}`}
                  onClick={() =>
                    setOpenProject(isOpen ? null : project.id)
                  }
                >
                  <span className="project-number">{project.number}</span>
                  <span className="project-category">{project.category}</span>
                  <span className="project-graphic" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="project-title">{project.title}</span>
                  <span className="project-summary">{project.summary}</span>
                  <span className="project-open">
                    {isOpen ? "Close details" : "View project"}{" "}
                    <span aria-hidden="true">{isOpen ? "×" : "↗"}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={`project-detail-wrap ${selectedProject ? "is-open" : ""}`}
          >
            {selectedProject && (
              <article
                id={`project-detail-${selectedProject.id}`}
                className="project-detail"
                tabIndex={-1}
              >
                <div className="project-detail-head">
                  <div>
                    <p>{selectedProject.category}</p>
                    <h3>{selectedProject.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={closeProject}
                    aria-label={`Close ${selectedProject.title} details`}
                  >
                    Close <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="project-detail-grid">
                  <div>
                    <span>THE CHALLENGE</span>
                    <p>{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <span>THE APPROACH</span>
                    <p>{selectedProject.approach}</p>
                  </div>
                  <div>
                    <span>THE OUTCOME</span>
                    <p>{selectedProject.outcome}</p>
                  </div>
                </div>
                <div className="project-detail-footer">
                  <ul aria-label="Project technologies">
                    {selectedProject.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  <div className="project-links">
                    {selectedProject.repositoryUrl && (
                      <a
                        href={selectedProject.repositoryUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source <ArrowIcon />
                      </a>
                    )}
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Demo <ArrowIcon />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )}
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
            <h2>
              Strong fundamentals.
              <br />
              Always expanding.
            </h2>
          </div>
          {data.education.map((entry) => (
            <article className="education-card" key={entry.degree}>
              <div className="education-monogram" aria-hidden="true">
                U
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
            Let’s build something
            <span>worth testing.</span>
          </h2>
          <p>
            I’m interested in software, robotics, AI, and infrastructure work
            where careful engineering turns ambitious ideas into useful
            systems.
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
            <span>
              © {new Date().getFullYear()} {data.profile.name}
            </span>
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
