import { motion } from "motion/react";
import { Mail, Github, Linkedin, FileText } from "lucide-react";

const contactLinks = [
  {
    label: "Email",
    icon: Mail,
    href: "mailto:sanjeyan001@e.ntu.edu.sg",
    value: "sanjeyan001@e.ntu.edu.sg",
    download: false,
  },
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/sanjey99",
    value: "sanjey99",
    download: false,
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/sanjey99/",
    value: "Sanjeyan Chrysharnthan",
    download: false,
  },
  {
    label: "Resume",
    icon: FileText,
    href: "/resume.pdf",
    value: "Download CV",
    download: true,
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-28 md:py-40 px-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(8.5% 0.006 65) 0%, oklch(9% 0.008 65) 100%)",
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="mb-4"
              style={{
                fontSize: "12px",
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.15em",
                color: "oklch(76% 0.155 65)",
                textTransform: "uppercase",
              }}
            >
              Get in touch
            </p>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 4.5vw, 54px)",
                color: "oklch(96% 0.008 65)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
              }}
            >
              Let's build
              <br />
              something
              <br />
              together<span style={{ color: "oklch(76% 0.155 65)" }}>.</span>
            </h2>
            <p
              className="mt-6"
              style={{
                fontSize: "15px",
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 300,
                lineHeight: 1.65,
                color: "oklch(96% 0.008 65 / 0.4)",
                maxWidth: "38ch",
              }}
            >
              Open to internships, collaborations, and interesting problems.
            </p>
          </motion.div>

          {/* Right: Contact links as a clean list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-1"
          >
            {contactLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  download={link.download ? "Sanjeyan_Chrysharnthan_Resume.pdf" : undefined}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                  className="group flex items-center gap-4 py-4 transition-all duration-200"
                  style={{
                    borderBottom: i < contactLinks.length - 1
                      ? "1px solid oklch(96% 0.008 65 / 0.05)"
                      : "none",
                  }}
                >
                  <Icon
                    size={16}
                    style={{
                      color: "oklch(76% 0.155 65)",
                      flexShrink: 0,
                      opacity: 0.8,
                      transition: "opacity 0.2s",
                    }}
                    className="group-hover:opacity-100"
                  />
                  <div className="flex items-baseline justify-between w-full gap-4">
                    <span
                      style={{
                        fontSize: "13px",
                        fontFamily: "'Epilogue', sans-serif",
                        fontWeight: 500,
                        color: "oklch(96% 0.008 65 / 0.35)",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        flexShrink: 0,
                      }}
                    >
                      {link.label}
                    </span>
                    <span
                      className="group-hover:text-white transition-colors duration-200 truncate text-right"
                      style={{
                        fontSize: "14px",
                        fontFamily: "'Epilogue', sans-serif",
                        fontWeight: 400,
                        color: "oklch(96% 0.008 65 / 0.6)",
                      }}
                    >
                      {link.value}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-20"
          style={{
            fontSize: "11px",
            fontFamily: "'Epilogue', sans-serif",
            color: "oklch(96% 0.008 65 / 0.12)",
          }}
        >
          &copy; 2026 Sanjeyan Chrysharnthan
        </motion.p>
      </div>
    </section>
  );
}
