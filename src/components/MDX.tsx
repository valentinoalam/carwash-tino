/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import Image from "next/image"
import { useMDXComponent } from "next-contentlayer2/hooks"
import type { MDXComponents } from 'mdx/types'

import { cn } from "@/lib/utils"



// TODO: Config this and use it instead of `@tailwindcss/typography`

// A list of all HTML elements we want to style with Tailwind.
const elementStyles = {
  h1: "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
  h2: "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
  h6: "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
  a: "font-medium underline underline-offset-4",
  p: "leading-7 [&:not(:first-child)]",
  ul: "my-6 list-disc [&>li]:mt-2",
  ol: "my-6 list-decimal [&>li]:mt-2",
  li: "mt-2",
  blockquote: "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
  hr: "my-4 md:my-8",
  table: "my-6 w-full overflow-y-auto",
  tr: "m-0 border-t p-0 even:bg-muted",
  th: "border px-4 py-2 text-left font-bold [&[align=left]]:text-left [&[align=right]]:text-right",
  td: "border px-4 py-2 text-left [&[align=left]]:text-left [&[align=right]]:text-right",
  code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  pre: "my-6 overflow-x-auto rounded-lg border bg-muted p-4",
}

// A custom component for images to use the Next.js <Image> component
const MdxImage = ({ src, alt, width, height, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <Image
    src={src as string}
    alt={alt as string}
    width={typeof width === 'string' ? parseInt(width) : width || 1200}
    height={typeof height === 'string' ? parseInt(height) : height || 630}
    className="rounded-md border"
    {...props}
  />
)

// The components object to pass to the MDX provider
const components: MDXComponents = Object.keys(elementStyles).reduce((acc: any, tag: string) => {
  const customComponent = tag === "img" ? MdxImage : (props: any) =>
    React.createElement(tag, {
      className: cn(elementStyles[tag as keyof typeof elementStyles], props.className),
      ...props,
    })
  
  return {
    ...acc,
    [tag]: customComponent,
  }
}, {})

interface MdxProps {
	code: string
}

export function MDX({ code }: MdxProps) {
	const Component = useMDXComponent(code)

	return <Component components={components as any} />
}
