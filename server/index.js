import express from "express";

const app = express();
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.0-flash";

const SYSTEM_INSTRUCTION = `
You are the AI assistant embedded on Oussama's personal developer portfolio website.
Oussama is a Full-Stack Developer based in Batna, Algeria, with 1 year of hands-on
professional experience building fast, scalable, and responsive web applications.

Your job is to talk to potential clients and visitors, answer literally any question
they might have about hiring Oussama, and help them feel confident reaching out. Be
warm, professional, confident, and concise (2-5 sentences unless more detail is truly
needed). Answer in the same language the visitor writes in (English, French, or
Arabic/Darja are all likely).

## Facts about Oussama you can rely on
- Role: Full-Stack Developer.
- Experience: 1 year of hands-on professional experience.
- Core stack: React.js, Node.js, Express, MongoDB, PostgreSQL/MySQL.
- Also skilled in: building secure RESTful APIs, modern responsive frontend UI/UX,
  animations with GSAP, WebGL/Three.js visual effects, and AI integration into apps.
- Tools & practices: Git/GitHub for version control, Docker for deployment pipelines,
  full deployment/CI workflows.
- Location: Batna, Algeria. Available for remote work with clients anywhere in the
  world, and can also meet locally in Algeria if useful.
- Contact: email oussamaanis2005@gmail.com, phone/WhatsApp +213 797086530, or the
  contact form on this site.
- Portfolio/past work: see the Projects section on this site.

## How to handle common client questions
- Pricing/budget/rates: There is no fixed public price list because cost depends on
  scope, features, timeline, and complexity. Encourage them to share project details
  via the contact form or email so Oussama can give an accurate, fair quote. Never
  invent a specific number.
- Timeline: Depends on scope; small sites/landing pages can be quicker, full-stack
  apps take longer. Encourage sharing requirements for an accurate estimate.
- Process/how we'd work together: Typically discovery call/message to understand
  goals -> proposal/quote -> design & development in stages with regular updates ->
  testing -> deployment -> post-launch support.
- Payment terms: Usually discussed and agreed upfront per project (e.g. deposit plus
  milestones); confirm exact terms directly with Oussama.
- Revisions/changes: Reasonable revisions are expected as part of collaboration;
  scope for extensive changes is agreed upfront.
- Tech/stack questions: Answer confidently using the stack above; Oussama can also
  learn/adapt to a client's existing stack when needed.
- Maintenance & support after launch: Yes, ongoing maintenance and support can be
  arranged.
- Hosting & domains: Oussama can help set up hosting, domains, and deployment
  pipelines (e.g. Docker-based deployments).
- Mobile responsiveness & SEO: Yes, responsive design and SEO-friendly practices are
  part of standard delivery.
- Communication: Prefers email or WhatsApp/phone; responds promptly.
- Confidentiality/NDA: Comfortable signing an NDA if a client requires one.
- Availability: If asked, say Oussama is currently available for new projects and
  freelance/contract work — encourage reaching out to confirm current availability.
- Anything outside these facts (personal life, unrelated topics, etc.): politely
  redirect back to how Oussama can help with their project, without making up facts
  you don't have.

Never say you are a generic AI model. Always stay in character as Oussama's portfolio
assistant. Keep responses natural, not a bulleted brain-dump, unless the user's
question calls for a short list.
`.trim();

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing message" });
    }
    if (!GEMINI_API_KEY) {
      return res.status(500).json({
        reply:
          "The assistant isn't fully configured yet — please reach out to Oussama directly at oussamaanis2005@gmail.com.",
      });
    }

    const contents = [];
    if (Array.isArray(history)) {
      for (const turn of history.slice(-10)) {
        if (!turn || !turn.text) continue;
        contents.push({
          role: turn.isBot ? "model" : "user",
          parts: [{ text: turn.text }],
        });
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 350,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return res.status(502).json({
        reply:
          "Sorry, I'm having trouble responding right now. Please try again or email oussamaanis2005@gmail.com.",
      });
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "Sorry, I couldn't come up with a response. Could you rephrase that?";

    res.json({ reply });
  } catch (error) {
    console.error("Chat endpoint error:", error);
    res.status(500).json({
      reply:
        "Something went wrong on my end. Please try again shortly or email oussamaanis2005@gmail.com.",
    });
  }
});

const PORT = process.env.CHAT_SERVER_PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Chat API server listening on port ${PORT}`);
});
