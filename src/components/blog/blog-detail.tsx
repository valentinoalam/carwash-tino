"use client"

import { Calendar, Clock, Eye, Heart, ArrowLeft, Share2, Bookmark } from "lucide-react"
import { allAuthors } from "contentlayer/generated"
import type { Post as BlogPostType } from "contentlayer/generated"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/data/blogPosts"
import { CommentSection } from "./comment-section"
import { commentsData } from "@/data/comments"
import Image from "next/image"
import { useMDXComponent } from "next-contentlayer2/hooks"

interface BlogDetailProps {
  post: BlogPostType
  onBack: () => void
}

export function BlogDetail({ post, onBack }: BlogDetailProps) {
  const category = categories.find((cat) => cat.id === post.categories![0])
  const comments = commentsData[post.id] || []
  
  // Find the author data
  const author = allAuthors.find((author) => author.id === post.authorId)
  
  // Use MDX component for rendering content
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <div className="max-w-4xl mx-auto">
      <Button onClick={onBack} variant="ghost" className="mb-6 hover:bg-gray-100">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Articles
      </Button>

      <Card className="overflow-hidden">
        <div className="relative">
          <Image
            src={post.featuredImage || "/placeholder.svg"}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute top-6 left-6">
            <Badge className={`${category?.color} text-white`}>{category?.name}</Badge>
          </div>
        </div>

        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime} min read
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {post.views} views
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {post.likes} likes
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{post.title}</h1>

          <div className="flex items-center space-x-4 mb-8 pb-6 border-b">
            <Image
              src={author?.avatar || "/placeholder.svg"}
              alt={author?.name || "Author"}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{author?.name || "Unknown Author"}</p>
              <p className="text-gray-600 text-sm">{author?.bio || ""}</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed">
              <MDXContent />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
            {post.tags!.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-12">
        <CommentSection comments={comments} postId={post.id} />
      </div>
    </div>
  )
}