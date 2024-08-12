import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getRepos } from "@/lib/fetcher"
import Link from "next/link"
import { FaRegStar } from "react-icons/fa";

export default async function ProjectsPage() {
  const data = await getRepos()
  return (
    <main className="w-full py-[70px]">
      <section className="container lg:max-w-screen-lg py-10">
        <div className="grid gap-4 lg:grid-cols-3 grid-rows-1">
          {data.map((repo) => (
            <Link key={repo.link} href={repo.link} target="_blank">
              <Card className="w-full shadow-none h-full hover:bg-accent">
                <CardHeader className="">
                  <CardTitle>{repo.repo}</CardTitle>
                  <CardDescription className="truncate">{repo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <FaRegStar className="text-lg"/>
                    <p>{repo.stars}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
