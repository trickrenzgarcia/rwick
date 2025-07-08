"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFoundClient() {
  return (
    <div className="relative min-h-[calc(100vh)] flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-7xl font-bold mb-4">404</h1>
        <p className="text-2xl text-gray-500 mb-8">Page Not Found</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </motion.div>
    </div>
  );
}
