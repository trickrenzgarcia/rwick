import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const posts = [
  {
    id: 1,
    postId: "#",
    title: 'Welcome to my portfolio',
    body: 'This is my first post on my portfolio. I hope you enjoy it!',
    date: 'August 12, 2024',
    images: [
      {
        url: 'https://source.unsplash.com/random/800x600',
      }
    ],
    tags: ['Blog']
  },
  {
    id: 2,
    postId: "#",
    title: 'My journey as a web developer',
    body: 'I started my journey as a web developer in 2018. I have learned a lot of things since then.',
    date: 'August 12, 2024',
    images: [
      {
        url: 'https://source.unsplash.com/random/800x600',
      }
    ],
    tags: ['Developer', 'Blog']
  }
]

async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await response.json()
  return posts as {
    userId: number
    id: number
    title: string
    body: string
  }[]
}

export default async function PostsBlog() {
  return (
    <main className="w-full py-10">
      <section className="container max-w-screen-lg">
        <div className="grid gap-4 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.postId}`}>
              <Card className="shadow-none hover:border-primary/25 hover:shadow-primary hover:shadow-sm">
                <CardHeader>
                  <CardTitle className="truncate">{post.title}</CardTitle>
                  <CardDescription>{post.date}</CardDescription>
                </CardHeader>
                <CardFooter className="w-full">
                  <div className="">
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs text-gray-500 hover:border-primary border px-2 py-1 rounded-[8px]">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
