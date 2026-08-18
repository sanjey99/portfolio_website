export interface LegalDocument {
  title: string;
  updated: string;
  sections: ReadonlyArray<readonly [heading: string, body: string]>;
  links?: ReadonlyArray<readonly [label: string, href: string]>;
}

export const terms: LegalDocument = {
  title: "Terms",
  updated: "18 August 2026",
  sections: [
    [
      "Informational use",
      "This is a personal portfolio for informational and professional purposes. It is not legal, financial, investment, engineering, or other professional advice, and it does not create a client, employment, or advisory relationship.",
    ],
    [
      "Ownership",
      "Unless otherwise noted, the portfolio's writing, design, and original project materials are owned by Sanjeyan Chrysharnthan. You may view and share links to this site, but may not reproduce, misrepresent, or use its content in a way that suggests endorsement without permission.",
    ],
    [
      "Acceptable use",
      "Do not interfere with the site's operation, attempt unauthorized access, scrape it in a harmful manner, introduce malicious material, or impersonate its owner or collaborators.",
    ],
    [
      "External links",
      "Links to third-party sites are provided for convenience. Their content, availability, and privacy practices are controlled by those providers.",
    ],
    [
      "No warranty and limits",
      "The site is provided as available. Reasonable care is taken to keep it accurate, but project details can change. To the extent permitted by law, no warranty is made for completeness, availability, or fitness for a particular purpose, and liability is limited accordingly.",
    ],
    [
      "Changes and contact",
      "These terms may change as the portfolio evolves. Continued use after an update means you accept the revised version. Questions can be sent to sanjeyan001@e.ntu.edu.sg.",
    ],
  ],
};

export const privacy: LegalDocument = {
  title: "Privacy",
  updated: "18 August 2026",
  sections: [
    [
      "Vercel Web Analytics",
      "This site uses Vercel Web Analytics for anonymous aggregate page views. The service uses no cookies. It may process a daily request hash and information such as the page path, referrer, coarse geolocation, device type, operating system, and browser to produce aggregated usage insights. See Vercel's analytics privacy information at https://vercel.com/docs/analytics/privacy-policy.",
    ],
    [
      "Contact email",
      "If you choose to email the listed address, your message, email address, and any information you include are processed by the email providers involved so a reply can be considered. Please do not send sensitive personal information through the public contact address.",
    ],
    [
      "External links",
      "GitHub, LinkedIn, resume files, and other external destinations operate under their own terms and privacy practices. This site does not control their collection or use of information.",
    ],
    [
      "Retention and choices",
      "This portfolio does not operate a user-account system or sell personal information. Questions or requests related to a message you sent can be directed to sanjeyan001@e.ntu.edu.sg.",
    ],
    [
      "Changes",
      "This notice may be updated when the site's services or practices change. The date above identifies the current version.",
    ],
  ],
  links: [
    [
      "Vercel Analytics privacy information",
      "https://vercel.com/docs/analytics/privacy-policy",
    ],
  ],
};
