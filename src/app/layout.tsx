import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/context";
import Navbar from '@/components/navbar';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Patrick Renz Garcia's Portfolio",
  description: "My personal portfolio showcasing my work and skills.",
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://rwick.pro",
    title: "Home | Patrick Renz Garcia",
    siteName: "Patrick Renz Garcia",
    description: "My personal portfolio showcasing my work and skills.",
    images: ["https://rwick.pro/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rwickpro",
    creator: "@rwickpro",
    title: "Home | Patrick Renz Garcia",
    images: ["https://rwick.pro/og-image.png"],
  },
  generator: "Next.js",
  creator: "Patrick Renz Garcia",
  applicationName: "Patrick Renz Garcia's Portfolio",
  publisher: "Patrick Renz Garcia",
  keywords: [
    "Patrick Renz Garcia",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "JavaScript",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
