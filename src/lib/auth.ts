import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "carwash2024" // In production, use environment variables

export interface AdminUser {
  username: string
  isAuthenticated: boolean
}

export async function authenticateAdmin(username: string, password: string): Promise<boolean> {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export async function setAdminSession() {
  const cookieStore = await cookies()
  cookieStore.set("admin-session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getAdminSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin-session")

  if (session?.value === "authenticated") {
    return {
      username: ADMIN_USERNAME,
      isAuthenticated: true,
    }
  }

  return null
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete("admin-session")
}

export async function requireAdminAuth() {
  const session = await getAdminSession()
  if (!session) {
    redirect("/admin/login")
  }
  return session
}
