import { type NextRequest, NextResponse } from "next/server"
import { requireAdminAuth } from "@/lib/auth"
import { updatePost, deletePost,  } from "@/lib/mdx"


export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdminAuth()
    const { slug } = await params;
    const postData = await request.json()
    await updatePost(slug, postData)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdminAuth()
    const { slug } = await params;
    await deletePost(slug)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
