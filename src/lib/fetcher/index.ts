

export const appApiUrl = process.env.APP_API_URL as string

export async function getRepos() {
  const response = await fetch(appApiUrl+"/github", {
    method: "GET",
    cache: "no-store",
  })
  const data = await response.json()
  return data as Repo[]
}