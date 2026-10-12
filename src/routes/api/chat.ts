import { createFileRoute } from '@tanstack/react-router'
import Anthropic from '@anthropic-ai/sdk'

const LANGUAGE_NAMES = { en: 'English', hi: 'Hindi', mr: 'Marathi' } as const

type ChatMessage = { role: 'user' | 'assistant'; content: string }

function systemPrompt(lang: keyof typeof LANGUAGE_NAMES) {
  return `You are "Mitra", the friendly assistant of VYAPAR MITRA — a website that helps small business owners in India (shopkeepers, kirana stores, street vendors, artisans, home businesses, first-time entrepreneurs, and MSMEs).

Your job is to interact with the user by ASKING QUESTIONS to understand their situation, then GIVE clear, practical INFORMATION.

How to behave:
- Always reply in ${LANGUAGE_NAMES[lang]}${lang === 'en' ? '' : ' using Devanagari script'}. Use simple, everyday words — avoid jargon, or explain it briefly.
- If you don't yet know key details, ask ONE or TWO short questions at a time (e.g. type of business, city/state or rural/urban, new or existing business, approximate yearly turnover, what help they need, whether they are a woman / SC/ST entrepreneur when relevant to scheme eligibility).
- Once you know enough, give a helpful answer: relevant government schemes (e.g. PM Mudra Yojana, Udyam Registration, PMEGP, PM SVANidhi, Stand-Up India, CGTMSE, state schemes), GST basics, registrations and licences, documents needed, digital payments/UPI, bookkeeping tips, and next steps.
- Keep replies short and scannable: at most ~150 words, using short bullet points where useful. End with a follow-up question when it helps move the conversation forward.
- Mention official sources where applicable (e.g. udyamregistration.gov.in, mudra.org.in, gst.gov.in, kviconline.gov.in for PMEGP, pmsvanidhi.mohua.gov.in, standupmitra.in).
- Scheme limits and rules change; when giving amounts or thresholds, say they should be confirmed on the official portal or with a bank.
- Never ask for sensitive data such as Aadhaar numbers, PAN, bank account numbers, OTPs or passwords. If the user shares them, tell them not to.
- Never claim to apply for anything on the user's behalf. Politely steer off-topic requests back to business help.
- Do not use markdown headings or tables; plain text with "-" bullets and occasional **bold** is fine.`
}

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: ChatMessage[]; lang?: string }
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const lang = (body.lang && body.lang in LANGUAGE_NAMES ? body.lang : 'en') as keyof typeof LANGUAGE_NAMES
        const messages = (Array.isArray(body.messages) ? body.messages : [])
          .filter(
            (m): m is ChatMessage =>
              (m?.role === 'user' || m?.role === 'assistant') &&
              typeof m.content === 'string' &&
              m.content.trim().length > 0,
          )
          .slice(-20)
          .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))

        // The API requires the conversation to start with a user turn
        while (messages.length && messages[0].role !== 'user') messages.shift()
        if (!messages.length) {
          return Response.json({ error: 'No messages provided' }, { status: 400 })
        }

        try {
          const anthropic = new Anthropic()
          const stream = anthropic.messages.stream({
            model: 'claude-sonnet-4-6',
            max_tokens: 700,
            system: systemPrompt(lang),
            messages,
          })

          const encoder = new TextEncoder()
          return new Response(
            new ReadableStream({
              async start(controller) {
                try {
                  for await (const event of stream) {
                    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
                      controller.enqueue(encoder.encode(event.delta.text))
                    }
                  }
                } catch (err) {
                  console.error('Chat stream error', err)
                } finally {
                  controller.close()
                }
              },
            }),
            { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } },
          )
        } catch (err) {
          console.error('Chat error', err)
          return Response.json({ error: 'Assistant unavailable' }, { status: 500 })
        }
      },
    },
  },
})
