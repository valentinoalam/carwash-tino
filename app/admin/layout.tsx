import type React from "react"
import { getAdminSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAdminSession()

  // Allow access to login page without authentication
  if (!session) {
    redirect("/admin/login")
  }

  return <>{children}</>
}
