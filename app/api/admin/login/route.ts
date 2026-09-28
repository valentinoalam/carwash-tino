import { type NextRequest, NextResponse } from "next/server"
import { authenticateAdmin, setAdminSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const isValid = await authenticateAdmin(username, password)

    if (isValid) {
      await setAdminSession()
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
