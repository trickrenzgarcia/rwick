import { 
  SpiralCanvas,
  TypingAnimation,
  ContactForm
} from "@/components";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaGithub, FaFacebook, FaLinkedin, FaRegEnvelope } from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";

const EDUCATION_DATA = [
  {
    id: 1,
    title: "STI College Caloocan",
    subtitle: "Bachelor of Science in Computer Science",
    href: "https://sti.edu",
    date: "2022 - Present",
    description: ""
  },
  {
    id: 2,
    title: "City of Malabon University",
    subtitle: "Bachelor of Science in Information Technology",
    href: "https://cityofmalabonuniversity.edu.ph/",
    date: "2020 - 2022",
    description: ""
  },
  {
    id: 3,
    title: "STI College Caloocan",
    subtitle: "ITMAWD - Mobile App and Web Development",
    href: "https://sti.edu",
    date: "2018 - 2020",
    description: ""
  },
];

export default function Home() {
  
  return (
    <main className="w-full py-[70px]">
      <section className="w-full h-[600px] md:h-[500px] relative bg-cover flex flex-col overflow-hidden items-center justify-start">
        <div className="relative flex flex-col w-full h-screen justify-center items-center ">
          <div className="container h-full w-full flex flex-col lg:flex-row items-center lg:justify-between">
            <div className="w-full justify-center items-center order-2 lg:order-1">
              <h3 className="text-4xl">Hey, I&apos;m</h3>
              <h1 className="text-4xl md:text-6xl font-extrabold">Patrick Renz Garcia</h1>
              <div className="text-3xl font-bold">
                <TypingAnimation />
              </div>

              <p className="text-lg text-justify py-2">
                I&apos;m a freelance web developer based in the Philippines. I
                specialize in building websites and web applications using
                modern web technologies.
              </p>
              <div className="flex gap-4">
                <Link href="https://github.com/trickrenzgarcia" target="_blank">
                  <FaGithub className="w-8 h-8 transition-colors hover:text-gray-500 duration-150" />
                </Link>
                <Link href="https://www.facebook.com/trickrenz" target="_blank">
                  <FaFacebook className="w-8 h-8 transition-colors hover:text-gray-500 duration-150" />
                </Link>
                <Link href="https://x.com/yourizumi6" target="_blank">
                  <FaXTwitter className="w-8 h-8 transition-colors hover:text-gray-500 duration-150" />
                </Link>
                <Link href="https://www.linkedin.com/in/patrick-renz-garcia-16b643215/" target="_blank">
                  <FaLinkedin className="w-8 h-8 transition-colors hover:text-gray-500 duration-150" />
                </Link>
              </div>
            </div>
            <div className="w-full flex justify-center items-center order-1 lg:order-2 select-none">
              <Image
                width={300}
                height={300}
                src="/profile.png"
                alt="Profile Image"
                className="rounded-full w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] transition-opacity duration-300 border-2 p-4 lg:p-5"
              />
            </div>
          </div>

          <SpiralCanvas />
        </div>
      </section>
      <section className="w-full relative">
        <div className="container flex flex-col lg:flex-row justify-center lg:justify-between gap-7">
          <div className="w-full" id="about">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <p className="leading-7">
                    Hello, I&apos;m Patrick, a passionate and versatile web developer
                    with a love for crafting digital experiences that make an
                    impact. My journey into the world of programming began at
                    the age of 17, and since then, I&apos;ve been on a relentless
                    quest to turn innovative ideas into reality.
                  </p>
                  <div>
                    <h3 className="font-bold text-xl">
                      Development Experience ⏳
                    </h3>
                    <p className="leading-7">
                      I&apos;m a skilled web developer with experience in{" "}
                      <span className="text-blue-600 font-bold">TypeScript</span> and{" "}
                      <span className="text-primary font-bold">JavaScript</span>, and
                      expertise in frameworks like React, Node.js, and Next js.
                      I&apos;m a quick learner and collaborate closely with clients
                      to create efficient, scalable, and user-friendly solutions
                      that solve real-world problems. Let&apos;s work together to
                      bring your ideas to life!
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/about">
                  <p className="hover:underline text-gray-500">See more...</p>
                </Link>
              </CardFooter>
            </Card>
          </div>
          <div className="w-full" id="resume">
            <Card className="shadow-none border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="relative border-s border-primary">
                  {EDUCATION_DATA.map((data) => (
                    <li className="mb-10 ms-4 pr-7" key={data.id}>
                      <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border-2 bg-primary border-primary dark:border-primary"></div>
                      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {data.date}
                      </time>
                      <h3 className="text-lg font-bold">
                        <Link href={data.href} target="_blank">
                          {data.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{data.subtitle}</p>
                      <p className="mt-2 mb-4 text-sm font-normal text-gray-600">
                        {data.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/about#achievements">
                  <p className="hover:underline text-gray-500">See more...</p>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full relative">
        <div className="container flex" id="contact">
          <Card className="w-full shadow-none border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Get in touch</CardTitle>
              <div className="w-12 h-[6px] bg-primary rounded-full"></div>
            </CardHeader>
            <CardContent className="w-full flex flex-col lg:flex-row gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <FaRegEnvelope className="text-2xl text-yellow-500 dark:text-primary" />
                  <span>
                    <h3 className="text-lg font-bold">Email address</h3>
                    <p className="text-muted-foreground">trickrenzgarcia@gmail.com</p>
                  </span>
                </div>
                <div className="flex gap-2">
                  <FaLocationDot className="text-2xl text-yellow-500 dark:text-primary" />
                  <span>
                    <h3 className="text-lg font-bold">City</h3>
                    <p className="text-muted-foreground">Caloocan, Philippines</p>
                  </span>
                </div>
              </div>
              <div className="w-full">
                <ContactForm />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
