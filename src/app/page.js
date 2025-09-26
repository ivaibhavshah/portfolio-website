import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";

import portfolio from "../data/portfolio";

export default function Home() {
  return (
    <div>
      <AnimatedBackdrop />
      <Navbar />
      <main className="relative mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24 pt-20 sm:px-10 lg:px-16">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <CallToAction />
      </main>
    </div>
  );
}


function Navbar() {
  const links = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "certifications", label: "Certs" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="flex h-12 w-full items-center justify-start gap-3 border-b border-slate-800/60 bg-slate-950/70 px-4 shadow-lg backdrop-blur sm:gap-6 sm:px-6">
        <a href="#about" className="text-sm font-semibold tracking-wide text-cyan-200">VS</a>
        <div className="ml-2 flex flex-1 min-w-0 items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar sm:ml-auto sm:flex-none sm:overflow-visible">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="rounded-full border border-slate-700/60 bg-slate-900/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-100">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
} function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_60%)]" />
      <div className="absolute -top-48 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl animate-slow-pulse" />
      <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl animate-drift" />
    </div>
  );
}

function Hero() {
  const { personal, tech, metrics } = portfolio;

  return (<ScrollReveal as="section" id="about" className="space-y-12">
    <ScrollReveal as="div" className="space-y-10" variant="up">
      <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-400 animate-beacon" />
        </span>
        Backend and DevOps specialist
      </div>
      <div className="space-y-5">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">{personal.name}</h1>
        <p className="text-lg text-cyan-100/80 sm:text-xl">{personal.role}</p>
        <p className="max-w-2xl text-base text-slate-300 sm:text-lg">{personal.headline}</p>
        <p className="max-w-3xl text-sm text-slate-400 sm:text-base">{personal.summary}</p>
      </div>
      <div className="flex flex-wrap gap-3 text-sm text-slate-300">
        <ContactPill icon="phone" label={personal.phone} href={`tel:${personal.phone.replace(/\s+/g, "")}`} />
        <ContactPill icon="mail" label={personal.email} href={`mailto:${personal.email}`} />
        <ContactPill icon="map" label={personal.location} href={`${personal.locationUrl}`} />
      </div>
      <div className="flex flex-wrap gap-3">
        <ActionLink href={`mailto:${personal.email}`} primary>
          Start a conversation
        </ActionLink>
        <ContactPill icon="linkedin" label="LinkedIn" href={personal.linkedin} />
        <ContactPill icon="github" label="GitHub" href={personal.github} />
      </div>
      <div className="flex flex-wrap gap-2">
        {tech.primary.map((item) => (
          <span key={item} className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur">
            {item}
          </span>
        ))}
      </div>
    </ScrollReveal>

    <div className="grid gap-4 sm:grid-cols-3">
      {metrics.map((metric, index) => (
        <ScrollReveal key={metric.label} delay={160 + index * 90} className="h-full" variant="up">
          <MetricBadge metric={metric} />
        </ScrollReveal>
      ))}
    </div>
  </ScrollReveal>
  );
}

