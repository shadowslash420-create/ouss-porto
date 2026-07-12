---
name: Gemini free-tier quota account-wide
description: Gemini API keys all returning RESOURCE_EXHAUSTED with limit:0 across different keys/projects — indicates account-level billing restriction, not fixable by rotating keys.
---

When a Gemini API key returns 429 RESOURCE_EXHAUSTED with "limit: 0" for generate_content_free_tier_requests on every model tried, and a freshly generated key from what should be a different project shows the *identical* limit:0 error, treat it as an account-wide restriction (no billing account linked anywhere on the Google account, or free tier unavailable for that account/region) rather than a per-project/per-key quota fluke.

**Why:** Verified by testing 3 separate user-provided Gemini keys against multiple models (gemini-2.0-flash, gemini-2.0-flash-lite, gemini-2.5-flash) — all hit the same limit:0 error. The key itself was valid (models list endpoint worked fine), so it wasn't a malformed/revoked key issue.

**How to apply:** Don't keep requesting new keys from the user after the first one fails this way — one confirmation is enough to diagnose the pattern. Ask the user to enable billing on the Google Cloud project behind the key (or on their Google account generally) via https://aistudio.google.com/apikey, or offer to switch providers (e.g. OpenAI) if they'd rather not.
