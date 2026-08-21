# Portfolio Evidence-Led Redesign Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the blocking, project-wall portfolio with a direct, evidence-led career narrative for Applied ML, Quant Systems, and production software roles.

**Architecture:** Keep the existing React/Vite stack and established editorial design tokens. Remove the stage/selector state machine, make the page a semantic single-scroll document, and drive the projects UI from a typed evidence model with inline view filters and native disclosure controls. Preserve legal routes and track-specific resume downloads.

**Tech Stack:** React 18, TypeScript, Vite 6, Tailwind CSS 4, Motion, Phosphor Icons, Node test runner.

---

### Task 1: Lock the career narrative in tests

**Files:**
- Modify: `portfolio/test/dossier-content.test.mjs`
- Modify: `portfolio/test/design-policy.test.mjs`

1. Replace the stale “publish every dossier” assertion with tests for three flagship case studies and a compact verified archive.
2. Assert 712 backtester tests, 204 risk-lab tests, the risk lab's synthetic-only boundary, and ten Vertex merged PRs.
3. Assert the app has no blocking stage or `TrackSelector`, and that semantic `main`/`footer` structure and inline filters are present.
4. Run `node --test test/*.test.mjs` and confirm the new assertions fail for the expected missing implementation.

### Task 2: Replace the page architecture

**Files:**
- Modify: `portfolio/src/app/App.tsx`
- Modify: `portfolio/src/app/context/TrackContext.tsx`
- Modify: `portfolio/src/app/components/Navbar.tsx`
- Modify: `portfolio/src/app/components/HeroSection.tsx`
- Modify: `portfolio/src/app/components/PatternOverlay.tsx`
- Modify: `portfolio/src/app/components/TrackPatterns.tsx`

1. Remove the `hero → selecting → portfolio` state machine and render the portfolio directly.
2. Replace career-track selection with an optional work-view context: Selected, Quant Systems, Applied ML, Product Systems, Archive.
3. Build a split hero with full name, career thesis, proof rail, primary work CTA, and resume access.
4. Update navigation labels and make all interactive targets accessible on desktop and mobile.
5. Run the tests and confirm architecture assertions pass while content assertions remain red.

### Task 3: Build the evidence-led content system

**Files:**
- Modify: `portfolio/src/app/data/projects.ts`
- Modify: `portfolio/src/app/data/timeline.ts`
- Modify: `portfolio/src/app/components/ProjectsSection.tsx`
- Modify: `portfolio/src/app/components/ExperienceTimeline.tsx`
- Modify: `portfolio/src/app/components/SkillsLeadershipSection.tsx`
- Modify: `portfolio/src/app/components/ContactSection.tsx`
- Modify: `portfolio/src/app/components/PortfolioImage.tsx`

1. Model flagship case studies with evidence type, problem, decision, verification, boundary, views, and maturity.
2. Add the three approved flagships and a compact archive containing only attributable proof.
3. Replace the horizontal timeline with a readable vertical chronology focused on the three technical internships.
4. Reduce skills to 12–15 evidence-backed items, foreground two current leadership roles, and collapse earlier experience.
5. Make the contact close specific to 2027 applied ML, quant development, and software systems opportunities.
6. Run the full Node test suite and confirm it passes.

### Task 4: Apply the visual system and metadata

**Files:**
- Modify: `portfolio/src/styles/index.css`
- Modify: `portfolio/src/styles/theme.css`
- Modify: `portfolio/index.html`
- Create: `portfolio/public/images/sanjeyan-portfolio-hero.webp`

1. Implement the editorial split layout, evidence ledger, filter bar, vertical timeline, compact archive, responsive navigation, and 44px interaction targets.
2. Preserve Newsreader/IBM Plex, warm black/ivory/gold/green, sharp geometry, and restrained candlestick texture.
3. Convert the hero PNG to a responsive WebP asset and add eager/lazy image controls.
4. Add canonical, Open Graph, and Twitter metadata.
5. Run `npm run build` and inspect desktop and mobile layouts.

### Task 5: Verify and audit

**Files:**
- Review all modified files.

1. Run `node --test test/*.test.mjs` from `portfolio/`.
2. Run `npm run build` from `portfolio/`.
3. Inspect the running page at desktop and mobile widths, including keyboard focus and every disclosure/filter state.
4. Run the Impeccable detector once over the changed UI targets and resolve actionable findings.
5. Review `git diff --check`, `git diff --stat`, and `git status --short`; preserve `.codegraph/` untouched.
