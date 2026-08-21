import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const sources = async (dir) =>
  (await readdir(new URL(`../${dir}`, import.meta.url), { recursive: true }))
    .filter((file) => file.endsWith(".tsx") || file.endsWith(".css"))
    .map((file) => read(`${dir}/${file}`));

test("the portfolio uses local editorial fonts and Phosphor icons", async () => {
  const [packageJson, fonts, app] = await Promise.all([
    read("package.json"),
    read("src/styles/fonts.css"),
    read("src/app/App.tsx"),
  ]);

  assert.match(packageJson, /@phosphor-icons\/react/);
  assert.match(packageJson, /@fontsource\/newsreader/);
  assert.doesNotMatch(packageJson, /lucide-react/);
  assert.match(fonts, /@fontsource\/newsreader/);
  assert.doesNotMatch(fonts, /fonts\.googleapis\.com/);
  assert.doesNotMatch(app, /WarpTransition/);
});

test("forbidden generic visual motifs are absent from the active UI", async () => {
  const ui = (
    await Promise.all([
      ...(await sources("src/app")),
      ...(await sources("src/styles")),
    ])
  ).join("\n");

  for (const motif of [
    "lucide-react",
    "backdropFilter",
    "boxShadow",
    "radial-gradient",
    "rounded-full",
    "rounded-xl",
    "hover:scale",
    "hover:translate",
    "transition-all",
    "Bricolage Grotesque",
    "Epilogue",
    "Space Grotesk",
  ]) {
    assert.doesNotMatch(ui, new RegExp(motif));
  }
});

test("the homepage renders directly as one semantic document", async () => {
  const app = await read("src/app/App.tsx");

  assert.match(app, /<main/);
  assert.match(app, /<HeroSection/);
  assert.match(app, /<ProjectsSection/);
  assert.doesNotMatch(app, /type Stage/);
  assert.doesNotMatch(app, /TrackSelector/);
  assert.doesNotMatch(app, /stage ===/);
});

test("work views are optional inline filters with selected as default", async () => {
  const [context, projects] = await Promise.all([
    read("src/app/context/TrackContext.tsx"),
    read("src/app/components/ProjectsSection.tsx"),
  ]);

  for (const label of [
    "Selected",
    "Quant Systems",
    "Applied ML",
    "Product Systems",
    "Archive",
  ]) {
    assert.match(context, new RegExp(label));
  }
  assert.match(context, /useState<WorkView>\("selected"\)/);
  assert.match(projects, /aria-pressed/);
});

test("legal pages remain reachable and the page has a semantic footer", async () => {
  const [app, contact, legal] = await Promise.all([
    read("src/app/App.tsx"),
    read("src/app/components/ContactSection.tsx"),
    read("src/app/data/legal.ts"),
  ]);

  assert.match(app, /pathname === "\/terms"/);
  assert.match(app, /pathname === "\/privacy"/);
  assert.match(contact, /<footer/);
  assert.match(contact, /href="\/terms"/);
  assert.match(contact, /href="\/privacy"/);
  assert.match(legal, /anonymous aggregate page views/);
  assert.match(legal, /no cookies/);
});

test("images expose explicit loading and decoding behavior", async () => {
  const [image, hero, styleFiles] = await Promise.all([
    read("src/app/components/PortfolioImage.tsx"),
    read("src/app/components/HeroSection.tsx"),
    sources("src/styles"),
  ]);
  const styles = (await Promise.all(styleFiles)).join("\n");

  assert.match(image, /loading/);
  assert.match(image, /decoding/);
  assert.match(image, /onError/);
  assert.match(hero, /fetchPriority="high"/);
  assert.match(styles, /flat-pulse/);
});

test("navigation has explicit desktop and mobile visibility rules", async () => {
  const styles = (await Promise.all(await sources("src/styles"))).join("\n");

  assert.match(
    styles,
    /@media \(min-width: 768px\)[\s\S]*\.menu-button\s*\{\s*display:\s*none/,
  );
  assert.match(
    styles,
    /@media \(max-width: 767px\)[\s\S]*\.desktop-nav\s*\{\s*display:\s*none/,
  );
  assert.match(
    styles,
    /@media \(max-width: 767px\)[\s\S]*\.menu-button\s*\{\s*display:\s*inline-grid/,
  );
});

test("metadata describes and previews the career portfolio", async () => {
  const html = await read("index.html");

  assert.match(html, /rel="canonical"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /name="twitter:card"/);
  assert.match(html, /Applied ML Systems/);
});
