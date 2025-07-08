"use client";

import React, { useState, useEffect } from "react";
import { NavImage, ModeToggle } from "./mode-toggle";
import Link from 'next/link';
import { motion } from "framer-motion"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      id="navbar"
      className={`fixed top-0 w-full h-16 z-50 transition-none duration-300 ${
        isScrolled 
          ? 'bg-background/40 backdrop-blur-sm border-b border-border/40' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <nav className="w-full h-full max-w-screen-lg mx-auto">
        <div className="flex items-center justify-between h-full px-4 xl:px-0">
          <Link href="/">
            <NavImage />
          </Link>

          <ul className="hidden md:flex space-x-6">
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink href="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink href="/services">Services</NavLink>
            </li>
            <li>
              <NavLink href="/contact">Contact</NavLink>
            </li>
          </ul>
          <div>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <Link href={href} className="font-medium text-gray-600 dark:text-gray-300 dark:hover:text-white transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  )
}

export default Navbar;
