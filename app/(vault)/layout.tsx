import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Fira_Code, Fira_Mono, Montserrat, Poppins } from 'next/font/google';
import { SidebarProvider } from '@/components/ui/shadcn/sidebar';
import { ThemeProvider } from '@/context/theme-provider';
import VaultSidebar from '@/components/ui/sidebar/vault/vault-sidebar';
import Navbar from '@/components/ui/navigation/navbar';
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
  title: 'The Coding Vault',
  description: 'Work in progress. Stay tuned.',
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
        className={`${firaCode.variable} ${firaCodeMono.variable} ${montserrat.variable} ${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <SidebarProvider defaultOpen={defaultOpen}>
            <VaultSidebar />
            <div className="w-full py-2 pr-2 pl-1">
              <Navbar />
              <main className="py-2 pr-2 pl-1">{children}</main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
