# VYAPAR MITRA

**Vyapar Mitra** ("business friend") is a website that helps small business owners in India — shopkeepers, street vendors, artisans and first-time entrepreneurs — understand business registration, GST, loans and government schemes in simple language.

## Features

- **Three languages** — a language switcher in the top-right corner changes the whole site between English, हिन्दी (Hindi) and मराठी (Marathi). The choice is remembered in the browser.
- **Mitra, the chatbot** — a floating chat assistant that asks the visitor questions about their business (type, stage, location, needs) and then gives practical guidance on schemes, documents and next steps. It replies in the currently selected language and streams its answers.
- **Landing page** — services overview, a scheme directory (each card can hand the question straight to Mitra), a "how it works" section and FAQs.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, server routes)
- Tailwind CSS 4
- Anthropic Claude via [Netlify AI Gateway](https://docs.netlify.com/build/ai-gateway/overview/) — no API key needed when deployed on Netlify
- Netlify Image CDN for the hero illustration

## Running locally

```bash
pnpm install
netlify dev   # runs the site with Netlify emulation (AI Gateway env vars included when linked to the site)
```

The chatbot needs AI Gateway credentials, which Netlify provides automatically to linked/deployed sites. Alternatively, set `ANTHROPIC_API_KEY` in a local `.env`.
