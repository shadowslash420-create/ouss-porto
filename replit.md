# CodeZenith Portfolio

## Overview
A client-side personal portfolio site built with Vite, React, TypeScript, and shadcn/ui (Radix UI + Tailwind CSS). Sections include Hero, About, Portfolio, Projects, Contact, and a Chatbot UI component. Uses GSAP for animations and Three.js (via dependencies) for visual effects. There is no backend — the Contact and Chatbot components are front-end only and are not wired to any API.

## Running the project
- Dev server: `npm run dev` (bound to `0.0.0.0:5000`, `allowedHosts: true` in `vite.config.ts` so it works behind Replit's proxy).
- The "Start application" workflow runs this automatically.
- Build: `npm run build` (or `npm run build:dev` for a development-mode build). Preview a build with `npm run preview`.
- Node version: 18.x (matches the `engines` field in `package.json`).

## Project structure
- `src/pages/Index.tsx` — main route, renders `Portfolio`.
- `src/components/` — page sections (Hero, About, Portfolio, Projects, Contact, Chatbot, Navigation, Footer, Preloader).
- `src/components/ui/` — shadcn/ui primitives.
- No server/database — purely static/client-rendered.

## Notes
- On first load there's a ~3.5s GSAP preloader animation before the page fades in — this is intentional, not a bug.
- WebGL/THREE.js console warnings seen in headless screenshot tools are due to the lack of a GPU in that sandbox; they do not appear in real user browsers.
