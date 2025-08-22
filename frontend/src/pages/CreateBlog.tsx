 
"use client"

import { type ChangeEvent, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PenTool, FileText, Sparkles, Send, RotateCcw, Eye } from "lucide-react"
import { Backend_Url } from "@/config"
import axios from "axios"
import { useNavigate } from "react-router-dom"

type TypecreatePost = {
  title: string
  content: string
}

type InputProps = {
  type: "title" | "content"
  setInput: (input: (prevInput: { title: string; content: string }) => { title: string; content: string }) => void
  value: string
}

export const CreateBlog = () => {
    const navigate = useNavigate();
  const [input, setInput] = useState<TypecreatePost>({ title: "", content: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
            const id = localStorage.getItem('token');
        const localstrVariable = localStorage.getItem('token');
        if (!localstrVariable) {
            return console.error("Local Storage is Empty, no token found");
        }
        console.log("You are trying to create the blog");
        const response = await axios.post(`${Backend_Url}/api/v1/blog/`,{...input,userId:id}, {           
            headers: {
                'Content-Type': 'application/json'
            }
        });   
        navigate("/blog");
        console.log("The responce of the data is ",response)       
      setInput({ title: "", content: "" })
    } catch (err) {
      console.error("Error creating blog:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setInput({ title: "", content: "" })
    setShowPreview(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/50 to-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            
            Create Something Amazing
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Share Your Story</h1>
          <p className="font-sans text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your ideas into compelling content that resonates with your audience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="font-serif text-2xl text-foreground flex items-center gap-2">
                <PenTool className="h-6 w-6 text-primary" />
                Write Your Blog
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="font-sans text-sm font-medium text-foreground flex items-center gap-2"
                >
                  <FileText className="h-4 w-4 text-primary" />
                  Blog Title
                </Label>
                <InputBlog type="title" setInput={setInput} value={input.title} />
              </div>

              {/* Content Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="content"
                  className="font-sans text-sm font-medium text-foreground flex items-center gap-2"
                >
                  <FileText className="h-4 w-4 text-primary" />
                  Content
                </Label>
                <InputBlog type="content" setInput={setInput} value={input.content} />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={ handleSubmit}
                  disabled={isLoading || !input.title.trim() || !input.content.trim()}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Creating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Create Blog
                    </div>
                  )}
                </Button>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1 sm:flex-none border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bg-transparent"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="ghost"
                className="w-full text-primary hover:text-primary hover:bg-primary/10 font-medium"
              >
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card
            className={`shadow-xl border-0 bg-card/80 backdrop-blur-sm transition-all duration-500 ${showPreview ? "opacity-100 translate-y-0" : "opacity-50 translate-y-4"}`}
          >
            <CardHeader className="pb-6">
              <CardTitle className="font-serif text-2xl text-foreground flex items-center gap-2">
                <Eye className="h-6 w-6 text-secondary" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {input.title.trim() ? (
                <h2 className="font-serif text-2xl font-bold text-foreground leading-tight">{input.title}</h2>
              ) : (
                <div className="h-8 bg-muted rounded animate-pulse" />
              )}

              {input.content.trim() ? (
                <div className="font-sans text-foreground leading-relaxed whitespace-pre-wrap">{input.content}</div>
              ) : (
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                </div>
              )}

              {!input.title.trim() && !input.content.trim() && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="font-sans">Start writing to see your preview</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function InputBlog({ type, setInput, value }: InputProps) {
  const isContent = type === "content"

  return (
    <div className="relative group">
      {isContent ? (
        <Textarea
          id={type}
          value={value}
        //   @ts-ignore
          placeholder={`Write your ${type === "title" ? "compelling title" : "amazing content"} here...`}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setInput((prevInput) => ({ ...prevInput, [type]: e.target.value }))
          }}
          className="min-h-[200px] resize-none bg-input border-2 border-border focus:border-primary rounded-lg px-4 py-3 font-sans text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:border-primary/50"
        />
      ) : (
        <Input
          id={type}
          type="text"
          value={value}
          placeholder={`Enter your ${type === "title" ? "compelling title" : "content"} here...`}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInput((prevInput) => ({ ...prevInput, [type]: e.target.value }))
          }}
          className="bg-input border-2 border-border focus:border-primary rounded-lg px-4 py-3 font-sans text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:border-primary/50"
        />
      )}
    </div>
  )
}
