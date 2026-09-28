"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  Code,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Save,
  X,
} from "lucide-react"

interface BlogPost {
  title: string
  description: string
  category: string
  tags: string[]
  featured: boolean
  image: string
  content: string
}

interface WysiwygEditorProps {
  initialPost?: Partial<BlogPost>
  onSave: (post: BlogPost) => void
  onCancel: () => void
}

export function WysiwygEditor({ initialPost, onSave, onCancel }: WysiwygEditorProps) {
  const [post, setPost] = useState<BlogPost>({
    title: initialPost?.title || "",
    description: initialPost?.description || "",
    category: initialPost?.category || "Car Care",
    tags: initialPost?.tags || [],
    featured: initialPost?.featured || false,
    image: initialPost?.image || "",
    content: initialPost?.content || "",
  })

  const [newTag, setNewTag] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const categories = ["Car Care", "Seasonal", "Detailing", "Protection", "Maintenance", "Tips"]

  const insertText = (before: string, after = "") => {
    const textarea = contentRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const newText = before + selectedText + after

    const newContent = textarea.value.substring(0, start) + newText + textarea.value.substring(end)

    setPost((prev) => ({ ...prev, content: newContent }))

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const addTag = () => {
    if (newTag.trim() && !post.tags.includes(newTag.trim())) {
      setPost((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.target === document.activeElement) {
      e.preventDefault()
      addTag()
    }
  }

  const formatContent = (content: string) => {
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic">$1</blockquote>')
      .replace(/^- (.*$)/gm, "<li>$1</li>")
      .replace(/^\d+\. (.*$)/gm, "<li>$1</li>")
      .replace(/\n/g, "<br>")
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{initialPost ? "Edit Blog Post" : "Create New Blog Post"}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsPreview(!isPreview)} className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>{isPreview ? "Edit" : "Preview"}</span>
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex items-center space-x-2 bg-transparent">
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </Button>
          <Button onClick={() => onSave(post)} className="flex items-center space-x-2 bg-[#309be8] hover:bg-blue-700">
            <Save className="h-4 w-4" />
            <span>Save Post</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={post.title}
                  onChange={(e) => setPost((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter post title..."
                  className="text-lg font-medium"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={post.description}
                  onChange={(e) => setPost((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the post..."
                  rows={3}
                />
              </div>

              {!isPreview && (
                <>
                  {/* Toolbar */}
                  <div className="border rounded-lg p-2">
                    <div className="flex flex-wrap gap-1">
                      <Button variant="ghost" size="sm" onClick={() => insertText("# ", "")} title="Heading 1">
                        <Heading1 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => insertText("## ", "")} title="Heading 2">
                        <Heading2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => insertText("### ", "")} title="Heading 3">
                        <Heading3 className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-6 bg-gray-300 mx-1" />
                      <Button variant="ghost" size="sm" onClick={() => insertText("**", "**")} title="Bold">
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => insertText("*", "*")} title="Italic">
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => insertText("`", "`")} title="Code">
                        <Code className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-6 bg-gray-300 mx-1" />
                      <Button variant="ghost" size="sm" onClick={() => insertText("- ", "")} title="Bullet List">
                        <List className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => insertText("1. ", "")} title="Numbered List">
                        <ListOrdered className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => insertText("> ", "")} title="Quote">
                        <Quote className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-6 bg-gray-300 mx-1" />
                      <Button variant="ghost" size="sm" onClick={() => insertText("[Link Text](", ")")} title="Link">
                        <Link className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => insertText("![Alt Text](", ")")} title="Image">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="content">Content (Markdown)</Label>
                    <Textarea
                      ref={contentRef}
                      id="content"
                      value={post.content}
                      onChange={(e) => setPost((prev) => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your blog post content here using Markdown..."
                      rows={20}
                      className="font-mono text-sm"
                    />
                  </div>
                </>
              )}

              {isPreview && (
                <div>
                  <Label>Preview</Label>
                  <div className="border rounded-lg p-6 bg-white min-h-96">
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <p className="text-gray-600 mb-6">{post.description}</p>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={post.category}
                  onValueChange={(value) => setPost((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="image">Featured Image URL</Label>
                <Input
                  id="image"
                  value={post.image}
                  onChange={(e) => setPost((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="/path/to/image.jpg"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={post.featured}
                  onChange={(e) => setPost((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="featured">Featured Post</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add tag..."
                  className="flex-1"
                />
                <Button onClick={addTag} size="sm">
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                    <span>{tag}</span>
                    <button onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
