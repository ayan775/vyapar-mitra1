import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'


import Header from '@/components/Header'
import { ChatProvider } from '@/components/Chatbot'
import { I18nProvider } from '@/lib/i18n'
import '../styles.css'

const siteName = 'VYAPAR MITRA — Your Business Friend'
const siteDescription =
  'Vyapar Mitra helps small businesses in India with registration, GST, loans and government schemes — in English, Hindi and Marathi.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,800&family=Mukta:wght@400;500;600;700&family=Tiro+Devanagari+Hindi&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="grain">
        <I18nProvider>
          <ChatProvider>
            <Header />
            {children}
          </ChatProvider>
        </I18nProvider>
        <Scripts />
      </body>
    </html>
  )
}
