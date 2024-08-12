"use client"
import Link from "next/link"
import { FaRegStar } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  repos: Repo[]
}

export default function ProjectsCard({ repos }: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-3 grid-rows-1">
      {repos.map((repo) => (
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
  )
}
