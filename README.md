# Rahul Chimata Portfolio

A single-page engineering portfolio built with React, TypeScript, Vinext, and
vanilla CSS. It includes an interactive engineering canvas, scroll-linked
navigation and reveals, responsive motion, email links, résumé download, and
external project/profile links.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by the development server.

## Validation

```bash
npm test
```

## Content

- Edit portfolio text, experience, projects, skills, education, and links in
  `app/portfolio-data.ts`.
- Edit page structure in `app/page.tsx`.
- Edit styling in `app/globals.css`.
- Replace `public/resume.pdf` when the résumé changes.
- Replace `public/rahul-chimata-headshot.jpg` when the headshot changes.

The `.openai/hosting.json`, `build/sites-vite-plugin.ts`, `vite.config.ts`, and
`worker/index.ts` files are required by the current Sites deployment.
