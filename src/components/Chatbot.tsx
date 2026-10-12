import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { MessageCircle, RotateCcw, SendHorizontal, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

type Message = { role: 'user' | 'assistant'; content: string; error?: boolean }

type ChatValue = { open: boolean; setOpen: (open: boolean) => void; ask: (text: string) => void }

const ChatContext = createContext<ChatValue | null>(null)

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used inside ChatProvider')
  return ctx
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState<string | null>(null)

  const ask = (text: string) => {
    setOpen(true)
    setPending(text)
  }

  return (
    <ChatContext.Provider value={{ open, setOpen, ask }}>
      {children}
      <ChatWidget pending={pending} clearPending={() => setPending(null)} />
    </ChatContext.Provider>
  )
}

function ChatWidget({ pending, clearPending }: { pending: string | null; clearPending: () => void }) {
  const { open, setOpen } = useChat()
  const { t, lang } = useI18n()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (pending && !loading) {
      send(pending)
      clearPending()
    }
  }, [pending, loading])

  async function send(text: string) {
    const content = text.trim()
    if (!content || loading) return
    setInput('')

    // The greeting is shown in the UI; send it as context so the model knows what it asked
    const history: Message[] = [...messages, { role: 'user', content }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang,
          messages: [
            { role: 'user', content: '(Conversation started)' },
            { role: 'assistant', content: t.chat.greeting },
            ...history.filter((m) => !m.error).map(({ role, content }) => ({ role, content })),
          ],
        }),
      })
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let reply = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        reply += decoder.decode(value, { stream: true })
        setMessages([...history, { role: 'assistant', content: reply }])
      }
      if (!reply.trim()) throw new Error('Empty reply')
    } catch (err) {
      console.error(err)
      setMessages([...history, { role: 'assistant', content: t.chat.error, error: true }])
    } finally {
      setLoading(false)
    }
  }

  const empty = messages.length === 0

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? t.chat.close : t.chat.open}
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[var(--maroon)] px-5 py-4 text-[var(--cream)] shadow-[0_10px_30px_-8px_rgba(94,17,32,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--maroon-deep)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--marigold)]/60 ${open ? 'scale-90 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--marigold)] opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--marigold)]" />
        </span>
        <MessageCircle size={20} />
        <span className="font-semibold hidden sm:inline">{t.chat.open}</span>
      </button>

      <div
        role="dialog"
        aria-label={t.chat.title}
        className={`fixed z-50 bottom-0 right-0 sm:bottom-5 sm:right-5 flex h-[100dvh] w-full sm:h-[min(640px,calc(100dvh-2.5rem))] sm:w-[400px] flex-col overflow-hidden sm:rounded-3xl border border-[var(--line)] bg-[var(--paper)] shadow-[0_30px_80px_-20px_rgba(60,10,20,0.45)] origin-bottom-right transition-all duration-300 ${open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0 translate-y-4'}`}
      >
        <header className="flex items-center gap-3 bg-[var(--maroon)] px-4 py-3 text-[var(--cream)]">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--marigold)] font-display text-lg font-bold text-[var(--maroon-deep)]">
            मि
          </div>
          <div className="flex-1 leading-tight">
            <p className="font-display text-lg font-semibold">{t.chat.title}</p>
            <p className="text-xs text-[var(--cream)]/75 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {t.chat.status}
            </p>
          </div>
          {!empty && (
            <button
              onClick={() => setMessages([])}
              disabled={loading}
              className="rounded-full p-2 hover:bg-white/10 disabled:opacity-40"
              aria-label={t.chat.reset}
              title={t.chat.reset}
            >
              <RotateCcw size={18} />
            </button>
          )}
          <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-white/10" aria-label={t.chat.close}>
            <X size={20} />
          </button>
        </header>

        <div ref={scrollRef} className="ledger-bg flex-1 space-y-3 overflow-y-auto px-4 py-5">
          <Bubble role="assistant" content={t.chat.greeting} />
          {messages.map((m, i) =>
            m.role === 'assistant' && !m.content && loading && i === messages.length - 1 ? (
              <Typing key={i} />
            ) : (
              <Bubble key={i} role={m.role} content={m.content} error={m.error} />
            ),
          )}
          {empty && (
            <div className="flex flex-wrap gap-2 pt-2">
              {t.chat.quick.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-[var(--maroon)]/25 bg-white/70 px-3 py-1.5 text-sm text-[var(--maroon)] transition hover:border-[var(--maroon)] hover:bg-[var(--maroon)] hover:text-[var(--cream)]"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="border-t border-[var(--line)] bg-white/60 p-3"
        >
          <div className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-2 py-1 focus-within:border-[var(--maroon)]">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chat.placeholder}
              maxLength={1000}
              className="flex-1 bg-transparent px-3 py-2 text-[15px] outline-none placeholder:text-stone-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={t.chat.send}
              className="grid h-9 w-9 place-items-center rounded-full bg-[var(--saffron)] text-white transition hover:bg-[var(--maroon)] disabled:bg-stone-300"
            >
              <SendHorizontal size={17} />
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-stone-500">{t.chat.disclaimer}</p>
        </form>
      </div>
    </>
  )
}

function Bubble({ role, content, error }: { role: Message['role']; content: string; error?: boolean }) {
  const mine = role === 'user'
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'} animate-rise`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
          mine
            ? 'rounded-br-md bg-[var(--maroon)] text-[var(--cream)]'
            : error
              ? 'rounded-bl-md border border-red-200 bg-red-50 text-red-800'
              : 'rounded-bl-md border border-[var(--line)] bg-white text-stone-800 shadow-sm'
        }`}
      >
        {mine ? content : <RichText text={content} />}
      </div>
    </div>
  )
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-[var(--line)] bg-white px-4 py-3.5 shadow-sm">
        {[0, 150, 300].map((d) => (
          <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-[var(--saffron)]" style={{ animationDelay: `${d}ms` }} />
        ))}
      </div>
    </div>
  )
}

/** Minimal renderer for the assistant's plain-text replies: "-" bullets and **bold**. */
function RichText({ text }: { text: string }) {
  const blocks: React.ReactNode[] = []
  let list: string[] = []
  const flush = () => {
    if (list.length) {
      blocks.push(
        <ul key={blocks.length} className="my-1 list-disc space-y-1 pl-5 marker:text-[var(--saffron)]">
          {list.map((li, i) => (
            <li key={i}>{inline(li)}</li>
          ))}
        </ul>,
      )
      list = []
    }
  }
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    const bullet = line.match(/^(?:[-*•]|\d+[.)])\s+(.*)/)
    if (bullet) list.push(bullet[1])
    else {
      flush()
      if (line) blocks.push(<p key={blocks.length} className="my-1">{inline(line.replace(/^#+\s*/, ''))}</p>)
    }
  }
  flush()
  return <>{blocks}</>
}

function inline(s: string) {
  return s.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
  )
}
