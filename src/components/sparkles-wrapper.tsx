"use client";

import { SparklesCore } from '@/components/sparkles';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function SparklesWrapper() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render sparkles until mounted
  if (!mounted) {
    return <div>Loading...</div>;
  }

  const particleColor = resolvedTheme === 'dark' ? '#fdfdfd' : '#0e0e10';
  const backgroundColor = resolvedTheme === 'dark' ? '#0e0e10' : '#fdfdfd';

  return (
    <div className="h-full w-full absolute inset-0 z-0 overflow-hidden">
      <SparklesCore
        id="tsparticlesfullpage"
        background={backgroundColor}
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full"
        particleColor={particleColor}
      />
    </div>
  );
}
