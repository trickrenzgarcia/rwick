import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patrick Renz Garcia | Portfolio",
  description: "Im a freelance web developer based in the Philippines.",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        </ThemeProvider>
      </body>
    </html>
  );
}
