import { db } from '@/drizzle/db';
import ProjectsClient from '@/components/projects-client';

async function fetchProjects() {
  const projects = await db.query.projects.findMany({ limit: 100 });
  return projects;
}

export default async function ProjectsPage() {
  
  const projects = await fetchProjects();

  return (
    <div className="max-w-screen-lg mx-auto w-full h-full px-4 xl:px-0 pb-12">
      <ProjectsClient projects={projects} />
    </div>
  );
}
