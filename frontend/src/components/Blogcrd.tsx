"use client"

import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock, User, ArrowRight, Bookmark, Share2, Heart } from "lucide-react"
import {  Link, useNavigate  } from 'react-router-dom';
interface BlogCardProps {
  id: number
  authorId: number
  authorname: string
  title: string
  content: string
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

function getAuthorInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function Blogcrd({ id, authorId, authorname, title, content }: BlogCardProps) {
const navigate = useNavigate()
  const readingTime = calculateReadingTime(content)
  const authorInitials = getAuthorInitials(authorname)

  const handleCardClick = () => {
    navigate(`/blog/${id}`)
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Bookmark functionality would go here
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Share functionality would go here
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Like functionality would go here
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/80 to-background rounded-lg opacity-60 group-hover:opacity-80 transition-all duration-700"></div>

      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 via-purple-500/50 to-primary/50 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>

      <Card
        className="relative hover:shadow-xl transition-all duration-300 border border-border/40 hover:border-primary/20 bg-card/90 backdrop-blur-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        onClick={handleCardClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 ring-2 ring-background group-hover:ring-primary/20 transition-all">
                <AvatarFallback className="text-xs font-semibold bg-gradient-to-br from-primary/10 to-primary/5 text-primary">
                  {authorInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                <span className="font-medium group-hover:text-foreground transition-colors">{authorname}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10" onClick={handleBookmark}>
                <Bookmark className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10" onClick={handleShare}>
                <Share2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-500"
                onClick={handleLike}
              >
                <Heart className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
            {title}
          </h3>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
            {content.length > 150 ? content.slice(0, 150) + "..." : content}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-medium">{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-primary/70 group-hover:text-primary transition-colors">
              <span className="font-medium">Read more</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
