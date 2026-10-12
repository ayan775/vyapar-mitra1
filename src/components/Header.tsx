import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Languages, Menu, X } from 'lucide-react'
import { LANGUAGES, useI18n } from '@/lib/i18n'

export default function Header() {
  const { t } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#schemes', label: t.nav.schemes },
    { href: '#how', label: t.nav.how },
    { href: '#faq', label: t.nav.faq },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--paper)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-xl font-bold tracking-tight text-[var(--maroon)]">
            VYAPAR <span className="text-[var(--saffron)]">MITRA</span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-[15px] font-medium text-stone-700 transition hover:bg-[var(--maroon)]/5 hover:text-[var(--maroon)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <LanguageSwitcher />
          <button
            className="rounded-full p-2 text-[var(--maroon)] hover:bg-[var(--maroon)]/5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-[var(--line)] px-5 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 font-medium text-stone-700 hover:bg-[var(--maroon)]/5"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = LANGUAGES.find((l) => l.code === lang)!

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.language}
        className="flex items-center gap-2 rounded-full border border-[var(--maroon)]/20 bg-white px-3.5 py-2 text-sm font-semibold text-[var(--maroon)] shadow-sm transition hover:border-[var(--maroon)]/50"
      >
        <Languages size={17} className="text-[var(--saffron)]" />
        <span>{current.native}</span>
        <ChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="animate-rise absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-1.5 shadow-xl"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition ${
                  l.code === lang ? 'bg-[var(--maroon)]/[0.06] text-[var(--maroon)]' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>
                  <span className="block font-semibold">{l.native}</span>
                  <span className="block text-xs text-stone-500">{l.label}</span>
                </span>
                {l.code === lang && <Check size={16} className="text-[var(--saffron)]" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Logo() {
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="var(--maroon)" />
      <g fill="var(--marigold)">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="20" cy="9.5" rx="3.2" ry="5.5" transform={`rotate(${i * 45} 20 20)`} opacity="0.95" />
        ))}
      </g>
      <circle cx="20" cy="20" r="6" fill="var(--saffron)" />
      <circle cx="20" cy="20" r="2.4" fill="var(--maroon)" />
    </svg>
  )
}
