import ProjectsClient from './projects-client';
import { fetchProjects } from '@/lib/api';

export default async function ProjectsComponent() {
  const projects = await fetchProjects();

  return (
    <>
      <div className="flex flex-col sm:flex-row h-full gap-6">
        <ProjectsClient projects={projects} />
      </div>
    </>
  );
}
