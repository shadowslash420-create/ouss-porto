# Oussama's Portfolio

## Overview
A personal portfolio site built with Vite, React, TypeScript, and shadcn/ui (Radix UI + Tailwind CSS). Sections include Hero, About, Projects, Contact, and a rule-based Chatbot. Uses GSAP for animations and an embedded Spline 3D scene in the Hero. The Contact form is wired to a real email backend (Gmail SMTP via `nodemailer`), sending inquiries to oussamaanis2005@gmail.com.

## Running the project
- Dev server: `npm run dev` — runs Vite (port 5000) and the local Express API (port 3001) together via `concurrently`. Vite proxies `/api/*` to the Express server (see `vite.config.ts`).
- The "Start application" workflow runs this automatically.
- Build: `npm run build` (or `npm run build:dev` for a development-mode build). Preview a build with `npm run preview`.
- Node version: 18.x (matches the `engines` field in `package.json`).

## Project structure
- `src/pages/Index.tsx` — main route, renders `Portfolio`.
- `src/components/` — page sections (Hero, About, Portfolio, Projects, Contact, Chatbot, Navigation, Footer, Preloader).
- `src/components/ui/` — shadcn/ui primitives.
- `server/mailer.js` — shared nodemailer/Gmail transport logic used by both backends below.
- `server/index.js` — Express server used only in Replit dev (`npm run dev`); not deployed to Vercel (see `.vercelignore`).
- `api/contact.js` — Vercel serverless function (same `/api/contact` endpoint) used in production on Vercel.

## Deploying to Vercel
- `vercel.json` sets the build command (`vite build`), output dir (`dist`), and an SPA rewrite so client-side routes fall back to `index.html` while `/api/*` still resolves to the serverless function.
- Required environment variables in the Vercel project settings: `GMAIL_USER` and `GMAIL_APP_PASSWORD` (same Gmail App Password used in Replit). Without these, the contact form returns a 500 "Email service is not configured" error.
- No other secrets are required; the chatbot is rule-based (no LLM API key needed).

## Mobile responsiveness
- All sections use Tailwind responsive breakpoints (mobile-first, `sm`/`md`/`lg` variants) and were reviewed for narrow-viewport overflow, including the floating chatbot widget which now sizes itself to `calc(100vw - 3rem)` on small screens instead of a fixed width.

## Notes
- On first load there's a ~3.5s GSAP preloader animation before the page fades in — this is intentional, not a bug.
- WebGL/THREE.js console warnings seen in headless screenshot tools are due to the lack of a GPU in that sandbox; they do not appear in real user browsers.
