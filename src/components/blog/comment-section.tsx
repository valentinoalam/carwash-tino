"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react"
import { Heart, Reply, Send } from "lucide-react"
import type { Comment } from "@/types/blog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface CommentSectionProps {
  comments: Comment[]
  postId: string
}

export function CommentSection({ comments, postId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // In a real app, this would send to an API
      console.log("New comment:", newComment)
      setNewComment("")
    }
  }

  const handleSubmitReply = (commentId: string) => {
    if (replyContent.trim()) {
      // In a real app, this would send to an API
      console.log("New reply to", commentId, ":", replyContent)
      setReplyContent("")
      setReplyingTo(null)
    }
  }

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <Card className={`${isReply ? "ml-8 mt-3" : "mb-6"}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Image
            src={comment.author.avatar || "/placeholder.svg"}
            alt={comment.author.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-sm">{comment.author.name}</span>
              <span className="text-gray-500 text-xs">{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>

            <p className="text-gray-800 mb-3">{comment.content}</p>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                <Heart className="w-4 h-4 mr-1" />
                {comment.likes}
              </Button>

              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-blue-500"
                  onClick={() => setReplyingTo(comment.id)}
                >
                  <Reply className="w-4 h-4 mr-1" />
                  Reply
                </Button>
              )}
            </div>

            {replyingTo === comment.id && (
              <div className="mt-4">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="mb-2"
                />
                <div className="flex space-x-2">
                  <Button onClick={() => handleSubmitReply(comment.id)} size="sm">
                    <Send className="w-4 h-4 mr-1" />
                    Reply
                  </Button>
                  <Button onClick={() => setReplyingTo(null)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {comment.replies &&
          comment.replies.map((reply) => <CommentItem key={reply.id} comment={reply} isReply={true} />)}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>

      <Card>
        <CardContent className="p-6">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="mb-4"
            rows={4}
          />
          <Button onClick={handleSubmitComment} className="w-full md:w-auto">
            <Send className="w-4 h-4 mr-2" />
            Post Comment
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
