import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;
const previewRoot = new URL("../app/_sites-preview/", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the engineering portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.match(
    html,
    /<title>Rahul Chimata — Robotics &amp; Software Engineer<\/title>/i,
  );
  assert.match(html, /Building intelligent systems across/);
  assert.match(html, /Software Developer Intern/);
  assert.match(html, /IBM/);
  assert.match(html, /Mortenson/);
  assert.match(html, /03 \/ PROJECTS/i);
  assert.match(html, /Experience/i);
  assert.match(html, /Skills &amp; Tools/i);
  assert.match(html, /Contact/i);
  assert.doesNotMatch(html, /react-loading-skeleton/);
});

test("keeps content editable and removes starter assets", async () => {
  const [page, layout, data, packageJson, favicon] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../public/favicon.svg", import.meta.url), "utf8"),
  ]);

  assert.match(page, /id="home"/);
  assert.match(page, /onClick=\{\(\) => navigate\("experience"\)\}[\s\S]*Explore my work/);
  assert.match(page, /id="projects"/);
  assert.match(data, /export type PortfolioData/);
  assert.match(data, /resumeUrl\?: string/);
  assert.match(data, /RAHUL CHIMATA/);
  assert.match(data, /resumeUrl: "\/resume\.pdf"/);
  assert.match(data, /B\.S\. in Computer Science"/);
  assert.match(data, /B\.S\. in Computer Engineering"/);
  assert.match(data, /icon: "drone"/);
  assert.match(data, /icon: "solar"/);
  assert.match(data, /icon: "eye"/);
  assert.match(
    data,
    /hub\.docker\.com\/r\/rahulchimata\/drone_sim_final_project/,
  );
  assert.match(data, /RahulChimata\/Solar-Tracking-Project/);
  assert.match(data, /shreyadixit\.org\/shreya-innovation-lab/);
  assert.match(data, /PROGRAMMING & SYSTEMS/);
  assert.match(data, /INFRASTRUCTURE & DELIVERY/);
  assert.match(data, /x86-64 Assembly/);
  assert.match(data, /OpenCV & MediaPipe/);
  assert.match(layout, /generateMetadata/);
  assert.match(favicon, /fill="#0B0C10"/);
  assert.match(favicon, /stroke="#FFFFFF"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(
    access(new URL("SkeletonPreview.tsx", previewRoot)),
  );
});
