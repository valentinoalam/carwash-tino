import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer2/source-files'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

/** @type {import('contentlayer/source-files').ComputedFields<"Post">} */
const computedFields = {
  url: {
    type: "string",
    resolve: (post: { _raw: { flattenedPath: string; }; }) =>
      post._raw.flattenedPath.split("-").slice(1).join("-"),
  },
  slug: {
    type: "string",
    resolve: (doc: { _raw: { flattenedPath: string} } ) => 
      doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  slugAsParams: {
    type: "string",
    resolve: (doc: { _raw: { flattenedPath: string} } ) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  structuredData: {
    type: "json",
    resolve: (doc: {
      title: string
      publishedAt: string
      excerpt: string
      featuredImage?: string
      _raw: { flattenedPath: string} 
    }) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.excerpt,
      image: doc.featuredImage ? `${doc.featuredImage}` : 
        `/og?title=${encodeURIComponent(doc.title)}`,
      url: `${process.env.NEXT_PUBLIC_URL}/blog/${doc._raw.flattenedPath.split("/").slice(1).join("/")}`,
      // author: {
      //   "@type": "Person",
      //   name: "David Ilie",
      // },
    }),
  },
} as unknown as ComputedFields<"Post">; // <-- Important type assertion

export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: 'authors/**/*.mdx',
  fields: {
    id: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    avatar: {
      type: 'string',
      required: true,
    },
    bio: {
      type: 'string',
      required: false,
    },
  },
}))

export const BlogPost = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    id: {
      type: 'string',
      required: true,
    },
    title: {
      type: 'string',
      required: true,
    },
    publishedAt: {
      type: 'date',
      required: true,
    },
    excerpt: {
      type: 'string',
      required: true,
    },
    authorId: {
      type: 'string',
      required: true,
    },
    readTime: {
      type: 'number',
      required: true,
    },
    tags: { 
      type: 'list', 
      of: { type: 'string' }, 
      required: false 
    },
    categories: { 
      type: 'list', 
      of: { type: 'string' }, 
      required: false 
    },
    featuredImage: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    likes: {
      type: 'number',
      default: 0,
    },
    views: {
      type: 'number',
      default: 0,
    },
    published: {
      type: 'boolean',
      default: true,
    },
  },
  computedFields,
}))

export const BlogCategory = defineDocumentType(() => ({
  name: 'BlogCategory',
  filePathPattern: `categories/**/*.md`,
  fields: {
    id: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    color: {
      type: 'string',
      required: true,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content/posts',
  documentTypes: [Author, BlogPost, BlogCategory],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})
