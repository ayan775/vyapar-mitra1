# AGENTS.md

## Project overview

VYAPAR MITRA is a single-page, multilingual (English / Hindi / Marathi) help site for small Indian businesses, with an AI chatbot ("Mitra"). Built with TanStack Start, React 19 and Tailwind CSS 4, deployed on Netlify.

## Structure

```
src/
├── components/
│   ├── Chatbot.tsx     # ChatProvider (context: open/setOpen/ask) + floating chat widget, streaming reader, tiny markdown renderer
│   └── Header.tsx      # Sticky header, nav anchors, top-right LanguageSwitcher, SVG logo
├── lib/
│   └── i18n.tsx        # ALL UI copy: `en` dictionary (source of truth, defines the Dict type), `hi`, `mr`; I18nProvider + useI18n()
├── routes/
│   ├── __root.tsx      # HTML shell, meta, Google Fonts; wraps app in I18nProvider > ChatProvider > Header
│   ├── index.tsx       # Landing page sections (hero, stats, services, schemes, how, FAQ, CTA, footer)
│   └── api/chat.ts     # POST /api/chat — streams Claude replies via Netlify AI Gateway (plain text stream)
└── styles.css          # Brand CSS variables (--maroon, --saffron, --marigold, --teal, --paper…), fonts, ledger texture, animations
public/img/hero.png     # AI-generated hero illustration; always served through /.netlify/images
```

## Conventions & decisions

- **Translations**: never hard-code visible text in components. Add the key to `en` first; TypeScript then forces `hi` and `mr` to match (`const hi: Dict`). Language is client-side state persisted in `localStorage` (`vyapar-mitra-lang`); SSR renders English, then switches after hydration.
- **Chatbot**: the greeting is rendered client-side from the dictionary and sent to the API as the first assistant turn (preceded by a synthetic user turn) so the model knows what it asked. The server validates/trims history (last 20 turns, 2000 chars each). The system prompt in `api/chat.ts` defines Mitra's behaviour: ask 1–2 questions at a time, reply in the selected language, short bullets, cite official portals, never request sensitive IDs.
- **Model**: `claude-sonnet-4-6` through AI Gateway (`new Anthropic()` with no key). Only use models listed in the netlify-ai-gateway skill.
- Styling uses Tailwind utilities with the CSS variables from `styles.css` (`bg-[var(--maroon)]`). Display font Fraunces (Latin) falls back to Tiro Devanagari Hindi; body font Mukta covers Devanagari.
- No persistence is used; chat history lives only in component state.
