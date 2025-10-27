"use client";

import { Project } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Code, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { IconEdit, IconLoader2, IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";
import * as React from "react";
import { deleteProject } from "@/actions/delete-actions";

export default function ProjectCard({ project }: { project: Project }) {
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false)
  const { data: session } = useSession()

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await deleteProject(project.id);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete project. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <Card className="rounded-lg bg-transparent shadow-xs py-3">
      <CardContent className="px-4">
        <Image
          src={project.image}
          alt={project.title}
          width={484}
          height={200}
          className="border border/5 rounded-sm select-none"
        />
      </CardContent>
      <CardHeader className="px-4 py-0">
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 dark:bg-zinc-900 px-2 py-1 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardFooter className="px-4 py-0 justify-between items-center">
        <div className="flex items-center gap-2">
          {!project.isPrivate ? (
            <Link href={project.url} target="_blank">
              <Button variant="outline" className="rounded-xs">
                <Globe /> See Demo
              </Button>
            </Link>
          ) : (
            <Button variant="outline" className="rounded-xs" disabled>
              <Globe /> Private
            </Button>
          )}
          
          {project.repo ? (
            <Link href={project.repo} target="_blank">
              <Button variant="outline" className="rounded-xs">
                <Code /> Source Code
              </Button>
            </Link>
          ) : (
            <Button variant="outline" className="rounded-xs" disabled>
              <Code /> Source Code
            </Button>
          )}
        </div>
        {session?.user ? (
          <div className="flex gap-1">
            <Button
              variant="default"
              className="rounded-xs bg-blue-500/80 text-white hover:bg-blue-500/70"
              size="sm"
              disabled={deleteLoading}
            >
              <IconEdit />
            </Button>
            <Button
              variant="default"
              onClick={handleDelete}
              className="rounded-xs bg-red-500/80 text-white hover:bg-red-500/70"
              size="sm"
              disabled={deleteLoading}
            >
              {deleteLoading ? <IconLoader2 className="animate-spin" /> : <IconTrash />}
            </Button>
          </div>
        ) : null}
        
      </CardFooter>
    </Card>
  );
}
