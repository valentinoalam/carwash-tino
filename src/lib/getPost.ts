import { notFound, redirect } from "next/navigation"
import { allPosts, Post } from "contentlayer/generated"

export function getPost(slug: string): Post {
	const post = allPosts.find((p) => p.slug === `/${slug}`);
	if (!post) notFound() // If post not found, show 404
	// If post exists but is not published, redirect to home
	if (!post.published) {
		redirect('/')
	}
	return post
}