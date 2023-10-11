import '@/assets/globals.css'
import type { Metadata } from 'next'
import { NextIntlClientProvider, useLocale } from 'next-intl'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import React from 'react'
import { ThemeProvider } from '@/contexts/theme-provider'
import { UserProvider } from '@/contexts/user-context'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dalkom Kissa',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = useLocale()
  let messages
  try {
    messages = (await import(`@/assets/locales/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
  if (params.locale !== locale) {
    notFound()
  }
  return (
    <html lang={locale}>
      <body className={cn('bg-background', inter.className)}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <UserProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
            >
              <main>{children}</main>
              <Toaster />
            </ThemeProvider>
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
