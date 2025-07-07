"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TarotSpread, TarotCard, InterpretationStyle } from "@/types/tarot"
import TarotDeck from "@/components/tarot-deck"
import CardInterpretation from "@/components/card-interpretation"
import ReadingPrompt from "@/components/reading-prompt"
import { RotateCcw, Sparkles } from "lucide-react"

interface ReadingInterfaceProps {
  spread: TarotSpread
  onCardsSelected: (cards: TarotCard[]) => void
  onReset: () => void
}

const interpretationStyles: InterpretationStyle[] = [
  {
    id: "traditional",
    name: "Traditional",
    description: "Classic Rider-Waite meanings and symbolism",
  },
  {
    id: "intuitive",
    name: "Intuitive",
    description: "Focus on personal feelings and first impressions",
  },
  {
    id: "psychological",
    name: "Psychological",
    description: "Jungian archetypes and psychological insights",
  },
  {
    id: "mystical",
    name: "Mystical",
    description: "Kabbalah, numerology, and esoteric connections",
  },
]

export default function ReadingInterface({ spread, onCardsSelected, onReset }: ReadingInterfaceProps) {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [interpretationStyle, setInterpretationStyle] = useState<string>("traditional")
  const [currentStep, setCurrentStep] = useState<"select" | "prompt" | "interpret">("select")
  const [userPrompt, setUserPrompt] = useState<string>("")

  const handleCardSelect = (card: TarotCard) => {
    if (selectedCards.length < spread.positions.length) {
      const newCards = [...selectedCards, card]
      setSelectedCards(newCards)
      onCardsSelected(newCards)

      if (newCards.length === spread.positions.length) {
        setCurrentStep("prompt")
      }
    }
  }

  const handlePromptSubmit = (prompt: string) => {
    setUserPrompt(prompt)
    setCurrentStep("interpret")
  }

  const resetReading = () => {
    setSelectedCards([])
    setCurrentStep("select")
    setUserPrompt("")
  }

  const getSpreadLayout = () => {
    switch (spread.id) {
      case "three-card":
        return "grid-cols-3 gap-4"
      case "celtic-cross":
        return "grid-cols-4 gap-2"
      case "spiral-thirteen":
        return "grid-cols-5 gap-2"
      case "love-triangle":
        return "grid-cols-3 gap-4"
      case "decision-making":
        return "grid-cols-3 gap-4"
      default:
        return "grid-cols-3 gap-4"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="w-96 h-96 border-8 border-yellow-600 rounded-full" />
          <div className="absolute w-80 h-80 border-4 border-yellow-500 rounded-full rotate-45" />
        </div>
        <h2 className="relative text-4xl font-bold text-yellow-200 mb-3 font-serif tracking-widest">
          {spread.name.toUpperCase()}
        </h2>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent h-px top-1/2" />
          <p className="relative text-lg text-yellow-300 mb-6 bg-black/80 px-6 py-2 inline-block tracking-wide border border-yellow-600/30">
            {spread.description}
          </p>
        </div>
        <div className="flex justify-center gap-6 mb-8">
          <Badge
            variant="outline"
            className="border-yellow-600/50 text-yellow-300 bg-black/50 px-4 py-2 font-bold tracking-wide backdrop-blur-sm"
          >
            {selectedCards.length} / {spread.positions.length} CARDS SELECTED
          </Badge>
          <Select value={interpretationStyle} onValueChange={setInterpretationStyle}>
            <SelectTrigger className="w-64 border-yellow-600/50 bg-black/50 text-yellow-200 font-semibold tracking-wide backdrop-blur-sm">
              <SelectValue placeholder="INTERPRETATION STYLE" />
            </SelectTrigger>
            <SelectContent className="bg-black border-yellow-600/50">
              {interpretationStyles.map((style) => (
                <SelectItem key={style.id} value={style.id} className="text-yellow-200 hover:bg-yellow-900/50">
                  <div>
                    <div className="font-medium tracking-wide">{style.name.toUpperCase()}</div>
                    <div className="text-xs text-yellow-400">{style.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {currentStep === "select" && (
        <div className="space-y-8">
          {/* Progress */}
          <Card className="bg-black/90 backdrop-blur-sm border-2 border-yellow-600/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_47%,rgba(218,165,32,0.03)_47%,rgba(218,165,32,0.03)_53%,transparent_53%)] bg-[length:20px_20px]" />
            <CardContent className="p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-yellow-200 font-serif tracking-wider">
                  SELECT CARD {selectedCards.length + 1}: {spread.positions[selectedCards.length]?.name.toUpperCase()}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetReading}
                  className="border-yellow-600/50 text-yellow-200 hover:bg-yellow-900/30 bg-black/50 font-semibold tracking-wide backdrop-blur-sm"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  RESET
                </Button>
              </div>
              <p className="text-yellow-300 mb-6 text-lg leading-relaxed">
                {spread.positions[selectedCards.length]?.description}
              </p>
              <div className="relative">
                <div className="w-full bg-gray-800 rounded-full h-3 border border-yellow-600/30">
                  <div
                    className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${(selectedCards.length / spread.positions.length) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Cards Preview */}
          {selectedCards.length > 0 && (
            <Card className="bg-black/90 backdrop-blur-sm border-2 border-yellow-600/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600" />
              <CardHeader className="relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-500/10 to-transparent" />
                <CardTitle className="text-yellow-200 flex items-center gap-3 font-serif tracking-wider">
                  <div className="p-2 border-2 border-yellow-600/50 rounded-full bg-black/50">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                  </div>
                  YOUR SELECTED CARDS
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className={`grid ${getSpreadLayout()} max-w-5xl mx-auto gap-6`}>
                  {spread.positions.map((position, index) => (
                    <div key={position.id} className="text-center">
                      <div className="mb-3">
                        {selectedCards[index] ? (
                          <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border-2 border-yellow-600/50 rounded-lg p-6 h-40 flex items-center justify-center relative overflow-hidden group hover:border-yellow-500/70 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="text-center relative">
                              <div className="text-sm font-bold text-yellow-200 mb-2 tracking-wide">
                                {selectedCards[index].name.toUpperCase()}
                              </div>
                              <div className="text-xs text-yellow-400 tracking-wider">
                                {selectedCards[index].suit.toUpperCase()} • {selectedCards[index].type.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-900/50 border-2 border-dashed border-yellow-600/30 rounded-lg p-6 h-40 flex items-center justify-center relative">
                            <div className="text-yellow-600 text-sm font-semibold tracking-wide">
                              {index === selectedCards.length ? "SELECT NEXT" : "AWAITING..."}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-xs font-bold text-yellow-400 tracking-widest">
                        {position.name.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tarot Deck */}
          <TarotDeck onCardSelect={handleCardSelect} />
        </div>
      )}

      {currentStep === "prompt" && (
        <ReadingPrompt
          cards={selectedCards}
          spread={spread}
          onSubmit={handlePromptSubmit}
          onBack={() => setCurrentStep("select")}
        />
      )}

      {currentStep === "interpret" && (
        <CardInterpretation
          cards={selectedCards}
          spread={spread}
          interpretationStyle={interpretationStyle}
          userPrompt={userPrompt}
          onNewReading={onReset}
          onBackToSelection={() => setCurrentStep("select")}
        />
      )}
    </div>
  )
}
