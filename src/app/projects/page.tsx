import ProjectsComponent from '@/components/projects-component';
import { Suspense } from "react";

export default async function ProjectsPage() {
  return (
    <div className="max-w-screen-lg mx-auto w-full h-full px-4 xl:px-0">
      <Suspense fallback={<>Loading...</>}>
        <ProjectsComponent />
      </Suspense>
    </div>
  );
}
