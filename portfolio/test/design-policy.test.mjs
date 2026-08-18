import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const sources = async (dir) =>
  (await readdir(new URL(`../${dir}`, import.meta.url), { recursive: true }))
    .filter((file) => file.endsWith(".tsx") || file.endsWith(".css"))
    .map((file) => read(`${dir}/${file}`));

test("the portfolio uses local editorial fonts and Phosphor icons", async () => {
  const [packageJson, fonts, components] = await Promise.all([
    read("package.json"),
    read("src/styles/fonts.css"),
    read("src/app/App.tsx"),
  ]);

  assert.match(packageJson, /@phosphor-icons\/react/);
  assert.match(packageJson, /@fontsource\/newsreader/);
  assert.doesNotMatch(packageJson, /lucide-react/);
  assert.match(fonts, /@fontsource\/newsreader/);
  assert.doesNotMatch(fonts, /fonts\.googleapis\.com/);
  assert.doesNotMatch(components, /WarpTransition/);
});

test("forbidden visual motifs are absent from the active UI", async () => {
  const ui = (
    await Promise.all([
      ...(await sources("src/app")),
      ...(await sources("src/styles")),
    ])
  ).join("\n");

  for (const motif of [
    "lucide-react",
    "TerminalDriftCanvas",
    "ConstellationCanvas",
    "dot grid",
    "backdropFilter",
    "boxShadow",
    "radial-gradient",
    "createRadialGradient",
    "whileHover",
    "grid-cols-3",
    "grid-cols-5",
    "col-span-2",
    "col-span-3",
    "col-span-4",
    "rounded-full",
    "rounded-xl",
    "rounded-lg",
    'borderRadius: "100px"',
    'borderRadius: "50%"',
    'borderRadius: "4px"',
    'borderRadius: "5px"',
    "hover:scale",
    "hover:translate",
    "transition-all",
    "Bricolage Grotesque",
    "Epilogue",
    "\\bInter\\b",
    "\\bGeist\\b",
    "Space Grotesk",
  ]) {
    assert.doesNotMatch(ui, new RegExp(motif));
  }

  const components = (
    await Promise.all(await sources("src/app/components"))
  ).join("\n");
  assert.doesNotMatch(components, /→|★|✦/);
  assert.doesNotMatch(
    await read("src/app/components/ProjectsSection.tsx"),
    /linear-gradient/,
  );
  assert.doesNotMatch(
    await read("src/app/components/ProjectsSection.tsx"),
    /featured &&/,
  );
  assert.doesNotMatch(
    await read("src/app/components/ProjectsSection.tsx"),
    /shadow:/,
  );
});

test("legal pages are reachable from the SPA", async () => {
  const [app, contact, legal] = await Promise.all([
    read("src/app/App.tsx"),
    read("src/app/components/ContactSection.tsx"),
    read("src/app/data/legal.ts"),
  ]);

  assert.match(app, /pathname === "\/terms"/);
  assert.match(app, /pathname === "\/privacy"/);
  assert.match(contact, /href="\/terms"/);
  assert.match(contact, /href="\/privacy"/);
  assert.match(legal, /anonymous aggregate page views/);
  assert.match(legal, /no cookies/);
  assert.match(legal, /vercel\.com\/docs\/analytics\/privacy-policy/);
});

test("real image loading states are used for hero and hackathon media", async () => {
  const [image, hero, hacks, styles] = await Promise.all([
    read("src/app/components/PortfolioImage.tsx"),
    read("src/app/components/HeroSection.tsx"),
    read("src/app/components/HackathonsSection.tsx"),
    read("src/styles/index.css"),
  ]);

  assert.match(image, /useState/);
  assert.match(image, /onError/);
  assert.match(image, /image-skeleton/);
  assert.match(hero, /PortfolioImage/);
  assert.match(hacks, /PortfolioImage/);
  assert.match(styles, /flat-pulse/);
});

test("navigation has explicit desktop and mobile visibility rules", async () => {
  const styles = await read("src/styles/index.css");

  assert.match(
    styles,
    /@media \(min-width: 768px\)[\s\S]*\.menu-button\s*\{\s*display:\s*none/,
  );
  assert.match(
    styles,
    /@media \(min-width: 768px\)[\s\S]*\.mobile-nav\s*\{\s*display:\s*none/,
  );
  assert.match(
    styles,
    /@media \(max-width: 767px\)[\s\S]*\.desktop-nav\s*\{\s*display:\s*none/,
  );
  assert.match(
    styles,
    /@media \(max-width: 767px\)[\s\S]*\.menu-button\s*\{\s*display:\s*(?:inline-grid|grid)/,
  );
});
