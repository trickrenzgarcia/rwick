import { Project } from "@/types";

function fetchApi(pathname: string, init?: RequestInit) {
  const baseUrl = process.env.API_URL || "http://localhost:3000";
  return fetch(baseUrl + pathname, {
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
