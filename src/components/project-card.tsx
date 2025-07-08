"use client";

import { Project } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Code, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectCard({
  project
}: { project: Project }) {
  return (
    <Card className="rounded-lg bg-transparent shadow-xs py-3">
      <CardContent className="px-4">
        <Image
          src={project.image}
          alt={project.title}
          width={484}
          height={200}
          className="border border/5 rounded-sm"
        />
      </CardContent>
      <CardHeader className="px-4 py-0">
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardFooter className="px-4 py-0 gap-2">
        <Link href={project.url} target="_blank">
          <Button variant="outline" className="rounded-xs">
            <Globe />{" "}See Demo
          </Button>
        </Link>
        <Link href={project.repo} target="_blank">
          <Button variant="outline" className="rounded-xs">
            <Code />{" "}Source Code
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
