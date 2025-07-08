"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

const NavImage = React.memo(() => {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) {
    return (
      <Skeleton className="w-[65px] h-9" />
    );
  }

  return (
    <>
      {theme === "light" ? (
        <Image
          src="/meowlight.svg"
          alt="Logo Light"
          width={65}
          height={65}
        />
      ) : (
        <Image
          src="/meowdark.svg"
          alt="Logo Dark"
          width={65}
          height={65}
        />
      )}
    </>
  );
});

NavImage.displayName = 'NavImage';

export { NavImage };

const ModeToggle = React.memo(() => {
  const { setTheme } = useTheme();

  const handleModeTheme = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }

  return (
    <Button variant="outline" size="icon" onClick={handleModeTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
});

ModeToggle.displayName = 'ModeToggle';

export { ModeToggle };