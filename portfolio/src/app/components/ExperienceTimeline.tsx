import { motion } from "motion/react";
import { timelineData } from "../data/timeline";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="section experience-section" aria-labelledby="experience-title">
      <div className="section-heading split-heading">
        <h2 id="experience-title">Technical experience, in sequence.</h2>
        <p>
          The common thread is production reliability: tracing hidden failure modes,
          building the verification around them, and leaving a system another engineer can run.
        </p>
      </div>

      <div className="experience-list">
        {timelineData.map((item, index) => (
          <motion.article
            className="experience-item"
            key={`${item.org}-${item.period}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <div className="experience-marker">
              <span>{item.year}</span>
            </div>
            <header>
              <p>{item.period}</p>
              <h3>{item.title}</h3>
              <strong>{item.org}</strong>
            </header>
            <ul>
              {item.description.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="experience-skills" aria-label={`${item.org} technologies`}>
              {item.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
