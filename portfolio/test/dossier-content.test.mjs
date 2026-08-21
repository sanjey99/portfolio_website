import assert from "node:assert/strict";
import test from "node:test";
import {
  projects,
  selectProjectsForView,
} from "../src/app/data/projects.ts";
import { timelineData } from "../src/app/data/timeline.ts";

test("the default view is a focused three-case-study argument", () => {
  const titles = selectProjectsForView(projects, "selected").map(
    ({ title }) => title,
  );

  assert.deepEqual(titles, [
    "Algorithmic Trading Backtester",
    "Market Risk Forecasting Lab",
    "Panasonic SAM3 Systems Work",
  ]);
});

test("flagship claims expose current verification and honest boundaries", () => {
  const backtester = projects.find(
    ({ title }) => title === "Algorithmic Trading Backtester",
  );
  const riskLab = projects.find(
    ({ title }) => title === "Market Risk Forecasting Lab",
  );
  const panasonic = projects.find(
    ({ title }) => title === "Panasonic SAM3 Systems Work",
  );

  assert.match(backtester?.verification ?? "", /712 tests/);
  assert.match(backtester?.verification ?? "", /strict mypy/);
  assert.match(riskLab?.verification ?? "", /204 tests/);
  assert.match(riskLab?.boundary ?? "", /synthetic-only/i);
  assert.match(panasonic?.evidence ?? "", /one of four AI technologies/i);
  assert.match(panasonic?.boundary ?? "", /not the public presenter/i);
});

test("the archive keeps attributable proof and omits weak material", () => {
  const archiveTitles = new Set(
    selectProjectsForView(projects, "archive").map(({ title }) => title),
  );
  const titles = new Set(projects.map(({ title }) => title));

  for (const title of [
    "FinancePy — OSS Contribution",
    "WorldQuant International Quant Championship",
    "BrainySG",
    "Sentinel",
  ]) {
    assert.ok(archiveTitles.has(title));
  }

  for (const title of ["HomeCast", "SC2002 Team Documentation", "FinSentinel"])
    assert.ok(!titles.has(title));
});

test("experience timeline reflects the current technical roles", () => {
  const vertex = timelineData[0];

  assert.deepEqual(
    timelineData.map(({ org }) => org),
    [
      "Vertex Holdings",
      "Panasonic R&D Centre Singapore",
      "Rohde & Schwarz Asia",
    ],
  );
  assert.equal(
    vertex.title,
    "Data Scientist Intern, Rhombus Platform (Labs Team)",
  );
  assert.ok(vertex.skills.includes("LangSmith"));
  assert.ok(vertex.skills.includes("GCP"));
  assert.match(vertex.description.join(" "), /15 tests, passed 3,422 tests/);
  assert.match(vertex.description.join(" "), /silent PDF clipping bug/);
  assert.match(vertex.description.join(" "), /2,030 tests/);
  assert.match(vertex.description.join(" "), /10 merged PRs/);
});
