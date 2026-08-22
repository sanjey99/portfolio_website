const skillGroups = [
  {
    label: "Build",
    items: ["Python", "TypeScript", "Go", "SQL"],
  },
  {
    label: "ML & quantitative",
    items: ["PyTorch", "pandas / NumPy", "Time-series research", "VaR / ES"],
  },
  {
    label: "Systems",
    items: ["Django", "FastAPI", "React / Next.js", "PostgreSQL"],
  },
  {
    label: "Reliability",
    items: ["Automated testing", "Docker", "MLflow / Prometheus"],
  },
];

const leadership = [
  {
    title: "Financial Controller",
    organization: "NTU Hall 10 Transition Orientation Programme 26/27",
    period: "Aug 2025 – Present",
    summary:
      "Govern a $10,000 budget for a 200-participant programme as one of five core organizers, linking spend requests, claim evidence, reimbursements, and advisor approvals.",
  },
  {
    title: "Special Projects Officer",
    organization: "NTU Outdoor Adventure Club",
    period: "Jul 2025 – Jul 2026",
    summary:
      "Co-led 18 subcommittee members to deliver two overseas adventure trips, completing both within budget with no safety incidents; the club-open trip served about 30–40 participants.",
  },
];

const earlierExperience = [
  "Coding Instructor · Empire Code · Mar 2024 – May 2025",
  "3SG, Artillery Specialist (HIMARS) · Singapore Armed Forces · Mar 2022 – Feb 2024",
  "Engineer Intern · Grand Hyatt Singapore · Feb 2022 – Mar 2022",
];

export function SkillsLeadershipSection() {
  return (
    <section id="capabilities" className="section capabilities-section" aria-labelledby="capabilities-title">
      <div className="section-heading split-heading">
        <h2 id="capabilities-title">Capabilities with receipts.</h2>
        <p>
          A deliberately small set of tools that recur in shipped work, verified projects,
          and technical internships, not a keyword inventory.
        </p>
      </div>

      <div className="capabilities-layout">
        <div className="skills-ledger">
          {skillGroups.map((group) => (
            <div className="skill-row" key={group.label}>
              <h3>{group.label}</h3>
              <div>
                {group.items.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="leadership-panel">
          <h3>Leadership</h3>
          {leadership.map((item) => (
            <article key={item.title}>
              <div>
                <h4>{item.title}</h4>
                <span>{item.period}</span>
              </div>
              <strong>{item.organization}</strong>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </div>

      <details className="earlier-experience">
        <summary>Earlier experience</summary>
        <ul>
          {earlierExperience.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>
    </section>
  );
}
