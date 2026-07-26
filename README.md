# Rahul Chimata Portfolio

A single-page engineering portfolio built with Next.js, React, TypeScript, and
vanilla CSS. It includes an interactive engineering canvas, scroll-linked
navigation and reveals, responsive motion, email links, résumé download, and
external project/profile links.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by the development server.

## Vercel deployment

The default `npm run build` command creates a static export in `out/`. Connect
the repository to Vercel with the Next.js framework preset; pushes to `main`
will build and deploy automatically.

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
