import type { Metadata } from 'next';
import { Fira_Code, Fira_Mono, Montserrat, Poppins } from 'next/font/google';
import { ThemeProvider } from '@/context/theme-provider';
import '@/app/globals.css';

export const dynamic = 'force-static';
export const revalidate = 3600;

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});
const firaCodeMono = Fira_Mono({
  variable: '--font-fira-code-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});
const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  ),
  title: 'The Coding Vault',
  description: 'Ein Ort für alle deine Coding-Fragen!',
  openGraph: {
    title: 'The Coding Vault',
    description: 'Ein Ort für alle deine Coding-Fragen!',
    images: [
      {
        url: 'https://thecodingvault.mrbubbles-src.dev/api/og',
        width: 1200,
        height: 630,
        alt: 'The Coding Vault Logo',
      },
    ],
    type: 'website',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Coding Vault',
    description: 'Ein Ort für alle deine Coding-Fragen!',
    images: ['https://thecodingvault.mrbubbles-src.dev/api/og'],
    creator: '@_MstrBubbles',
  },
  other: { 'apple-mobile-web-app-title': 'thecodingvault.mrbubbles-src.dev' },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${firaCode.variable} ${firaCodeMono.variable} ${montserrat.variable} ${poppins.variable} flex min-h-screen flex-col scroll-smooth antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
