import AboutMe from '@/components/about-me';
import BrowserId from '@/components/browser-id';
import ContactMe from '@/components/contact-me';
import Hero from '@/components/hero';
import { SparklesWrapper } from '@/components/sparkles-wrapper';

export default async function Home() {

  return (
    <main>
      <BrowserId />
      <section className="min-h-[100dvh] antialiased relative overflow-hidden">
        {/* Static background for immediate render */}
        <div className="h-full w-full absolute inset-0 z-0 bg-background" />
        
        {/* Client-side sparkles wrapper */}
        <SparklesWrapper />
        
        {/* Hero content - renders immediately on server */}
        <div className="relative z-10">
          <Hero />
        </div>
      </section>
      <section className="w-full h-full max-w-screen-lg mx-auto">
        <AboutMe />
      </section>
      <section className="w-full h-full max-w-screen-lg mx-auto">
        <ContactMe />
      </section>
    </main>
  )
}