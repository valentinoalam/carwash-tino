import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface MDXPost {
  slug: string
  frontmatter: {
    title: string
    description: string
    publishedAt: string
    author: string
    category: string
    tags: string[]
    featured: boolean
    image: string
    readTime: string
  }
  content: string
}

export async function getAllPosts(): Promise<MDXPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        frontmatter: data as MDXPost["frontmatter"],
        content,
      }
    })

  return allPostsData.sort((a, b) => {
    return new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime()
  })
}

export async function getPostBySlug(slug: string): Promise<MDXPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      frontmatter: data as MDXPost["frontmatter"],
      content,
    }
  } catch {
    return null
  }
}

export async function createPost(postData: {
  title: string
  description: string
  category: string
  tags: string[]
  featured: boolean
  image: string
  content: string
}): Promise<string> {
  const slug = postData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  const frontmatter = {
    title: postData.title,
    description: postData.description,
    publishedAt: new Date().toISOString().split("T")[0],
    author: "Admin",
    category: postData.category,
    tags: postData.tags,
    featured: postData.featured,
    image: postData.image,
    readTime: `${Math.ceil(postData.content.length / 200)} min read`,
  }

  const mdxContent = `---
title: "${frontmatter.title}"
description: "${frontmatter.description}"
publishedAt: "${frontmatter.publishedAt}"
author: "${frontmatter.author}"
category: "${frontmatter.category}"
tags: [${frontmatter.tags.map((tag) => `"${tag}"`).join(", ")}]
featured: ${frontmatter.featured}
image: "${frontmatter.image}"
readTime: "${frontmatter.readTime}"
---

${postData.content}
`

  const filePath = path.join(postsDirectory, `${slug}.mdx`)

  // Ensure directory exists
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }

  fs.writeFileSync(filePath, mdxContent)
  return slug
}

export async function updatePost(
  slug: string,
  postData: {
    title: string
    description: string
    category: string
    tags: string[]
    featured: boolean
    image: string
    content: string
  },
): Promise<void> {
  const frontmatter = {
    title: postData.title,
    description: postData.description,
    publishedAt: new Date().toISOString().split("T")[0],
    author: "Admin",
    category: postData.category,
    tags: postData.tags,
    featured: postData.featured,
    image: postData.image,
    readTime: `${Math.ceil(postData.content.length / 200)} min read`,
  }

  const mdxContent = `---
title: "${frontmatter.title}"
description: "${frontmatter.description}"
publishedAt: "${frontmatter.publishedAt}"
author: "${frontmatter.author}"
category: "${frontmatter.category}"
tags: [${frontmatter.tags.map((tag) => `"${tag}"`).join(", ")}]
featured: ${frontmatter.featured}
image: "${frontmatter.image}"
readTime: "${frontmatter.readTime}"
---

${postData.content}
`

  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  fs.writeFileSync(filePath, mdxContent)
}

export async function deletePost(slug: string): Promise<void> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}
