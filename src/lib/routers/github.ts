import { Hono } from "hono"

export const github = new Hono()

const apiUrl = process.env.GITHUB_API_URL as string

github.get("/", async (c) => {
  const response = await fetch(`${apiUrl}?username=trickrenzgarcia`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    }
  });
  const data = await response.json() as Repo[];
  // Clean up the strings in the response data
  const cleanedData = data.map((repo) => ({
    ...repo,
    repo: repo.repo.trim(),
    link: repo.link.replace(/\s+/g, ""), // Remove all spaces and newlines
    description: repo.description?.trim(),
    image: repo.image.replace(/\s+/g, ""), // Remove all spaces and newlines
  }));

  return c.json(cleanedData);
})