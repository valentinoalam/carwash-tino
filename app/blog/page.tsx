"use client"

import { useState, useMemo } from "react"
import { BlogHeader } from "@/components/blog/blog-header"
import { CategoryFilter } from "@/components/blog/category-filter"
import { BlogCard } from "@/components/blog/blog-card"
import { categories } from "@/data/blogPosts"
import { useRouter } from "next/navigation"
import { allPosts } from "contentlayer/generated"
import type { Post as BlogPost } from "contentlayer/generated"

// interface BlogPost {
//   id: string
//   title: string
//   slug: string
//   excerpt: string
//   content: string
//   featuredImage: string
//   publishedAt: string
//   readTime: number
//   views: number
//   likes: number
//   categories: string[]
//   tags: string[]
//   author: {
//     id: string
//     name: string
//     avatar: string
//     bio: string
//   }
// }

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const posts: BlogPost[] = allPosts.filter(post => post.published)

  const router = useRouter()
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === null || post.categories?.includes(selectedCategory)

      return matchesSearch && matchesCategory
    })
  }, [posts, searchQuery, selectedCategory])

  const handleReadMore = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50">
  //       <BlogHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
  //       <main className="container mx-auto px-4 py-8">
  //         <div className="text-center py-12">
  //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
  //           <p className="mt-4 text-gray-600">Loading articles...</p>
  //         </div>
  //       </main>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Car Care Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert tips, professional techniques, and insider knowledge to keep your vehicle looking its absolute best.
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
            {selectedCategory && (
              <span className="ml-2">
                in <strong>{categories.find((cat) => cat.id === selectedCategory)?.name}</strong>
              </span>
            )}
            {searchQuery && (
              <span className="ml-2">
                for <strong>&quot;{searchQuery}&quot;</strong>
              </span>
            )}
          </p>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                onReadMore={() => handleReadMore(post.slug || post._raw.flattenedPath.replace('posts/', ''))} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category filter to find what you&apos;re looking for.
            </p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest car care tips, seasonal advice, and exclusive offers delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}