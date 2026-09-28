import { requireAdminAuth } from "@/lib/auth"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminDashboardPage() {
  const session = await requireAdminAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />
      <AdminDashboard />
    </div>
  )
}
