import assert from "node:assert/strict";
import test from "node:test";
import {
  projects,
  selectProjectsByCategoryAndTrack,
} from "../src/app/data/projects.ts";
import { timelineData } from "../src/app/data/timeline.ts";

test("project catalogue contains every publishable canonical dossier", () => {
  const titles = new Set(projects.map(({ title }) => title));

  for (const title of [
    "Algorithmic Trading Backtester",
    "FinancePy — OSS Contribution",
    "FinSentinel",
    "WorldQuant International Quant Championship",
    "QSVM Fraud Detection",
    "NAISC 2026 — Adaptive Drift Detection",
    "Multimodal Video Recommendation",
    "Travel Video Intelligence",
    "BrainySG",
    "Sentinel",
    "PRISM",
    "HarvestChain",
    "Interview Station",
    "Nika AI Agent",
  ]) {
    assert.ok(titles.has(title));
  }
});

test("project catalogue excludes planning-only work and scopes team coursework honestly", () => {
  const titles = new Set(projects.map(({ title }) => title));
  const sc2002 = projects.find(
    ({ title }) => title === "SC2002 Team Documentation",
  );

  for (const title of [
    "Portfolio Risk Analytics",
    "Algorithmic Arbitrage Trading Bot",
    "LLM Fine-Tuning & Alignment Lab",
    "Multi-Agent Reasoning System",
    "Market Risk Forecasting Lab",
  ]) {
    assert.ok(!titles.has(title));
  }

  assert.match(sc2002?.description ?? "", /sequence-diagram documentation/);
});

test("quant selection includes finance-adjacent team work without reclassifying it", () => {
  const quantMlTitles = selectProjectsByCategoryAndTrack(
    projects,
    "ml",
    "quant",
  ).map(({ title }) => title);
  const quantAcademicTitles = selectProjectsByCategoryAndTrack(
    projects,
    "academic",
    "quant",
  ).map(({ title }) => title);
  const qsvm = projects.find(({ title }) => title === "QSVM Fraud Detection");
  const harvestChain = projects.find(({ title }) => title === "HarvestChain");

  assert.ok(quantMlTitles.includes("QSVM Fraud Detection"));
  assert.ok(quantAcademicTitles.includes("HarvestChain"));
  assert.equal(qsvm?.category, "ml");
  assert.equal(harvestChain?.category, "academic");
});

test("experience timeline reflects the current evidence-backed roles", () => {
  const vertex = timelineData[0];
  const roleTitles = new Set(timelineData.map(({ title }) => title));

  assert.equal(
    vertex.title,
    "Data Scientist Intern, Rhombus Platform (Labs Team)",
  );
  assert.equal(vertex.org, "Vertex Holdings");
  assert.ok(vertex.skills.includes("LangSmith"));
  assert.ok(vertex.skills.includes("GCP"));
  assert.match(vertex.description.join(" "), /15 tests, passed 3,422 tests/);
  assert.match(
    vertex.description.join(" "),
    /manager praise for cleaner production table output/,
  );
  assert.match(vertex.description.join(" "), /silent PDF clipping bug/);
  assert.match(
    vertex.description.join(" "),
    /mutation-verified regression test/,
  );
  assert.match(vertex.description.join(" "), /digit-width boundaries/);
  assert.match(vertex.description.join(" "), /2,030 tests/);

  for (const title of [
    "Machine Learning & GenAI Engineer (Intern)",
    "Software Development Engineer (Intern)",
  ]) {
    assert.ok(roleTitles.has(title));
  }
});
