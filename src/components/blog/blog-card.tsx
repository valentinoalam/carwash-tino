"use client"

import { Calendar, Clock, Eye, Heart, Tag } from "lucide-react"
import type { Post as BlogPostType } from "contentlayer/generated"
import { allAuthors } from "contentlayer/generated"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { categories } from "@/data/blogPosts"
import Image from "next/image"

interface BlogCardProps {
  post: BlogPostType
  onReadMore: (slug: string) => void
}

export function BlogCard({ post, onReadMore }: BlogCardProps) {
  const category = categories.find((cat) => post.categories?.includes(cat.id))
  const author = allAuthors.find((a) => a.id === post.authorId)

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Image
          src={post.featuredImage || "/placeholder.svg"}
          alt={post.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${category?.color} text-white`}>{category?.name}</Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {post.readTime} min read
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src={author?.avatar || "/placeholder.svg"}
              alt={author?.name || "Author"}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">{author?.name || "Unknown Author"}</span>
          </div>

          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {post.likes}
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {post.views}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6">
        <div className="w-full">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          <Button 
            onClick={() => onReadMore(post.slug || post._raw.flattenedPath.replace('posts/', ''))} 
            className="w-full group-hover:bg-[#309be8] transition-colors"
          >
            Read More
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}