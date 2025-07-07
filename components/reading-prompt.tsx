"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import type { TarotCard, TarotSpread } from "@/types/tarot"
import { Sparkles, ArrowLeft, ArrowRight, Lightbulb } from "lucide-react"

interface ReadingPromptProps {
  cards: TarotCard[]
  spread: TarotSpread
  onSubmit: (prompt: string) => void
  onBack: () => void
}

const promptSuggestions = [
  "I'm facing a difficult decision in my career and need guidance on which path to take.",
  "I want to understand the dynamics in my current relationship and how to improve it.",
  "I'm going through a period of personal transformation and need insight into my spiritual journey.",
  "I'm struggling with self-doubt and need clarity on my strengths and potential.",
  "I want to understand what obstacles are blocking my progress and how to overcome them.",
  "I'm seeking guidance on a creative project or artistic endeavor I'm considering.",
  "I need insight into my family relationships and how to heal old wounds.",
  "I'm contemplating a major life change and want to understand the potential outcomes.",
]

export default function ReadingPrompt({ cards, spread, onSubmit, onBack }: ReadingPromptProps) {
  const [prompt, setPrompt] = useState("")
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null)

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt.trim())
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion)
    setSelectedSuggestion(suggestion)
  }

  const getSuitColor = (suit: string) => {
    switch (suit) {
      case "Major Arcana":
        return "from-purple-600 to-indigo-700"
      case "Cups":
        return "from-blue-600 to-indigo-700"
      case "Wands":
        return "from-purple-700 to-pink-700"
      case "Swords":
        return "from-slate-600 to-purple-700"
      case "Pentacles":
        return "from-indigo-600 to-purple-700"
      default:
        return "from-purple-600 to-indigo-700"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="w-80 h-80 border-8 border-purple-500 rounded-full" />
          <div className="absolute w-64 h-64 border-4 border-yellow-400 rounded-full rotate-45" />
        </div>
        <h2 className="relative text-4xl font-bold text-purple-200 mb-3 font-serif tracking-widest">
          SET YOUR INTENTION
        </h2>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent h-px top-1/2" />
          <p className="relative text-lg text-purple-300 mb-6 bg-slate-900/50 px-8 py-2 inline-block tracking-wide">
            Share your question or situation for a personalized AI-powered reading
          </p>
        </div>
      </div>

      {/* Selected Cards Summary */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 backdrop-blur-sm border-2 border-purple-500/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500" />
        <CardHeader className="relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/10 to-transparent" />
          <CardTitle className="text-purple-200 flex items-center gap-3 font-serif tracking-wider">
            <div className="p-2 border-2 border-yellow-400/50 rounded-full">
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            YOUR SACRED CARDS
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-800/30 to-indigo-800/30 rounded-lg border border-purple-500/30"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${getSuitColor(card.suit)} rounded-lg flex items-center justify-center border border-yellow-400/20`}
                >
                  <div className="text-white text-xs font-bold text-center">
                    {card.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-purple-200 tracking-wide">
                    {spread.positions[index].name.toUpperCase()}
                  </div>
                  <div className="text-xs text-purple-300 mb-1">{card.name}</div>
                  <div className="text-xs text-purple-400">
                    {card.suit} • {card.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prompt Input */}
      <Card className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 backdrop-blur-sm border-2 border-purple-400/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,215,0,0.03)_48%,rgba(255,215,0,0.03)_52%,transparent_52%)] bg-[length:30px_30px]" />
        <CardHeader className="relative">
          <CardTitle className="text-purple-200 flex items-center gap-3 font-serif tracking-wider">
            <div className="p-2 border-2 border-yellow-400/50 rounded-full">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
            </div>
            SHARE YOUR QUESTION OR SITUATION
          </CardTitle>
          <p className="text-purple-300 leading-relaxed">
            The more specific and heartfelt your question, the more insightful your AI-powered reading will be. Share
            what's truly on your mind and heart.
          </p>
        </CardHeader>
        <CardContent className="relative space-y-6">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your situation, question, or what guidance you're seeking. For example: 'I'm at a crossroads in my career and feeling uncertain about whether to take a new job opportunity or stay in my current position. I want to understand what the universe is trying to tell me about my path forward...'"
            className="min-h-32 bg-slate-800/50 border-purple-500/30 text-purple-200 placeholder:text-purple-400 resize-none focus:border-yellow-400/50 focus:ring-yellow-400/20"
            rows={6}
          />

          <div className="flex justify-between items-center">
            <div className="text-sm text-purple-400">{prompt.length} characters</div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onBack}
                className="border-purple-400/50 text-purple-200 hover:bg-purple-900/30 bg-slate-900/50 font-semibold tracking-wide"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO CARDS
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!prompt.trim()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold tracking-widest border border-yellow-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                GENERATE READING
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prompt Suggestions */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 backdrop-blur-sm border-2 border-purple-500/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500" />
        <CardHeader className="relative">
          <CardTitle className="text-purple-200 font-serif tracking-wider text-lg">
            NEED INSPIRATION? TRY THESE PROMPTS
          </CardTitle>
          <p className="text-purple-300 text-sm">
            Click any suggestion to use it as your prompt, or use them as inspiration for your own question.
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid gap-3">
            {promptSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`text-left p-4 rounded-lg border transition-all duration-300 hover:border-yellow-400/50 hover:bg-purple-800/30 ${
                  selectedSuggestion === suggestion
                    ? "border-yellow-400/50 bg-purple-800/30"
                    : "border-purple-500/30 bg-purple-900/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Badge className="bg-purple-700/50 text-purple-200 border border-purple-500/50 text-xs font-bold">
                    {index + 1}
                  </Badge>
                  <p className="text-sm text-purple-300 leading-relaxed flex-1">{suggestion}</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
