import Image from 'next/image'
import { AnimatedShinyText } from './magicui/animated-shiny-text'
import { Marquee } from './magicui/marquee'

const techStacks = [
  { text: 'JavaScript', icon: '🟨' },
  { text: 'TypeScript', icon: '🟦' },
  { text: 'TailwindCSS', icon: '🟩' },
  { text: 'React', icon: '🟩' },
  { text: 'Next.js', icon: '🟪' },
  { text: 'Node.js', icon: '🟫' },
]

export default function AboutMe() {
  return (
    <div className="py-6 md:py-12 px-4 space-y-10">
      <div className="flex justify-between items-center md:items-start">
        <div>
          <h2 className="text-2xl font-medium">Patrick Renz Garcia</h2>
          <AnimatedShinyText className="inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span className="text-[16px] font-medium">Software Engineer</span>
          </AnimatedShinyText>
        </div>
        <div className="relative size-24 rounded-full border-4">
          <Image
            className="rounded-full object-cover"
            src="/profile.jpg"
            alt="Profile Picture"
            fill
          />
        </div>
      </div>
      <div>
        <h1 className='text-xl'>Tech Stacks</h1>
        <div className="mt-4 relative flex w-full flex-col items-start justify-center overflow-hidden">
          <Marquee pauseOnHover className='[--duration:20s]'>
            {techStacks.map((stack, index) => (
              <Stack key={index} text={stack.text} icon={stack.icon} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </div>
      <div>
        <h1 className='text-xl'>About Me</h1>
      </div>
    </div>
  )
}

function Stack({ text, icon }: {
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <div className=" p-2 select-none">
      <span>{text}</span>
      {icon}
    </div>
  )
}