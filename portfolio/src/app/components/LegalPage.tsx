import { ArrowLeft } from "@phosphor-icons/react";
import type { LegalDocument } from "../data/legal";

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <main className="legal-page">
      <a className="legal-back" href="/">
        <ArrowLeft size={16} aria-hidden="true" /> Back to portfolio
      </a>
      <p className="eyebrow">Updated {document.updated}</p>
      <h1>{document.title}</h1>
      {document.sections.map(([heading, body]) => (
        <section key={heading}>
          <h2>{heading}</h2>
          <p>{body}</p>
        </section>
      ))}
      {document.links?.map(([label, href]) => (
        <a
          className="legal-back"
          key={href}
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {label}
        </a>
      ))}
    </main>
  );
}
