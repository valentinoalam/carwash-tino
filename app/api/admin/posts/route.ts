import { type NextRequest, NextResponse } from "next/server"
import { requireAdminAuth } from "@/lib/auth"
import { createPost } from "@/lib/mdx"

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()
    const postData = await request.json()
    const slug = await createPost(postData)
    return NextResponse.json({ slug, success: true })
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
