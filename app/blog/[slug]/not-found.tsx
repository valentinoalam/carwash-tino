import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <FileX className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Article Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the article you&apos;re looking for. It may have been moved or deleted.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/blog">
            <Button className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
