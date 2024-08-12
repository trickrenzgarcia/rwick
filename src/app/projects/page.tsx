import ProjectsCard from "@/components/ProjectsCard";

import { getRepos } from "@/lib/fetcher"
import { Suspense } from "react";


export default async function ProjectsPage() {
  const data = await getRepos()

  return (
    <main className="w-full py-[70px]">
      <section className="container lg:max-w-screen-lg py-10">
        <Suspense fallback={<p>Loading...</p>}>
          <ProjectsCard repos={data} />
        </Suspense>
      </section>
    </main>
  )
}
