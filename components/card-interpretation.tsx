"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { TarotCard, TarotSpread } from "@/types/tarot"
import { Sparkles, BookOpen, Brain, Eye, ArrowLeft, RotateCcw, Key, AlertCircle } from "lucide-react"

interface CardInterpretationProps {
  cards: TarotCard[]
  spread: TarotSpread
  interpretationStyle: string
  userPrompt: string
  onNewReading: () => void
  onBackToSelection: () => void
}

interface AIReading {
  overallReading: string
  cardInterpretations: {
    [key: number]: {
      meaning: string
      advice: string
      symbolism: string
    }
  }
  keyInsights: string[]
  actionSteps: string[]
}

// Custom error type for API key errors
class APIKeyError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "APIKeyError"
  }
}

export default function CardInterpretation({
  cards,
  spread,
  interpretationStyle,
  userPrompt,
  onNewReading,
  onBackToSelection,
}: CardInterpretationProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0)
  const [aiReading, setAiReading] = useState<AIReading | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [isApiKeyError, setIsApiKeyError] = useState(false)

  useEffect(() => {
    generateReading()
  }, [])

  const generateReading = async (providedApiKey?: string) => {
    setIsLoading(true)
    setError(null)
    setIsApiKeyError(false)

    try {
      console.log("Sending request to generate reading...")

      const res = await fetch("/api/generate-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cards,
          spread,
          userPrompt,
          interpretationStyle,
          apiKey: providedApiKey,
        }),
      })

      console.log("Response status:", res.status)
      console.log("Response ok:", res.ok)

      // Check if response is JSON
      const contentType = res.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text()
        console.error("Non-JSON response received:", text)
        throw new Error("Server returned an invalid response. Please try again.")
      }

      const data = await res.json()
      console.log("Response data:", data)

      if (!data.ok) {
        if (res.status === 400) {
          const err = new APIKeyError(data.message || "API key error")
          throw err
        }
        throw new Error(data.message || "Unknown error occurred")
      }

      setAiReading(data.reading)
      setShowApiKeyInput(false)
    } catch (err) {
      console.error("Error generating reading:", err)

      if (err instanceof Error && err.name === "APIKeyError") {
        setIsApiKeyError(true)
        setError(err.message)
        setShowApiKeyInput(true)
      } else {
        let errorMessage = "Failed to generate reading. Please try again."

        if (err instanceof Error) {
          if (err.message.includes("JSON") || err.message.includes("invalid response")) {
            errorMessage = "Server error. Please try again in a moment."
          } else if (err.message.includes("network") || err.message.includes("fetch")) {
            errorMessage = "Network error. Please check your connection and try again."
          } else if (err.message.includes("quota") || err.message.includes("limit")) {
            errorMessage = "API quota exceeded. Please try again later or check your API key limits."
          } else {
            errorMessage = err.message
          }
        }

        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      generateReading(apiKey.trim())
    }
  }

  const getSuitColor = (suit: string) => {
    switch (suit) {
      case "Major Arcana":
        return "from-purple-500 to-indigo-600"
      case "Cups":
        return "from-blue-500 to-cyan-600"
      case "Wands":
        return "from-red-500 to-orange-600"
      case "Swords":
        return "from-gray-500 to-slate-600"
      case "Pentacles":
        return "from-green-500 to-emerald-600"
      default:
        return "from-amber-500 to-orange-600"
    }
  }

  const getStyleIcon = (style: string) => {
    switch (style) {
      case "traditional":
        return BookOpen
      case "intuitive":
        return Eye
      case "psychological":
        return Brain
      case "mystical":
        return Sparkles
      default:
        return BookOpen
    }
  }

  const StyleIcon = getStyleIcon(interpretationStyle)

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-black/90 to-yellow-900/20 backdrop-blur-sm border-2 border-yellow-600/30">
            <CardContent className="p-12">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-yellow-600 rounded-full animate-spin" />
                  <div className="absolute inset-0 w-16 h-16 border-4 border-yellow-400 rounded-full animate-ping opacity-20" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-yellow-200 mb-2 font-serif tracking-wider">
                    CHANNELING COSMIC WISDOM
                  </h3>
                  <p className="text-yellow-300 leading-relaxed">
                    The AI oracle is interpreting your cards and weaving together the threads of destiny...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-black/90 to-red-900/20 backdrop-blur-sm border-2 border-red-500/30">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {isApiKeyError ? (
                    <Key className="w-12 h-12 text-yellow-400" />
                  ) : (
                    <AlertCircle className="w-12 h-12 text-red-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-yellow-200 mb-4 font-serif tracking-wider">
                  {isApiKeyError ? "API KEY REQUIRED" : "COSMIC INTERFERENCE"}
                </h3>
                <div className="text-yellow-300 mb-6 whitespace-pre-line leading-relaxed">{error}</div>

                {showApiKeyInput && (
                  <div className="space-y-4 mb-6">
                    <div className="text-left max-w-md mx-auto">
                      <Label htmlFor="apiKey" className="text-yellow-200 font-semibold tracking-wide">
                        Enter your OpenAI API Key:
                      </Label>
                      <Input
                        id="apiKey"
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-..."
                        className="mt-2 bg-black/50 border-yellow-600/50 text-yellow-200 placeholder:text-yellow-400/50"
                        onKeyPress={(e) => e.key === "Enter" && handleApiKeySubmit()}
                      />
                    </div>
                    <Button
                      onClick={handleApiKeySubmit}
                      disabled={!apiKey.trim()}
                      className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-bold tracking-widest"
                    >
                      <Key className="w-4 h-4 mr-2" />
                      USE THIS KEY
                    </Button>
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => generateReading()}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-bold tracking-widest"
                  >
                    TRY AGAIN
                  </Button>
                  {!showApiKeyInput && isApiKeyError && (
                    <Button
                      onClick={() => setShowApiKeyInput(true)}
                      variant="outline"
                      className="border-yellow-600/50 text-yellow-200 hover:bg-yellow-900/30 bg-black/50 font-semibold tracking-wide"
                    >
                      <Key className="w-4 h-4 mr-2" />
                      ENTER API KEY
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="w-80 h-80 border-8 border-yellow-600 rounded-full" />
          <div className="absolute w-64 h-64 border-4 border-yellow-500 rounded-full rotate-45" />
        </div>
        <h2 className="relative text-4xl font-bold text-yellow-200 mb-3 font-serif tracking-widest">
          YOUR MYSTICAL READING
        </h2>
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent h-px top-1/2" />
          <p className="relative text-lg text-yellow-300 bg-black/80 px-8 py-2 inline-block tracking-wide border border-yellow-600/30">
            {spread.name.toUpperCase()} • AI-POWERED INTERPRETATION
          </p>
        </div>
        <div className="flex justify-center gap-6">
          <Button
            variant="outline"
            onClick={onBackToSelection}
            className="border-yellow-600/50 text-yellow-200 hover:bg-yellow-900/30 bg-black/50 font-semibold tracking-wide px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            RETURN TO SELECTION
          </Button>
          <Button
            onClick={onNewReading}
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-bold tracking-widest border border-yellow-400/50 px-6 py-3"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            NEW READING
          </Button>
        </div>
      </div>

      {/* AI-Generated Overall Reading */}
      <Card className="bg-gradient-to-br from-black/90 to-yellow-900/20 border-2 border-yellow-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,165,32,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600" />
        <CardHeader className="relative">
          <div className="text-center mb-4">
            <div className="inline-block p-4 border-2 border-yellow-600/50 rounded-full mb-4 bg-black/50">
              <Sparkles className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <CardTitle className="text-yellow-200 flex items-center justify-center gap-3 font-serif tracking-wider text-2xl">
            THE COSMIC REVELATION
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="prose prose-yellow max-w-none">
            <p className="text-yellow-200 leading-relaxed text-lg whitespace-pre-line">{aiReading?.overallReading}</p>
          </div>
        </CardContent>
      </Card>

      {/* Cards Overview */}
      <Card className="bg-gradient-to-br from-black/90 to-yellow-900/20 backdrop-blur-sm border-2 border-yellow-600/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600" />
        <CardHeader className="relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-500/10 to-transparent" />
          <CardTitle className="text-yellow-200 flex items-center gap-3 font-serif tracking-wider">
            <div className="p-2 border-2 border-yellow-600/50 rounded-full bg-black/50">
              <StyleIcon className="w-5 h-5 text-yellow-500" />
            </div>
            YOUR SACRED CARDS
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`cursor-pointer transition-all duration-500 hover:scale-105 ${
                  selectedCardIndex === index ? "ring-2 ring-yellow-500/50 shadow-lg shadow-yellow-500/20" : ""
                } relative overflow-hidden group`}
                onClick={() => setSelectedCardIndex(index)}
              >
                {/* Art Deco Tarot Card Template */}
                <div className="bg-black rounded-lg p-4 border-2 border-yellow-600/50 relative overflow-hidden aspect-[2/3] min-h-[280px]">
                  {/* Ornate Border Pattern */}
                  <div className="absolute inset-2 border-2 border-yellow-500/60 rounded-md">
                    {/* Corner decorative elements */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-l-4 border-t-4 border-yellow-500/80" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-r-4 border-t-4 border-yellow-500/80" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-4 border-b-4 border-yellow-500/80" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-4 border-b-4 border-yellow-500/80" />
                  </div>

                  {/* Top Sun Symbol */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-yellow-500/80 rounded-full flex items-center justify-center relative">
                      <div className="text-black text-xs">☉</div>
                      {/* Sun rays */}
                      <div className="absolute inset-0">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-0.5 h-3 bg-yellow-500/60"
                            style={{
                              top: "-6px",
                              left: "50%",
                              transformOrigin: "50% 18px",
                              transform: `translateX(-50%) rotate(${i * 45}deg)`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Side decorative elements */}
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 space-y-4">
                    <div className="w-2 h-6 border-l-2 border-yellow-500/40" />
                    <div className="w-3 h-3 border border-yellow-500/40 rotate-45" />
                    <div className="w-2 h-6 border-l-2 border-yellow-500/40" />
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 space-y-4">
                    <div className="w-2 h-6 border-r-2 border-yellow-500/40" />
                    <div className="w-3 h-3 border border-yellow-500/40 rotate-45" />
                    <div className="w-2 h-6 border-r-2 border-yellow-500/40" />
                  </div>

                  {/* Central Content Area */}
                  <div className="absolute top-16 left-6 right-6 bottom-16 bg-gradient-to-br from-yellow-600/90 to-yellow-500/90 rounded-lg border border-yellow-400/50 flex flex-col justify-center items-center p-4 text-center">
                    <div className="text-xs font-bold text-black/80 mb-2 tracking-widest">
                      {spread.positions[index].name.toUpperCase()}
                    </div>
                    <div className="text-lg font-bold text-black mb-2 tracking-wide leading-tight">
                      {card.name.toUpperCase()}
                    </div>
                    <div className="text-xs text-black/70 tracking-wider">
                      {card.suit.toUpperCase()} • {card.type.toUpperCase()}
                    </div>
                  </div>

                  {/* Bottom Eye Symbol */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-4 border border-yellow-500/60 rounded-full flex items-center justify-center relative">
                      <div className="w-2 h-2 bg-yellow-500/80 rounded-full" />
                      {/* Eye rays */}
                      <div className="absolute inset-0">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-0.5 h-2 bg-yellow-500/40"
                            style={{
                              bottom: "-4px",
                              left: "50%",
                              transformOrigin: "50% 0px",
                              transform: `translateX(-50%) rotate(${(i - 2.5) * 15}deg)`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mystical corner symbols */}
                  <div className="absolute top-8 left-4 text-yellow-500/60 text-xs">♦</div>
                  <div className="absolute top-8 right-4 text-yellow-500/60 text-xs">♦</div>
                  <div className="absolute bottom-8 left-4 text-yellow-500/60 text-xs">♦</div>
                  <div className="absolute bottom-8 right-4 text-yellow-500/60 text-xs">♦</div>

                  {/* Selection indicator overlay */}
                  {selectedCardIndex === index && (
                    <div className="absolute inset-0 bg-yellow-500/20 rounded-lg border-2 border-yellow-400/80 flex items-center justify-center">
                      <div className="bg-black/80 text-yellow-200 px-3 py-1 rounded text-xs font-bold tracking-widest border border-yellow-500/50">
                        SELECTED
                      </div>
                    </div>
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed AI Interpretation */}
      <Card className="bg-gradient-to-br from-black/90 to-yellow-900/20 backdrop-blur-sm border-2 border-yellow-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(218,165,32,0.03)_48%,rgba(218,165,32,0.03)_52%,transparent_52%)] bg-[length:30px_30px]" />
        <CardHeader className="relative border-b border-yellow-600/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-yellow-200 font-serif tracking-wider text-xl">
              {cards[selectedCardIndex]?.name.toUpperCase()} - {spread.positions[selectedCardIndex]?.name.toUpperCase()}
            </CardTitle>
            <Badge
              className={`bg-gradient-to-r ${getSuitColor(cards[selectedCardIndex]?.suit)} text-white border border-yellow-400/30 font-bold tracking-wide`}
            >
              {cards[selectedCardIndex]?.suit.toUpperCase()}
            </Badge>
          </div>
          <p className="text-yellow-300 leading-relaxed tracking-wide">
            {spread.positions[selectedCardIndex]?.description}
          </p>
        </CardHeader>
        <CardContent className="relative">
          <Tabs defaultValue="meaning" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-yellow-600/30">
              <TabsTrigger
                value="meaning"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black font-semibold tracking-wide"
              >
                MEANING
              </TabsTrigger>
              <TabsTrigger
                value="advice"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black font-semibold tracking-wide"
              >
                GUIDANCE
              </TabsTrigger>
              <TabsTrigger
                value="symbolism"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black font-semibold tracking-wide"
              >
                SYMBOLISM
              </TabsTrigger>
            </TabsList>

            <TabsContent value="meaning" className="mt-8">
              <div className="prose prose-yellow max-w-none">
                <p className="text-yellow-200 leading-relaxed text-lg whitespace-pre-line">
                  {aiReading?.cardInterpretations[selectedCardIndex]?.meaning}
                </p>
                <div className="mt-6 p-6 bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 rounded-lg border border-yellow-600/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-500/10 to-transparent" />
                  <h4 className="font-bold text-yellow-200 mb-4 text-lg tracking-wider">ARCHETYPAL ENERGIES:</h4>
                  <div className="flex flex-wrap gap-3">
                    {cards[selectedCardIndex]?.keywords.map((keyword, idx) => (
                      <Badge
                        key={idx}
                        className="bg-yellow-700/50 text-yellow-200 border border-yellow-600/50 px-3 py-1 font-semibold tracking-wide"
                      >
                        {keyword.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advice" className="mt-8">
              <div className="prose prose-yellow max-w-none">
                <p className="text-yellow-200 leading-relaxed text-lg whitespace-pre-line">
                  {aiReading?.cardInterpretations[selectedCardIndex]?.advice}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="symbolism" className="mt-8">
              <div className="prose prose-yellow max-w-none">
                <p className="text-yellow-200 leading-relaxed text-lg whitespace-pre-line">
                  {aiReading?.cardInterpretations[selectedCardIndex]?.symbolism}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Key Insights and Action Steps */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-black/90 to-yellow-900/20 border-2 border-yellow-600/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600" />
          <CardHeader className="relative">
            <CardTitle className="text-yellow-200 font-serif tracking-wider">KEY INSIGHTS</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <ul className="space-y-3">
              {aiReading?.keyInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-yellow-500 font-bold text-lg">◆</span>
                  <span className="text-yellow-300 leading-relaxed">{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-black/90 to-yellow-900/20 border-2 border-yellow-600/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600" />
          <CardHeader className="relative">
            <CardTitle className="text-yellow-200 font-serif tracking-wider">GUIDED ACTIONS</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <ul className="space-y-3">
              {aiReading?.actionSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Badge className="bg-yellow-700/50 text-yellow-200 border border-yellow-600/50 text-xs font-bold min-w-[24px] h-6 flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <span className="text-yellow-300 leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
