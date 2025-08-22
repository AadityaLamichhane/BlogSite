import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, User, BookOpen,  Share2, Bookmark, ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"

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

function formatContent(content: string): string {
  // Create a preview that's engaging but not too long
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const preview = sentences.slice(0, 3).join('. ').trim()
  return preview.length > 200 ? preview.substring(0, 197) + '...' : preview + (sentences.length > 3 ? '...' : '')
}

function formatFullContent(content: string): JSX.Element[] {
  // Split content into paragraphs and format them nicely
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0)
  
  return paragraphs.map((paragraph, index) => {
    // Check if it's a heading (starts with # or is in ALL CAPS and short)
    if (paragraph.startsWith('#') || (paragraph.length < 100 && paragraph === paragraph.toUpperCase() && paragraph.split(' ').length < 10)) {
      return (
        <h2 key={index} className="text-xl font-bold text-foreground mt-6 mb-3 first:mt-0">
          {paragraph.replace(/^#+\s*/, '')}
        </h2>
      )
    }
    
    // Check if it's a list item
    // if (paragraph.startsWith('- ') || paragraph.startsWith('• ') || /^\d+\./.test(paragraph)) {
    //   const items = paragraph.split('\n').filter(item => item.trim().length > 0)
    //   return (
    //     <ul key={index} className="space-y-2 my-4 ml-4">
    //       {items.map((item, itemIndex) => (
    //         <li key={itemIndex} className="text-muted-foreground leading-relaxed list-disc">
    //           {item.replace(/^[-•]\s*|\d+\.\s*/, '')}
    //         </li>
    //       ))}
    //     </ul>
    //   )
    // }
    
    // Regular paragraph
    return (
      <p key={index} className="text-muted-foreground leading-relaxed mb-4 text-justify">
        {paragraph}
      </p>
    )
  })
}

export function DetailBlog({ id, authorname, title, content }: BlogCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const readingTime = calculateReadingTime(content)
  const authorInitials = getAuthorInitials(authorname)
  const formattedContent = formatContent(content)
  const wordCount = content.trim().split(/\s+/).length

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-border bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-4 relative">

        
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-background shadow-sm">
              <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700">
                {authorInitials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-medium text-foreground">{authorname}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  <span>{wordCount.toLocaleString()} words</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
              <Bookmark className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
            </button>
            <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
              <Share2 className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          
          {/* Reading difficulty indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${
                    i < Math.min(Math.ceil(readingTime / 2), 5)
                      ? 'bg-green-500'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {readingTime <= 2 ? 'Quick read' : readingTime <= 5 ? 'Medium read' : 'Long read'}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-6">
        <div className="space-y-4">
          {/* Content - either preview or full */}
          <div className="relative">
            {isExpanded ? (
              <div className="max-w-none">
                {formatFullContent(content)}
              </div>
            ) : (
              <>
                <p className="text-muted-foreground leading-relaxed text-sm line-height-loose">
                  {formattedContent}
                </p>
                {/* Subtle fade effect at the end */}
                <div className="absolute bottom-0 right-0 w-8 h-6 bg-gradient-to-l from-card to-transparent pointer-events-none"></div>
              </>
            )}
          </div>

          {/* Expand/Collapse button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={toggleExpanded}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 rounded-md transition-all duration-200 group/btn"
            >
              {isExpanded ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
                </>
              ) : (
                <>
                  <span>Read full article</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover/btn:translate-y-0.5" />
                </>
              )}
            </button>
          </div>

          {/* Enhanced engagement section */}
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <div className="flex items-center gap-4">
              {/* Reading time and word count */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{readingTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>{wordCount.toLocaleString()} words</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Blog ID with better styling */}
              <div className="px-2 py-1 bg-muted/50 rounded-md">
                <span className="text-xs font-mono text-muted-foreground">#{id.toString().padStart(3, '0')}</span>
              </div>
              
              {/* Status indicator */}
              <div className={`text-xs font-medium transition-all duration-200 ${
                isExpanded ? 'text-green-600' : 'text-primary hover:underline cursor-pointer'
              }`}>
                {isExpanded ? '✓ Reading' : 'Preview'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}