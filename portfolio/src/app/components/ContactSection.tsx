import { motion } from "motion/react";
import { Mail, Github, Linkedin, FileText } from "lucide-react";

const contactLinks = [
  {
    label: "Resume",
    icon: FileText,
    href: "/resume.pdf",
    value: "Download CV",
    download: true,
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
    label: "Email",
    icon: Mail,
    href: "mailto:sanjeyan001@e.ntu.edu.sg",
    value: "sanjeyan001@e.ntu.edu.sg",
    download: false,
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-28 md:py-40 px-6"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #0d0d10 100%)",
      }}
    >
      <div className="max-w-[700px] mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p
            className="mb-3"
            style={{
              fontSize: "12px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
            }}
          >
            Get in touch
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(32px, 5vw, 56px)",
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Let's build
            <br />
            something together<span style={{ color: "#4ade80" }}>.</span>
          </h2>
        </motion.div>

        {/* Contact grid */}
        <div className="grid grid-cols-2 gap-4 max-w-[500px] mx-auto">
          {contactLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                download={link.download ? "Sanjeyan_Chrysharnthan_Resume.pdf" : undefined}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group flex flex-col items-center gap-3 py-7 px-4 rounded-xl transition-all duration-300 hover:translate-y-[-3px]"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <Icon
                    size={20}
                    className="text-white/30 group-hover:text-white/60 transition-colors duration-300"
                  />
                </div>
                <div className="text-center">
                  <p
                    className="group-hover:text-white transition-colors duration-300"
                    style={{
                      fontSize: "14px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {link.label}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "rgba(255,255,255,0.2)",
                      marginTop: "2px",
                    }}
                  >
                    {link.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-16"
          style={{
            fontSize: "11px",
            fontFamily: "'JetBrains Mono', monospace",
            color: "rgba(255,255,255,0.12)",
          }}
        >
          &copy; 2026 Sanjeyan Chrysharnthan
        </motion.p>
      </div>
    </secti