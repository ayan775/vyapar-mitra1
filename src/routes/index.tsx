import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpenText,
  Building2,
  ChevronDown,
  FileCheck2,
  Landmark,
  MessageCircle,
  QrCode,
  ReceiptIndianRupee,
  Sparkles,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { useChat } from '@/components/Chatbot'

export const Route = createFileRoute('/')({
  component: Home,
})

const SERVICE_ICONS = [Building2, ReceiptIndianRupee, Landmark, FileCheck2, QrCode, BookOpenText]

function Home() {
  const { t } = useI18n()
  const { ask, setOpen } = useChat()

  return (
    <main id="top">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[var(--marigold)]/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-64 h-[380px] w-[380px] rounded-full bg-[var(--saffron)]/10 blur-3xl" />
        <Toran />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
          <div className="animate-rise">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--saffron)]/30 bg-white/70 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--saffron)]">
              <Sparkles size={15} /> {t.hero.eyebrow}
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.08] text-[var(--maroon-deep)] sm:text-6xl lg:text-7xl">
              {t.hero.title1}{' '}
              <span className="relative inline-block italic text-[var(--saffron)]">
                {t.hero.title2}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 8 C 50 2, 120 2, 198 7" stroke="var(--marigold)" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>{' '}
              <br className="hidden sm:block" />
              {t.hero.title3}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-stone-700">{t.hero.subtitle}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--maroon)] px-7 py-4 text-base font-semibold text-[var(--cream)] shadow-[0_12px_30px_-10px_rgba(122,28,46,0.7)] transition hover:-translate-y-0.5 hover:bg-[var(--maroon-deep)]"
              >
                <MessageCircle size={19} />
                {t.hero.ctaChat}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#schemes"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--maroon)]/20 px-7 py-3.5 text-base font-semibold text-[var(--maroon)] transition hover:border-[var(--maroon)] hover:bg-white"
              >
                {t.hero.ctaSchemes}
              </a>
            </div>
          </div>

          <div className="relative animate-rise [animation-delay:150ms]">
            <div className="absolute -inset-3 rotate-2 rounded-[2rem] bg-[var(--maroon)]" />
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-[var(--cream)] shadow-2xl">
              <img
                src="/.netlify/images?url=/img/hero.png&w=900&fm=webp"
                srcSet="/.netlify/images?url=/img/hero.png&w=600&fm=webp 600w, /.netlify/images?url=/img/hero.png&w=900&fm=webp 900w, /.netlify/images?url=/img/hero.png&w=1200&fm=webp 1200w"
                sizes="(min-width: 1024px) 560px, 100vw"
                alt="A shopkeeper at her store counter using a smartphone"
                width={1200}
                height={896}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-2xl border border-[var(--line)] bg-white px-5 py-3 shadow-xl sm:-left-8">
              <p className="flex items-center gap-2 text-sm font-semibold text-[var(--teal)]">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {t.hero.badge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--line)] bg-[var(--maroon)] text-[var(--cream)]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-[var(--cream)]/15 px-5 md:grid-cols-4 md:divide-x">
          {t.stats.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center">
              <p className="font-display text-4xl font-bold text-[var(--marigold)]">{s.value}</p>
              <p className="mt-1 text-sm text-[var(--cream)]/80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-5 py-24">
        <SectionHead eyebrow={t.services.eyebrow} title={t.services.title} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = SERVICE_ICONS[i]
            return (
              <article
                key={i}
                className="group relative rounded-3xl border border-[var(--line)] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--saffron)]/50 hover:shadow-[0_20px_40px_-20px_rgba(122,28,46,0.35)]"
              >
                <span className="absolute right-6 top-6 font-display text-5xl font-bold text-[var(--line)] transition group-hover:text-[var(--marigold)]/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[var(--saffron)]/10 text-[var(--saffron)] transition group-hover:bg-[var(--saffron)] group-hover:text-white">
                  <Icon size={24} />
                </div>
                <h3 className="font-display text-xl font-semibold text-[var(--maroon-deep)]">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-stone-600">{item.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* Schemes */}
      <section id="schemes" className="ledger-bg border-y border-[var(--line)] py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHead eyebrow={t.schemes.eyebrow} title={t.schemes.title} subtitle={t.schemes.subtitle} />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {t.schemes.items.map((s) => (
              <article
                key={s.name}
                className="flex flex-col rounded-3xl border-l-4 border-[var(--saffron)] bg-white p-7 shadow-sm transition hover:shadow-lg"
              >
                <span className="mb-4 self-start rounded-full bg-[var(--teal)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--teal)]">
                  {s.tag}
                </span>
                <h3 className="font-display text-2xl font-semibold text-[var(--maroon-deep)]">{s.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-stone-600">{s.body}</p>
                <button
                  onClick={() => ask(`${s.name}?`)}
                  className="group mt-6 inline-flex items-center gap-2 self-start font-semibold text-[var(--maroon)] hover:text-[var(--saffron)]"
                >
                  <MessageCircle size={17} />
                  {t.schemes.ask}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-5 py-24">
        <SectionHead eyebrow={t.how.eyebrow} title={t.how.title} />
        <div className="relative mt-14">
        <div className="absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-[var(--saffron)]/40 md:block" />
        <ol className="relative grid gap-10 md:grid-cols-3">
          {t.how.steps.map((step, i) => (
            <li key={i} className="relative text-center">
              <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--marigold)] font-display text-2xl font-bold text-[var(--maroon-deep)] ring-8 ring-[var(--paper)]">
                {i + 1}
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-[var(--maroon-deep)]">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs leading-relaxed text-stone-600">{step.body}</p>
            </li>
          ))}
        </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-[var(--line)] bg-[var(--cream)] py-24">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <div className="mt-12 space-y-3">
            {t.faq.items.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-[var(--line)] bg-white px-6 py-5 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-[var(--maroon-deep)] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown size={20} className="shrink-0 text-[var(--saffron)] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 leading-relaxed text-stone-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[var(--maroon-deep)] px-8 py-16 text-center text-[var(--cream)] sm:px-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--saffron)]/30 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[var(--marigold)]/20 blur-2xl" />
          <h2 className="relative font-display text-4xl font-bold sm:text-5xl">{t.cta.title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-[var(--cream)]/80">{t.cta.body}</p>
          <button
            onClick={() => setOpen(true)}
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--marigold)] px-8 py-4 font-semibold text-[var(--maroon-deep)] transition hover:-translate-y-0.5 hover:bg-white"
          >
            <MessageCircle size={19} />
            {t.cta.button}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--line)] px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-stone-600 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-lg font-bold text-[var(--maroon)]">
              VYAPAR <span className="text-[var(--saffron)]">MITRA</span>
            </p>
            <p>{t.footer.tagline}</p>
          </div>
          <p className="max-w-md md:text-right">
            {t.footer.note}
            <br />© {new Date().getFullYear()} Vyapar Mitra. {t.footer.rights}
          </p>
        </div>
      </footer>
    </main>
  )
}

function SectionHead({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--saffron)]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-[var(--maroon-deep)] sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-stone-600">{subtitle}</p>}
    </div>
  )
}

/** Decorative marigold-and-mango-leaf garland (toran) hanging along the top of the hero. */
function Toran() {
  return (
    <svg className="animate-sway pointer-events-none absolute left-0 right-0 top-0 h-10 w-full" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 4 Q 600 36 1200 4" stroke="var(--teal)" strokeWidth="1.5" fill="none" opacity="0.5" />
      {Array.from({ length: 25 }).map((_, i) => {
        const x = i * 50
        const y = 4 + 32 * (1 - ((x - 600) / 600) ** 2) * 0.5
        return i % 2 ? (
          <ellipse key={i} cx={x} cy={y + 6} rx="5" ry="10" fill="var(--teal)" opacity="0.7" />
        ) : (
          <circle key={i} cx={x} cy={y + 4} r="7" fill={i % 4 ? 'var(--marigold)' : 'var(--saffron)'} />
        )
      })}
    </svg>
  )
}
