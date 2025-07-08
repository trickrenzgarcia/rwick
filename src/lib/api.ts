import { Project } from "@/types";

function fetchApi(pathname: string, init?: RequestInit) {
  console.log("Fetching API:", pathname);
  const url = new URL(
    pathname,
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  );
  return fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const fetchProjects = async () => {
  const projects = await fetchApi("/api/projects", {
    next: {
      tags: ["projects"],
      revalidate: 3600, // 1 hour
    },
  });

  return (await projects.json()) as Project[];
};

export { fetchProjects };
