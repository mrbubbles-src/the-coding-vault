import type { Metadata } from 'next';
import { Fira_Code, Fira_Mono, Montserrat, Poppins } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/context/theme-provider';
import Navbar from '@/components/ui/navigation/navbar';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${firaCode.variable} ${firaCodeMono.variable} ${montserrat.variable} ${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
