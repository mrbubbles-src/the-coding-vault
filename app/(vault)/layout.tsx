import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Fira_Code, Fira_Mono, Montserrat, Poppins } from 'next/font/google';
import { SidebarProvider } from '@/components/ui/shadcn/sidebar';
import { ThemeProvider } from '@/context/theme-provider';
import VaultSidebar from '@/components/layout/sidebar/vault/vault-sidebar';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import '../globals.css';

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
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${firaCode.variable} ${firaCodeMono.variable} ${montserrat.variable} ${poppins.variable} flex min-h-screen flex-col scroll-smooth antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <SidebarProvider defaultOpen={defaultOpen}>
            <VaultSidebar />
            <div className="flex w-full flex-col px-2 py-2 md:px-0 md:pr-2">
              <Navbar />
              <main className="flex flex-1 flex-col place-self-center px-1 pt-2 md:px-0">
                {children}
              </main>
              <Footer />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
