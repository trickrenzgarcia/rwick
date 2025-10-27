"use client";

import * as React from "react";
import ProjectCard from "./project-card";
import { Project } from "@/types";
import { ProjectFilterList } from './project-filter-list';
import { useSession } from "next-auth/react"
import { motion } from "framer-motion";
import AddProject from './add-project';

const filterTags: string[] = [
  "AI",
  "Blockchain",
  "Firebase",
  "JavaScript",
  "Next.js",
  "PHP",
  "React.js",
  "Shadcn",
  "TailwindCSS",
  "TypeScript",
];

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const { data: session } = useSession();
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  // Filter projects based on selected tags
  const filteredProjects = React.useMemo(() => {
    if (selectedTags.length === 0) {
      return projects; // Show all projects if no filters selected
    }

    return projects.filter((project) =>
      selectedTags.some((tag) => project.tags.includes(tag))
    );
  }, [projects, selectedTags]);

  const handleTagToggle = (tag: string, checked: boolean) => {
    setSelectedTags((prev) =>
      checked ? [...prev, tag] : prev.filter((t) => t !== tag)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row h-full gap-6"
    >
      <aside className="w-full sm:w-56 md:w-64 lg:w-72 xl:w-80 sm:min-w-0">
        <div className="sticky top-22">
          <div className="space-y-2 sm:flex sm:flex-col">
            <span className="font-bold mb-2 sm:mb-0">Filter</span>
            <div className="flex flex-wrap gap-2 sm:flex-col sm:space-y-2 sm:gap-0">
              {filterTags.map((tag) => (
                <ProjectFilterList
                  key={tag}
                  tag={tag}
                  isChecked={selectedTags.includes(tag)}
                  onToggle={handleTagToggle}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex justify-between">
          <span className="sm:mb-0">
            Showing {filteredProjects.length} project
            {filteredProjects.length !== 1 ? "s" : ""}
          </span>
          {session?.user && (
            <AddProject />
          )}
        </div>
        
        <div className="flex flex-col gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}


