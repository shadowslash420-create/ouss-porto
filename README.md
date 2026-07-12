# Oussama Anis — Portfolio Website

A high-converting personal portfolio built for a Full Stack Developer, designed to turn first-time visitors into clients within the first few seconds of landing.

---

## Live Preview

> Runs locally with `npm run dev` — Vite on port **5000**, Express API on port **3001**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS v3, shadcn/ui (Radix UI primitives) |
| Animations | GSAP (ScrollTrigger, timelines) |
| Backend | Express.js (Node.js) |
| Email | Nodemailer + Gmail SMTP |
| Deployment | Vercel (serverless `/api/contact`) |

---

## Features

### 🎯 Conversion-First Layout
The page follows a proven vertical slide structure designed to move visitors from *intrigued* to *convinced* to *booking*:

1. **Hero** — Value-first headline (*"I build websites that win you clients."*), primary CTA to projects, secondary CTA to contact
2. **Social Proof** — Three real client testimonials immediately below the hero to anchor trust before visitors scroll
3. **About + Skills** — Developer background and a visual skill grid
4. **Featured Projects** — Three curated case studies with outcome metrics on each card
5. **How I Work** — A 3-step process breakdown (Discovery → Design & Build → Launch & Deliver)
6. **Contact** — Clean form wired to a real email backend, warm closing headline

### 🎨 Design System (60-30-10 Rule)
| Role | Color | Usage |
|---|---|---|
| 60% Base | Deep Slate Midnight `#0F172A` | Background, page canvas |
| 30% Structure | Cool Muted Gray `#94A3B8` | Secondary text, labels |
| 10% Accent | Neon Cyan `#06B6D4` + Electric Emerald `#10B981` | CTAs, highlights, glows |

Cards use **glassmorphism** (`bg-slate-900/50`, `border-white/8`, `backdrop-blur-12px`) to create depth without visual noise.

### ✨ Animations
- **Preloader** — ~3.5s GSAP progress animation on first load (intentional, not a bug)
- **Hero entrance** — title blur-in, subtitle and CTA stagger after preloader completes
- **Scroll-triggered** — every section fades/slides in as it enters the viewport via GSAP ScrollTrigger
- **Ambient orbs** — floating blurred gradient orbs in the hero background
- **Card hover** — subtle lift + glow on project cards

### 📬 Contact Form
- Sends real emails to `oussamaanis2005@gmail.com` via Gmail SMTP
- Requires `GMAIL_USER` and `GMAIL_APP_PASSWORD` environment variables
- Without them the form returns a `500` error; the rest of the site is unaffected
- In production (Vercel) the form uses a serverless function at `api/contact.js`

### 💬 Chatbot
- Rule-based chatbot widget (no LLM, no API key required)
- Answers common questions about skills, services, and availability

---

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Hero.tsx          # Value-first hero section
│   │   ├── SocialProof.tsx   # Client testimonial strip
│   │   ├── About.tsx         # Bio + animated skill grid
│   │   ├── Projects.tsx      # Curated case studies with metrics
│   │   ├── Process.tsx       # 3-step "How I Work" section
│   │   ├── Contact.tsx       # Contact form + info
│   │   ├── Navigation.tsx    # Fixed glass nav (4 links max)
│   │   ├── Preloader.tsx     # GSAP loading screen
│   │   ├── Chatbot.tsx       # Rule-based chat widget
│   │   ├── Footer.tsx        # Footer
│   │   ├── Portfolio.tsx     # Root layout orchestrator
│   │   └── ui/               # shadcn/ui primitive components
│   ├── pages/
│   │   └── Index.tsx
│   └── index.css             # CSS custom properties (design tokens)
├── server/
│   ├── index.js              # Express dev server (Replit only)
│   └── mailer.js             # Nodemailer Gmail transport
├── api/
│   └── contact.js            # Vercel serverless function
├── public/
│   └── Images/               # Project screenshots, profile photo
├── tailwind.config.ts
└── vite.config.ts            # Dev server on :5000, proxy /api → :3001
```

---

## Getting Started

### Prerequisites
- Node.js 22.x

### Install & Run

```bash
npm install
npm run dev
```

This starts both the Vite dev server (`:5000`) and the Express API (`:3001`) concurrently. Vite proxies all `/api/*` requests to Express.

### Environment Variables (optional)

To enable the contact form email delivery:

```
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=your_app_password
```

Without these, the site runs fully — only the form submit will fail gracefully.

---

## Deployment

The project is configured for **Vercel**:

- `vite build` generates the `dist/` output
- `vercel.json` configures the SPA rewrite (all non-API routes → `index.html`)
- `api/contact.js` becomes a Vercel serverless function at `/api/contact`
- `.vercelignore` excludes the local Express server

Set `GMAIL_USER` and `GMAIL_APP_PASSWORD` in your Vercel project environment settings before deploying.

---

## Projects Showcased

| Project | Tech | Outcome |
|---|---|---|
| **Golden Rose Bakes** | React, Tailwind, Vite | New customer inquiries within 1 week of launch |
| **Creperie Kinder 5** | HTML, CSS, JavaScript | Online visibility from zero — indexed in 2 weeks |
| **Las Palmas Fine Dining** | React, Tailwind, Vite | First professional web presence for the restaurant |

---

## Author

**Oussama Anis** — Full Stack Developer based in Batna, Algeria  
📧 oussamaanis2005@gmail.com  
📞 +213 797 086 530
