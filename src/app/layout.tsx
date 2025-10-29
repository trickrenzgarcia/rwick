import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/context';
import Navbar from '@/components/navbar';
import { Poppins } from 'next/font/google';
import Footer from '@/components/footer';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { BrowserIdProvider } from '@/components/context/browser-id';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Patrick Renz Garcia's Portfolio",
  description: 'My personal portfolio showcasing my work and skills.',
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: 'https://rwick.pro',
    title: 'Home | Patrick Renz Garcia',
    siteName: 'Patrick Renz Garcia',
    description: 'My personal portfolio showcasing my work and skills.',
    images: ['https://rwick.pro/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rwickpro',
    creator: '@rwickpro',
    title: 'Home | Patrick Renz Garcia',
    images: ['https://rwick.pro/og-image.png'],
  },
  generator: 'Next.js',
  creator: 'Patrick Renz Garcia',
  applicationName: "Patrick Renz Garcia's Portfolio",
  publisher: 'Patrick Renz Garcia',
  keywords: [
    'Patrick Renz Garcia',
    'Portfolio',
    'Web Developer',
    'Software Engineer',
    'Full Stack Developer',
    'Next.js',
    'React',
    'JavaScript',
    'TypeScript',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <BrowserIdProvider>
          <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
              <Navbar />
              {children}
              <Footer />
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </BrowserIdProvider>
      </body>
    </html>
  );
}
