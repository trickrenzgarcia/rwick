import Image from 'next/image';
import { AnimatedShinyText } from './magicui/animated-shiny-text';
import { Marquee } from './magicui/marquee';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

import { TECH_STACKS, TECH_STACKS_2 } from '@/lib/constants';
import Link from 'next/link';

export default function AboutMe() {
  return (
    <div className='py-6 md:py-12 px-4 space-y-14'>
      <div className='flex justify-between items-center md:items-start'>
        <div className='space-y-8'>
          <div className='flex justify-between'>
            <div className='flex-1'>
              <h2 className='text-3xl font-medium'>Patrick Renz Garcia</h2>
              <AnimatedShinyText className='inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400'>
                <span className='text-lg font-medium'>Software Engineer</span>
              </AnimatedShinyText>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 bg-green-500 rounded-full animate-pulse"></div>
                  Available for work
                </div>
              </div>
            </div>
            <div>
              <Image
                src='/profile.jpg'
                alt='Profile Picture'
                width={100}
                height={100}
                className='rounded-full border-4'
              />
            </div>
          </div>
          <div className='space-y-2'>
            <h2 className='text-xl'>About Me</h2>
            <p className='leading-7 text-foreground/80'>
              Hello! I&apos;m a passionate software engineer with a knack for
              crafting efficient and scalable web applications. With a strong
              foundation in both front-end and back-end technologies, I enjoy
              bringing ideas to life through code. When I&apos;m not coding, you
              can find me exploring the latest tech trends or contributing to
              open-source projects. Let&apos;s build something amazing together!
              &nbsp;
              <Link
                href='/contact'
                className='text-purple-500 font-semibold hover:underline underline-offset-4'
              >
                {'Hire Me!'}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className='space-y-4'>
        <h2 className='text-xl'>Tech Stacks</h2>
        <div className='relative flex w-full flex-col items-start justify-center overflow-hidden'>
          <Marquee pauseOnHover className='[--duration:45s]'>
            {TECH_STACKS.map((stack, index) => {
              const Icon = stack.Icon;
              return (
                <div
                  key={index}
                  className='select-none relative size-9 xl:size-12'
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Icon />
                    </TooltipTrigger>
                    <TooltipContent>{stack.text}</TooltipContent>
                  </Tooltip>
                </div>
              );
            })}
          </Marquee>
          <Marquee
            reverse={true}
            pauseOnHover={true}
            className='[--duration:55s]'
          >
            {TECH_STACKS_2.map((stack, index) => {
              const Icon = stack.Icon;
              return (
                <div key={index} className='select-none relative'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Icon />
                    </TooltipTrigger>
                    <TooltipContent>{stack.text}</TooltipContent>
                  </Tooltip>
                </div>
              );
            })}
          </Marquee>
          <div className='pointer-events-none absolute inset-y-0 left-0 w-1/8 bg-gradient-to-r from-background'></div>
          <div className='pointer-events-none absolute inset-y-0 right-0 w-1/8 bg-gradient-to-l from-background'></div>
        </div>
      </div>
    </div>
  );
}
