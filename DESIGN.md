---
name: Sanjeyan Portfolio
description: An evidence-led editorial portfolio for applied ML, quantitative systems, and production software.
colors:
  warm-black: "#20231f"
  deep-surface: "#181b18"
  raised-surface: "#292e29"
  warm-ivory: "#f2ecdc"
  muted-ivory: "#b8b19f"
  faint-olive: "#827d70"
  evidence-gold: "#c29a54"
  gold-ink: "#201a11"
  systems-green: "#78a189"
  product-steel: "#6f8ea0"
  hairline: "rgba(242, 236, 220, 0.18)"
  hairline-strong: "rgba(242, 236, 220, 0.34)"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4.7rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  body:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.72
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.7rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  sharp: "2px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "44px"
  xl: "84px"
components:
  button-primary:
    backgroundColor: "{colors.evidence-gold}"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.sharp}"
    padding: "10px 16px"
    height: "46px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.warm-ivory}"
    rounded: "{rounded.sharp}"
    padding: "10px 16px"
    height: "46px"
  filter-selected:
    backgroundColor: "{colors.evidence-gold}"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.sharp}"
    padding: "8px 12px"
    height: "44px"
---

# Design System: Sanjeyan Portfolio

## Overview

**Creative North Star: "The Evidence Ledger"**

The portfolio should feel like an editorial engineering dossier: composed, exact, and willing to show how a claim was verified. Warm dark surfaces and serif display type carry the human career narrative; monospace labels, hairline rules, and tabular metrics carry the evidence.

Interest comes from information architecture and disclosure, not decorative effects. Each important system can reveal its problem, engineering decision, verification, and honest boundary. The world remains restrained enough that a recruiter can scan it quickly, but distinctive enough to remember the ledger structure and candlestick field.

**Key Characteristics:**

- Warm editorial darkness rather than blue-black developer-dashboard styling.
- Sharp, ruled geometry with no floating-card shadows.
- One real photograph as the primary material anchor.
- Proof and boundaries presented as first-class content.
- Motion limited to entry, disclosure, and state clarity.

## Colors

The palette pairs warm black and ivory with a scarce evidence gold; green and steel differentiate applied ML and product-system evidence without becoming competing brand colors.

### Primary

- **Evidence Gold:** Primary actions, active work filters, proof numbers, and verification emphasis.

### Secondary

- **Systems Green:** Applied ML organizations and domain accents.

### Tertiary

- **Product Steel:** Product-system evidence when a third domain cue is needed.

### Neutral

- **Warm Black:** The continuous page field.
- **Deep Surface:** Alternating experience, capabilities, and footer regions.
- **Warm Ivory:** Display copy and high-priority labels.
- **Muted Ivory:** Body copy at readable secondary contrast.
- **Faint Olive:** Timestamps, technology labels, and tertiary metadata.
- **Hairlines:** Structural dividers; strong hairlines close major ledgers.

**The Scarce Gold Rule.** Evidence gold marks decisions, proof, and active state. It never washes an entire section or competes with the photograph.

**The Warm Ground Rule.** New dark surfaces stay olive-warm; do not drift into generic navy or blue-black.

## Typography

**Display Font:** Newsreader (with Georgia fallback)

**Body Font:** IBM Plex Sans (with system UI fallback)

**Label/Mono Font:** IBM Plex Mono

**Character:** Newsreader gives names and engineering arguments an editorial, human voice. IBM Plex keeps long technical evidence compact and legible, while the mono face is reserved for metadata and verification labels.

### Hierarchy

- **Display** (600, responsive clamp, 0.98 line-height): Section theses and the career name; tightly set but never clipped.
- **Title** (600, responsive serif): Case-study and role titles.
- **Body** (400, 1rem, 1.72 line-height): Explanations and evidence, generally held below 65 characters per line.
- **Label** (500, compact mono, 0.06em tracking): Evidence type, maturity, dates, metrics, and technology strings.

**The Two-Voice Rule.** Serif makes the argument; sans and mono prove it. Do not introduce another display family or use mono for long prose.

**The Title-First Rule.** Context follows or supports the title; never add decorative eyebrow copy above a section heading.

## Layout

The page uses a centered editorial canvas with fluid horizontal padding and full-width tonal section bands. The hero is an asymmetric text/portrait split followed by a four-column proof rail. Technical experience is a vertical chronology; flagship case studies are full-width ruled records; the archive is a denser two-column list.

At 1024px, complex two-column bodies collapse before the primary hero composition does. At 768px, the page becomes one column, navigation becomes a menu, proof becomes a 2×2 rail, work filters wrap, and the evidence ledger becomes a single readable column. All grid children must be allowed to shrink so long names never create hidden horizontal overflow.

Spacing is generous at section boundaries and compact inside evidence structures. Rules, rather than cards, establish grouping.

## Elevation & Depth

The system is flat by design and uses no shadows. Depth comes from tonal layering, border strength, the real portrait, and disclosure state. The fixed candlestick texture remains very low contrast and fades away before it can compete with content.

**The Ruled-Depth Rule.** A stronger hairline or a tonal step should solve hierarchy before elevation or shadow is considered.

## Shapes

Corners are nearly square with a consistent 2px radius. Containers are defined by one-pixel rules, while evidence ledgers use open editorial divisions rather than rounded cards. Icons come from Phosphor and remain line-based, compact, and secondary to text.

## Components

### Buttons

- **Shape:** Sharp rectangular control (2px radius) with at least a 44px target.
- **Primary:** Evidence-gold field, dark ink, 10×16px padding, and a transparent gold-border hover state.
- **Secondary:** Transparent warm-ivory control with a strong hairline border.
- **Focus:** A two-pixel gold outline offset four pixels from the control.

### Chips

- **Style:** Work filters are connected rectangular segments, not pills.
- **State:** Unselected filters remain transparent with muted text; the active view inverts to evidence gold and dark ink.

### Cards / Containers

- **Corner Style:** Sharp (2px) and usually visually open.
- **Background:** Inherit the section field; boundaries come from hairlines.
- **Shadow Strategy:** None.
- **Internal Padding:** 24–44px depending on evidence density.

### Navigation

The navigation is a fixed 68px ruled bar with a serif monogram, centered text links, and a native resume disclosure. Hover uses underlining rather than movement. Mobile navigation expands as a flat tonal sheet with 44px targets.

### Evidence Ledger

The signature component is a native disclosure attached to each flagship case study. Its four cells always appear in this order: Problem, Engineering Decision, Verification, Honest Boundary. The boundary cell receives only a faint gold tint; it must read as disclosure, not warning theater.

### Metric Ledger

Metrics are bordered definition lists with mono labels and domain-colored values. They remain small and factual, and collapse vertically on mobile.

## Do's and Don'ts

### Do:

- **Do** lead with one clear career thesis and a small number of flagship systems.
- **Do** pair every consequential number with its verification context or boundary.
- **Do** use hairlines, typography, and spacing to create hierarchy.
- **Do** preserve 44px minimum interaction targets and visible keyboard focus.
- **Do** keep photograph crops intentional and provide specific alt text.

### Don't:

- **Don't** restore a mandatory track gate before visitors can see the work.
- **Don't** turn every repository into an equal-weight card or duplicate projects across sections.
- **Don't** use glossy gradients, glass surfaces, shadows, oversized pills, or effect-heavy hover motion.
- **Don't** add decorative technology tickers or skills without evidence in shipped work.
- **Don't** hide synthetic-data, team-attribution, or private-work boundaries.
- **Don't** place kicker or eyebrow labels above headings.