function Skills() {
  const { skills } = portfolio;

  return (<ScrollReveal as="section" id="skills" className="space-y-10">
    <SectionHeading
      eyebrow="Skill map"
      title="Where backend engineering meets platform thinking"
      description="Every skill block is backed by real delivery stories across banking, analytics, and automation."
    />
    <div className="grid gap-6 md:grid-cols-2">
      {skills.map((skill, index) => (
        <ScrollReveal
          key={skill.name}
          as="article"
          className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 shadow-[0_0_45px_rgba(8,145,178,0.15)] transition duration-500 hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_25px_65px_rgba(8,145,178,0.26)]"
          delay={index * 90}
          variant={index % 2 === 0 ? "left" : "right"}
        >
          <div
            className="absolute inset-0 opacity-60 transition duration-500 group-hover:opacity-80"
            style={{ backgroundImage: `url(${skill.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <div className="relative flex h-full flex-col justify-between gap-6 bg-gradient-to-br from-slate-950/85 via-slate-950/75 to-slate-950/90 p-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-50">{skill.name}</h3>
              <p className="text-sm text-slate-300">{skill.description}</p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-950/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">
              {skill.focus}
            </div>
          </div>
          <div className="pointer-events-none absolute -right-16 bottom-0 h-24 w-24 translate-y-1/3 rounded-full bg-cyan-400/40 blur-3xl transition duration-500 group-hover:translate-y-0 group-hover:opacity-80 animate-drift" />
        </ScrollReveal>
      ))}
    </div>
  </ScrollReveal>
  );
}

function Projects() {
  const { projects } = portfolio;

  return (<ScrollReveal as="section" id="projects" className="space-y-10">
    <SectionHeading
      eyebrow="Case studies"
      title="Projects engineered for uptime"
      description="Systems that keep customer promises even when integrations, data volume, and compliance requirements grow fast."
    />
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project, index) => (
        <ScrollReveal
          key={project.name}
          as="article"
          className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 transition duration-500 hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_0_55px_rgba(8,145,178,0.25)]"
          delay={index * 90}
          variant={index % 2 === 0 ? "left" : "right"}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_65%)] opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-50">{project.name}</h3>
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-200">Backend</span>
            </div>
            <p className="text-sm text-slate-400">{project.description}</p>
            <div className="grid gap-3 text-sm text-slate-300">
              <Detail label="Problem" value={project.problem} />
              <Detail label="Solution" value={project.solution} />
              <Detail label="Impact" value={project.impact} />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-md border border-slate-700/60 bg-slate-950/60 px-3 py-1 text-xs text-slate-300">
                  {item}
                </span>
              ))}
            </div>
            {project.link ? (
              <ActionLink href={project.link} small>
                View Project
              </ActionLink>
            ) : null}
          </div>
        </ScrollReveal>
      ))}
    </div>
  </ScrollReveal>
  );
}

function Experience() {
  const { experience } = portfolio;

  const groupedMap = experience.reduce((acc, item) => {
    const key = item.company;
    if (!acc[key]) {
      acc[key] = { company: item.company, location: item.location, roles: [] };
    }
    acc[key].roles.push(item);
    return acc;
  }, {});

  const groups = Object.values(groupedMap);

  return (<ScrollReveal as="section" id="experience" className="space-y-10">
    <SectionHeading
      eyebrow="Experience"
      title="Growth within organizations"
      description="Promotions and role progression grouped by company to reflect impact and continuity."
    />
    <div className="relative border-l border-slate-800/70 pl-10">
      {groups.map((group, idx) => (
        <ScrollReveal
          key={group.company}
          as="article"
          className="relative pb-12 last:pb-0"
          delay={idx * 110}
          variant="up"
        >
          <span className="absolute left-[-58px] top-1 flex h-4 w-4 items-center justify-center">
            <span className="absolute h-4 w-4 rounded-full border border-slate-800 bg-slate-950" />
            <span className="relative h-2 w-2 rounded-full bg-cyan-400 animate-beacon" />
          </span>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-50">{group.company}</h3>
              <p className="text-sm text-slate-400">{group.location}</p>
            </div>
            <div className="text-right text-xs uppercase tracking-[0.3em] text-slate-500">
              <div>{group.roles[0]?.period}</div>
              {/* <div className="mt-1 text-slate-400">Latest role</div> */}
            </div>
          </div>

          <div className="mt-5 space-y-5">
            {group.roles.map((role) => (
              <div
                key={`${group.company}-${role.role}-${role.period}`}
                className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-base font-semibold text-slate-50">{role.role}</div>
                  <div className="text-right text-xs uppercase tracking-[0.3em] text-slate-500">
                    <div>{role.period}</div>
                    <div className="mt-1 text-slate-400">{role.duration}</div>
                  </div>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {role.impact.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400/70" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {role.stack.map((techItem) => (
                    <span
                      key={techItem}
                      className="rounded-md border border-slate-700/60 bg-slate-950/60 px-3 py-1 text-xs text-slate-300"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      ))}
    </div>
  </ScrollReveal>
  );
}

function Certifications() {
  const { certifications } = portfolio;

  return (<ScrollReveal as="section" id="certifications" className="space-y-10">
    <SectionHeading
      eyebrow="Badges"
      title="Certifications and Achievements"
      description="A concise grid of credentials with official badges where available."
    />
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {certifications.map((cert, index) => (
        <ScrollReveal key={cert.name} delay={index * 80} variant="up">
          <div className="group relative h-72 min-h-[18rem] overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/60 p-5 transition duration-300 hover:-translate-y-1.5 hover:border-cyan-400/60 hover:shadow-[0_25px_80px_rgba(8,145,178,0.20)]">
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold leading-snug text-slate-50 break-words">{cert.name}</h3>
                <span className="rounded-full border border-slate-700/70 bg-slate-950/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                  {cert.year}
                </span>
              </div>
              <div className="flex-1 grid place-items-center">
                <div className="relative grid h-20 w-20 place-items-center rounded-full border border-cyan-400/40 bg-slate-950/70">
                  {cert.badge ? (
                    <img src={cert.badge} alt={`${cert.issuer} badge`} className="h-14 w-14 object-contain" />
                  ) : (
                    <svg className="h-12 w-12 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2l3 5 5 3-5 3-3 5-3-5-5-3 5-3 3-5z" />
                    </svg>
                  )}
                  <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-cyan-400/25 via-transparent to-emerald-400/20 blur-xl" />
                </div>
              </div>
              <div className="mt-3 text-center space-y-2">
                <p className="text-sm text-slate-400">{cert.issuer}</p>
                {cert.credentialId ? (
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Credential ID</div>
                    <div className="mt-1 truncate text-sm text-slate-300">{cert.credentialId}</div>
                  </div>
                ) : null}
                {cert.link ? (
                  <div className="flex justify-center">
                    <a href={cert.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-100">
                      Verify credential
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </ScrollReveal>
  );
}


function CallToAction() {
  const { contact } = portfolio;
  const callHref = contact.phone ? `tel:${contact.phone.replace(/\s+/g, "")}` : null;

  return (<ScrollReveal as="section" id="contact"
    className="rounded-3xl border border-cyan-400/40 bg-gradient-to-r from-slate-900/80 via-slate-900/70 to-slate-950/80 p-10 shadow-[0_0_60px_rgba(8,145,178,0.25)]"
    variant="up"
    delay={100}
  >
    <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <div className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Next build</span>
        <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl">Ship reliable backend infrastructure together</h2>
        <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
          From integrations and event pipelines to observability and platform automation, I help teams deliver uptime as a feature.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ActionLink href={`mailto:${contact.email}`} primary>
          Book a discovery call
        </ActionLink>
        {callHref ? <ActionLink href={callHref}>Call directly</ActionLink> : null}
      </div>
    </div>
  </ScrollReveal>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl space-y-3">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">{eyebrow}</span>
      <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl">{title}</h2>
      {description ? <p className="text-base text-slate-400">{description}</p> : null}
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</div>
      <p className="mt-1 text-sm text-slate-300">{value}</p>
    </div>
  );
}

function CardLine({ label, values }) {
  return (
    <div className="rounded-2xl border border-slate-800/70 bg-slate-950/60 px-5 py-4">
      <div className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</div>
      <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-200">
        {values.map((item) => (
          <span key={item} className="rounded-md bg-slate-900/80 px-2 py-1 text-slate-300">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function MetricBadge({ metric }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-950/70 p-5 transition duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(8,145,178,0.2)] animate-soft-glow">
      <div className="pointer-events-none absolute -right-16 top-0 h-24 w-24 rounded-full bg-cyan-400/30 blur-3xl" />
      <div className="relative space-y-2">
        <div className="text-2xl font-semibold text-white">{metric.value}</div>
        <div className="text-xs uppercase tracking-[0.3em] text-slate-500">{metric.label}</div>
      </div>
    </div>
  );
}

function ActionLink({ href, children, primary = false, small = false }) {
  const isExternal = href.startsWith("http");
  const base = small
    ? "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition"
    : "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition";
  const palette = primary
    ? "bg-cyan-400 text-slate-950 shadow-[0_0_35px_rgba(8,145,178,0.35)] hover:bg-cyan-300"
    : "border border-slate-700/70 text-slate-200 hover:border-cyan-400/60 hover:text-cyan-100";
  const className = `${base} ${palette}`;
  const relProps = isExternal ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <a href={href} className={className} {...relProps}>
      {children}
      {isExternal ? <ArrowUpRightIcon className={small ? "h-3 w-3" : "h-4 w-4"} /> : null}
    </a>
  );
}

function ContactPill({ icon, label, href }) {
  const iconMap = {
    phone: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M4.5 5.25a2 2 0 012-2h1.4c.8 0 1.5.5 1.7 1.2l.9 3A2 2 0 0110 9.25l-1.1.9a12.6 12.6 0 006 6l.9-1.1a2 2 0 011.8-.5l3 .9c.7.2 1.2.9 1.2 1.7v1.4a2 2 0 01-2 2H18A15.5 15.5 0 014.5 5.25z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    mail: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.5 5.75A2.75 2.75 0 017.25 3h9.5A2.75 2.75 0 0119.5 5.75v12.5A2.75 2.75 0 0116.75 21h-9.5A2.75 2.75 0 014.5 18.25V5.75z" />
        <path d="M5 6l7 6 7-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    map: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21s-6-4.5-6-10a6 6 0 1112 0c0 5.5-6 10-6 10z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
    ),
    linkedin: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      >
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.3h.05c.53-1 1.82-2.3 3.75-2.3 4 0 4.75 2.63 4.75 6V24h-4v-7.5c0-1.8-.03-4.12-2.5-4.12s-2.88 1.95-2.88 4v7.62h-4V8z" />
      </svg>

    ),
    github: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.033 1.532 1.033.892 1.53 2.341 1.088 2.91.833.092-.647.349-1.089.636-1.34-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.503.336 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.202 2.393.099 2.646.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.565 4.936.358.309.677.919.677 1.852 0 1.335-.012 2.415-.012 2.741 0 .268.18.58.688.482A10.004 10.004 0 0022 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  };

  const baseClass = "group inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-400/60 hover:text-cyan-100";

  const Label = () => (
    <span className="overflow-hidden whitespace-nowrap opacity-0 max-w-0 -translate-x-1 transition-all duration-300 group-hover:max-w-[20rem] group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:max-w-[20rem] group-focus-visible:opacity-100 group-focus-visible:translate-x-0">
      {label}
    </span>
  );

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {iconMap[icon]}
        <Label />
      </a>
    );
  }

  return (
    <span className={baseClass}>
      {iconMap[icon]}
      <Label />
    </span>
  );
}

function ArrowUpRightIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 15L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 5H15V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}








