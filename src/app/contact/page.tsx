'use client';

import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex flex-1 flex-col'>
        <div className='max-w-screen-lg mx-auto w-full h-full pt-32'>
          <div className='px-4 xl:px-0 mb-10'>
            <AnimatedShinyText className="inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-300">
              <span className='text-2xl font-semibold tracking-wider'>
                Let&apos;s Connect
              </span>
            </AnimatedShinyText>
          </div>
        </div>
        <div className='flex-1 max-w-screen-lg mx-auto w-full h-full'>
          Content
        </div>
      </div>
    </motion.main>
  );
}
