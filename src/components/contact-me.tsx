'use client';

import { motion } from 'framer-motion';
import { Separator } from './ui/separator';
import { GlobeIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { ContactForm } from './contact-form';

export default function ContactMe() {
  
  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='px-4 my-12'
    >
      <div id='contact' className='flex flex-col lg:flex-row justify-between gap-10 lg:gap-0'>
        <div className='w-full border rounded-lg max-h-[400px]'>
          <div className='flex items-center px-10 py-14 h-full'>
            <div className='flex flex-col w-full'>
              <h1 className='text-3xl font-medium uppercase'>Patrick Renz Garcia</h1>
              <h2 className='text-lg uppercase'>Software Engineer</h2>
              <Separator className='mt-3' />
              <ul className='mt-6 flex flex-col gap-4'>
                <li className='flex items-center gap-2'>
                  <PhoneIcon className='size-5' />
                  <a
                    className='font-light hover:underline underline-offset-4'
                    href='tel:+639943281579'
                    aria-label='Call Patrick Renz Garcia'
                  >
                    +63 994-328-1579
                  </a>
                </li>
                <li className='flex items-center gap-3'>
                  <MailIcon className='size-5' />
                  <a
                    className='font-light hover:underline underline-offset-4'
                    href='mailto:trickrenzgarcia@gmail.com'
                    aria-label='Email Patrick Renz Garcia'
                  >
                    trickrenzgarcia@gmail.com
                  </a>
                </li>
                <li className='flex items-center gap-3'>
                  <GlobeIcon className='size-5' />
                  <span className='font-light'>rwick.vercel.app</span>
                </li>
                <li className='flex items-center gap-3'>
                  <MapPinIcon className='size-5' />
                  <span className='font-light'>Metro Manila, Philippines</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div className='flex px-10'>
            <div className='flex flex-col w-full'>
              <h1 className='text-2xl font-medium '>Let&apos;s Connect</h1>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
