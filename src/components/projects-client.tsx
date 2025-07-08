"use client";

import * as React from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import ProjectCard from "./project-card";
import { Project } from "@/types";

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
    <>
      <aside className="w-full sm:w-56 md:w-64 lg:w-72 xl:w-80 sm:min-w-0">
        <div className="sticky top-22">
          <div className="space-y-2 sm:flex sm:flex-col">
            <span className="font-bold mb-2 sm:mb-0">Filter</span>
            <div className="flex flex-wrap gap-2 sm:flex-col sm:space-y-2 sm:gap-0">
              {filterTags.map((tag) => (
                <FilterList
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
        <span className="sm:mb-0">
          Showing {filteredProjects.length} project
          {filteredProjects.length !== 1 ? "s" : ""}
        </span>
        <div className="flex flex-col gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}

function FilterList({
  tag,
  isChecked,
  onToggle,
}: {
  tag: string;
  isChecked: boolean;
  onToggle: (tag: string, checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2 px-2 py-1 sm:gap-3 sm:px-1">
      <Checkbox
        id={tag}
        checked={isChecked}
        onCheckedChange={(checked) => onToggle(tag, !!checked)}
        className="flex-shrink-0"
      />
      <Label htmlFor={tag} className="text-sm sm:text-[16px] whitespace-nowrap">
        {tag}
      </Label>
    </div>
  );
}
