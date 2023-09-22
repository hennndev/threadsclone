import { apiRoute } from "@/config/config"

export async function getUserApi() {
  const res = await fetch(`${apiRoute}/api/getuser`)
  if(!res.ok) return null
  return res.json()
}