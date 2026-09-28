export interface Author {
  id?: string
  name: string
  avatar: string
  bio?: string
}
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  publishedAt: string;
  readTime: number;
  categories: string[];
  tags: string[];
  featuredImage: string;
  likes: number;
  views: number;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}
