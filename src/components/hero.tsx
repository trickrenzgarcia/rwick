"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import { FloatingPaper } from "@/components/floating-paper"
import { RoboAnimation } from "@/components/robo-animation"
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  // This component is client-side only to ensure animations and interactions work correctly
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render sparkles until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-[calc(100vh)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              Patrick Renz
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 dark:from-purple-600 to-pink-600">
                {" "}
                Garcia
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 text-lg lg:text-xl mb-8 max-w-2xl mx-auto"
          >
            Software Engineer / Web Developer / Open Source Contributor
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/Garcia_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="lg">
                <FileText className="mr-2 h-5 w-5" />
                Resume
              </Button>
            </Link>
            <Link href="/projects" rel="noopener noreferrer" prefetch={true}>
              <Button size="lg" variant="outline">
                View Projects
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>
    </div>
  )
}