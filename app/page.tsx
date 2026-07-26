/* eslint-disable @next/next/no-img-element */
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
        <span className="drone-arm drone-arm--one" />
        <span className="drone-arm drone-arm--two" />
        <span className="drone-body" />
        <span className="drone-rotor drone-rotor--one" />
        <span className="drone-rotor drone-rotor--two" />
        <span className="drone-rotor drone-rotor--three" />
        <span className="drone-rotor drone-rotor--four" />
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
        <span className="solar-panel" />
        <span className="solar-stand" />
      </span>
    );
  }

  return (
    <span className="project-graphic project-graphic--eye" aria-hidden="true">
      <span className="eye-outline">
        <span className="eye-iris">
          <span className="eye-pupil" />
        </span>
      </span>
      <span className="eye-scan-line" />
    </span>
  );
}

export default function Home() {
  const data = portfolioData;

  return (
    <main>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a
          className="wordmark"
          href="#home"
          aria-label={`${data.profile.name}, back to top`}
        >
          <span className="wordmark-mark">{data.profile.initials}</span>
          <span className="wordmark-name">{data.profile.name}</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <details className="mobile-menu">
          <summary className="menu-toggle" aria-label="Toggle navigation">
            <span />
            <span />
          </summary>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <a key={item.id} href={`#${item.id}`}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </details>
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
            <a className="button button--dark" href="#experience">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href={`mailto:${data.profile.email}`}>
              Start a conversation <ArrowIcon />
            </a>
          </div>
          <div className="hero-meta">
            <span>{data.profile.location}</span>
            <span>{data.profile.availability}</span>
          </div>
        </div>

        <div className="engineering-visual" aria-hidden="true">
          <div className="engineering-fallback">
            <span />
            <span />
            <span />
          </div>
          <div className="visual-index visual-index--top">X 42.17</div>
          <div className="visual-index visual-index--bottom">Y 08.96</div>
        </div>

        <div className="hero-rail" aria-hidden="true">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>
      </section>

      <div className="content-shell">
        <section id="about" className="section about-section">
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

        <section id="experience" className="section">
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

        <section id="projects" className="section">
          <div className="section-heading section-heading--split">
            <div>
              <p className="section-number">03 / PROJECTS</p>
              <h2>Built, tested, iterated.</h2>
            </div>
            <p>
              Selected engineering projects spanning autonomy, embedded
              systems, and computer vision.
            </p>
          </div>
          <div className="project-grid">
            {data.projects.map((project) => (
              <article className="project-card" key={project.id}>
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

        <section id="skills" className="section skills-section">
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

        <section id="education" className="section education-section">
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

      <section id="contact" className="contact-section">
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
              <a href="#home">Back to top ↑</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
