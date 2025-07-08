import ProjectsClient from '@/components/projects-client';
import { fetchProjects } from '@/lib/api';

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="max-w-screen-lg mx-auto w-full h-full px-4 xl:px-0">
      <div className="flex flex-col sm:flex-row h-full gap-6">
        <ProjectsClient projects={projects} />
      </div>
    </div>
  );
}
