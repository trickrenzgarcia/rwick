import React from 'react';
import { Button } from './ui/button';
import {
  IconBrandGithub,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandThreads,
  IconBrandLinkedin
} from "@tabler/icons-react";
import Link from 'next/link';

const socials = [
  {
    name: 'GitHub',
    icon: IconBrandGithub,
    url: 'https://github.com/trickrenzgarcia',
  },
  {
    name: 'Facebook',
    icon: IconBrandFacebook,
    url: 'https://www.facebook.com/trickrenz'
  },
  {
    name: 'Instagram',
    icon: IconBrandInstagram,
    url: 'https://www.instagram.com/ricctrick'
  },
  {
    name: 'Threads',
    icon: IconBrandThreads,
    url: 'https://www.threads.com/@ricctrick'
  },
  {
    name: 'LinkedIn',
    icon: IconBrandLinkedin,
    url: 'https://www.linkedin.com/in/patrick-renz-garcia-16b643215/'
  }
]

const Footer = () => {
  return (
    <div id="footer" className="border-t">
      <footer className="w-full h-full max-w-screen-lg mx-auto py-4 px-0 sm:px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-col text-center md:text-start md:order-1 order-2">
            <p className="text-purple-500 text-sm font-bold">{"< Rwick >"}</p>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="order-1 md:order-2 space-x-2 text-gray-500 dark:text-gray-400">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.name}
                  className="hover:text-purple-500 transition-colors duration-300"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <Link href={social.url} target="_blank" rel="noopener noreferrer">
                    <Icon className="size-6" />
                  </Link>
                </Button>
              );
            })} 
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
