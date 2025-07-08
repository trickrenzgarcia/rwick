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

const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetchApi("/api/projects", {
      next: {
        tags: ["projects"],
        revalidate: 3600, // 1 hour
      },
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return [];
    }

    const text = await response.text();

    // Check if the response is valid JSON
    if (!text) {
      console.error("Empty response from API");
      return [];
    }

    try {
      const projects = JSON.parse(text);
      return projects as Project[];
    } catch (jsonError) {
      console.error(
        "Invalid JSON response:",
        text.substring(0, 100),
        jsonError
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export { fetchProjects };
