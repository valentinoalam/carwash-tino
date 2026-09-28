import { Suspense } from "react"
import type { Metadata } from "next"
import { allAuthors, allPosts } from "contentlayer/generated";
import { getImage } from "@/lib/getImage"
import { getPost } from "@/lib/getPost"
import { MDX } from "@/components/MDX"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Define proper props type that matches PageProps
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps):  Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  const author = allAuthors.find(author => author.id === post.authorId)
  const { title, description } = post
  const ogImage = post.featuredImage || getImage(post);
  return {
    title: `${title} | Shine Carwash Blog`,
    description,
    openGraph: {
      title,
      description,
	    images: [ogImage],
      type: "article",
	    publishedTime: post.publishedAt,
      authors: [author?.name || "tino"],
      url: `${process.env.NEXT_PUBLIC_URL}/post/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@tonyfranky",
      title,
      description,
	    images: [ogImage],
    },
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_URL}/post/${slug}`,
	},
  }
}

const formatter = new Intl.DateTimeFormat(undefined, {
	year: "numeric",
	month: "long",
	day: "numeric",
})

interface MetadataProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

async function page({ params }: MetadataProps) {
  const { slug } = await params;
  const post = getPost(slug);

	return (
		<main className="mx-auto container mb-4 px-4 py-8">
			<header className="relative top-0 -z-10 max-w-5/6 mx-auto space-y-4 py-12">
        <div className="flex items-center justify-center">
          <Link href="/blog" className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
        </div>
				<Suspense
					fallback={<Skeleton className="aspect-video justify-center" />}
				>
					<Image
						width={800}
						height={200}
						src={getImage(post)}
						alt={post.title}
						className="rounded-lg place-self-center w-full md:max-w-3/4"
					/>
				</Suspense>
				<h1 className="text-5xl font-bold">{post.title}</h1>
				<p className="text-opacity-70">{post.description}</p>
				<p className="text-sm">{formatter.format(new Date(post.publishedAt))}</p>
				
			</header>
			<div className="grid items-start gap-8 bg-white py-12 dark:bg-slate-950 md:grid-cols-7">

				<article className="px-5 prose col-span-5 dark:prose-invert">
					<MDX code={post.body.code} />
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">Share this post</h2>
            <div className="flex items-center justify-center gap-4">
              <a href={`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_URL}/post/${slug}`)}&via=tonyfranky`} target="_blank" rel="noopener noreferrer">
                <Image src="/twitter.svg" alt="Twitter" width={32} height={32} />
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_URL}/post/${slug}`)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.description!)}&source=${encodeURIComponent(`${process.env.NEXT_PUBLIC_URL}/post/${slug}`)}`} target="_blank" rel="noopener noreferrer">
                <Image src="/linkedin.svg" alt="LinkedIn" width={32} height={32} />
              </a>
              <a href={`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX${encodeURIComponent(`${process.env.NEXT_PUBLIC_URL}/post/${slug}`)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
                <Image src="/facebook.svg" alt="Facebook" width={32} height={32} />
              </a>
            </div>
          </div>
				</article>
				{/* <AboutMe className="sticky top-8 col-span-2" /> */}
			</div>
		</main>
	)
}

export default page
