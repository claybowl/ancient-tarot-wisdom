"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { TarotCard } from "@/types/tarot"
import { Shuffle, Eye } from "lucide-react"

interface TarotDeckProps {
  onCardSelect: (card: TarotCard) => void
}

// Simplified tarot deck - in a real app, this would be much more comprehensive
const tarotDeck: TarotCard[] = [
  // Major Arcana
  {
    id: 1,
    name: "The Fool",
    suit: "Major Arcana",
    type: "Major",
    number: 0,
    upright: true,
    keywords: ["new beginnings", "innocence", "spontaneity"],
  },
  {
    id: 2,
    name: "The Magician",
    suit: "Major Arcana",
    type: "Major",
    number: 1,
    upright: true,
    keywords: ["manifestation", "resourcefulness", "power"],
  },
  {
    id: 3,
    name: "The High Priestess",
    suit: "Major Arcana",
    type: "Major",
    number: 2,
    upright: true,
    keywords: ["intuition", "sacred knowledge", "divine feminine"],
  },
  {
    id: 4,
    name: "The Empress",
    suit: "Major Arcana",
    type: "Major",
    number: 3,
    upright: true,
    keywords: ["femininity", "beauty", "nature"],
  },
  {
    id: 5,
    name: "The Emperor",
    suit: "Major Arcana",
    type: "Major",
    number: 4,
    upright: true,
    keywords: ["authority", "structure", "control"],
  },
  {
    id: 6,
    name: "The Hierophant",
    suit: "Major Arcana",
    type: "Major",
    number: 5,
    upright: true,
    keywords: ["spiritual wisdom", "religious beliefs", "conformity"],
  },
  {
    id: 7,
    name: "The Lovers",
    suit: "Major Arcana",
    type: "Major",
    number: 6,
    upright: true,
    keywords: ["love", "harmony", "relationships"],
  },
  {
    id: 8,
    name: "The Chariot",
    suit: "Major Arcana",
    type: "Major",
    number: 7,
    upright: true,
    keywords: ["control", "willpower", "success"],
  },
  {
    id: 9,
    name: "Strength",
    suit: "Major Arcana",
    type: "Major",
    number: 8,
    upright: true,
    keywords: ["strength", "courage", "patience"],
  },
  {
    id: 10,
    name: "The Hermit",
    suit: "Major Arcana",
    type: "Major",
    number: 9,
    upright: true,
    keywords: ["soul searching", "seeking truth", "inner guidance"],
  },

  // Cups
  {
    id: 11,
    name: "Ace of Cups",
    suit: "Cups",
    type: "Minor",
    number: 1,
    upright: true,
    keywords: ["love", "intuition", "spirituality"],
  },
  {
    id: 12,
    name: "Two of Cups",
    suit: "Cups",
    type: "Minor",
    number: 2,
    upright: true,
    keywords: ["unified love", "partnership", "mutual attraction"],
  },
  {
    id: 13,
    name: "Three of Cups",
    suit: "Cups",
    type: "Minor",
    number: 3,
    upright: true,
    keywords: ["celebration", "friendship", "creativity"],
  },
  {
    id: 14,
    name: "King of Cups",
    suit: "Cups",
    type: "Court",
    number: 14,
    upright: true,
    keywords: ["emotional balance", "compassion", "diplomacy"],
  },
  {
    id: 15,
    name: "Queen of Cups",
    suit: "Cups",
    type: "Minor",
    number: 13,
    upright: true,
    keywords: ["compassion", "calm", "comfort"],
  },

  // Wands
  {
    id: 16,
    name: "Ace of Wands",
    suit: "Wands",
    type: "Minor",
    number: 1,
    upright: true,
    keywords: ["inspiration", "creative spark", "new initiative"],
  },
  {
    id: 17,
    name: "Two of Wands",
    suit: "Wands",
    type: "Minor",
    number: 2,
    upright: true,
    keywords: ["planning", "making decisions", "leaving comfort zone"],
  },
  {
    id: 18,
    name: "Three of Wands",
    suit: "Wands",
    type: "Minor",
    number: 3,
    upright: true,
    keywords: ["expansion", "foresight", "overseas opportunities"],
  },
  {
    id: 19,
    name: "King of Wands",
    suit: "Wands",
    type: "Court",
    number: 14,
    upright: true,
    keywords: ["natural-born leader", "vision", "entrepreneur"],
  },
  {
    id: 20,
    name: "Queen of Wands",
    suit: "Wands",
    type: "Court",
    number: 13,
    upright: true,
    keywords: ["courage", "confidence", "independence"],
  },

  // Swords
  {
    id: 21,
    name: "Ace of Swords",
    suit: "Swords",
    type: "Minor",
    number: 1,
    upright: true,
    keywords: ["breakthrough", "clarity", "sharp mind"],
  },
  {
    id: 22,
    name: "Two of Swords",
    suit: "Swords",
    type: "Minor",
    number: 2,
    upright: true,
    keywords: ["difficult decisions", "weighing options", "indecision"],
  },
  {
    id: 23,
    name: "Three of Swords",
    suit: "Swords",
    type: "Minor",
    number: 3,
    upright: true,
    keywords: ["heartbreak", "emotional pain", "sorrow"],
  },
  {
    id: 24,
    name: "King of Swords",
    suit: "Swords",
    type: "Court",
    number: 14,
    upright: true,
    keywords: ["intellectual power", "authority", "truth"],
  },
  {
    id: 25,
    name: "Queen of Swords",
    suit: "Swords",
    type: "Court",
    number: 13,
    upright: true,
    keywords: ["independent", "unbiased judgement", "clear boundaries"],
  },

  // Pentacles
  {
    id: 26,
    name: "Ace of Pentacles",
    suit: "Pentacles",
    type: "Minor",
    number: 1,
    upright: true,
    keywords: ["manifestation", "financial opportunity", "skill development"],
  },
  {
    id: 27,
    name: "Two of Pentacles",
    suit: "Pentacles",
    type: "Minor",
    number: 2,
    upright: true,
    keywords: ["multiple priorities", "time management", "prioritization"],
  },
  {
    id: 28,
    name: "Three of Pentacles",
    suit: "Pentacles",
    type: "Minor",
    number: 3,
    upright: true,
    keywords: ["teamwork", "collaboration", "learning"],
  },
  {
    id: 29,
    name: "King of Pentacles",
    suit: "Pentacles",
    type: "Court",
    number: 14,
    upright: true,
    keywords: ["financial success", "business acumen", "security"],
  },
  {
    id: 30,
    name: "Queen of Pentacles",
    suit: "Pentacles",
    type: "Court",
    number: 13,
    upright: true,
    keywords: ["nurturing", "practical", "providing financially"],
  },
]

const getSuitColor = (suit: string) => {
  switch (suit) {
    case "Major Arcana":
      return "from-yellow-600 to-yellow-500"
    case "Cups":
      return "from-yellow-500 to-yellow-600"
    case "Wands":
      return "from-yellow-600 to-yellow-400"
    case "Swords":
      return "from-yellow-700 to-yellow-500"
    case "Pentacles":
      return "from-yellow-500 to-yellow-700"
    default:
      return "from-yellow-600 to-yellow-500"
  }
}

export default function TarotDeck({ onCardSelect }: TarotDeckProps) {
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>(tarotDeck)
  const [isShuffling, setIsShuffling] = useState(false)
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([])

  const shuffleDeck = () => {
    setIsShuffling(true)
    setTimeout(() => {
      const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5)
      setShuffledDeck(shuffled)
      setIsShuffling(false)
    }, 1000)
  }

  const handleCardClick = (card: TarotCard) => {
    if (!selectedCardIds.includes(card.id)) {
      setSelectedCardIds([...selectedCardIds, card.id])
      onCardSelect(card)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-32 h-32 border-4 border-yellow-600 rounded-full animate-pulse" />
          <div
            className="absolute w-24 h-24 border-2 border-yellow-500 rounded-full rotate-45 animate-spin"
            style={{ animationDuration: "30s" }}
          />
        </div>
        <Button
          onClick={shuffleDeck}
          disabled={isShuffling}
          className="relative bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-700 hover:via-yellow-600 hover:to-yellow-700 text-black mb-6 px-8 py-4 text-lg font-bold tracking-widest border-2 border-yellow-400/50 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Shuffle className={`w-5 h-5 mr-3 ${isShuffling ? "animate-spin" : ""}`} />
          {isShuffling ? "SHUFFLING THE COSMIC DECK..." : "SHUFFLE THE SACRED DECK"}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent h-px top-1/2" />
          <p className="relative text-sm text-yellow-300 bg-black/80 px-6 py-2 inline-block tracking-wide border border-yellow-600/30">
            Focus your intention and let your intuition guide you to the cards that call to your soul
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {shuffledDeck.map((card) => {
          const isSelected = selectedCardIds.includes(card.id)
          return (
            <Card
              key={card.id}
              className={`cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/20 ${
                isSelected
                  ? "opacity-50 cursor-not-allowed ring-2 ring-yellow-500/50 bg-gray-900/50"
                  : "hover:shadow-xl bg-black/90 border-2 border-yellow-600/30 hover:border-yellow-500/50"
              } relative overflow-hidden group`}
              onClick={() => !isSelected && handleCardClick(card)}
            >
              <CardContent className="p-4 relative">
                <div className="bg-gradient-to-br from-slate-900 to-black text-yellow-400 rounded-lg p-4 h-36 flex flex-col justify-center items-center border-2 border-yellow-600/50 relative overflow-hidden shadow-lg">
                  {/* Tarot Card Back Pattern */}
                  <div className="absolute inset-2 border-2 border-yellow-500/30 rounded-md">
                    <div className="absolute inset-2 border border-yellow-400/20 rounded-sm">
                      {/* Central mystical symbol */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-2 border-yellow-500/40 rounded-full flex items-center justify-center relative">
                          <div className="w-8 h-8 border border-yellow-400/30 rounded-full">
                            <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full" />
                          </div>
                          {/* Decorative corners */}
                          <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 border-yellow-500/40" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 border-yellow-500/40" />
                          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2 border-yellow-500/40" />
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2 border-yellow-500/40" />
                        </div>
                      </div>

                      {/* Corner decorative elements */}
                      <div className="absolute top-1 left-1 w-3 h-3">
                        <div className="w-full h-full border-l-2 border-t-2 border-yellow-500/30 rounded-tl-sm" />
                      </div>
                      <div className="absolute top-1 right-1 w-3 h-3">
                        <div className="w-full h-full border-r-2 border-t-2 border-yellow-500/30 rounded-tr-sm" />
                      </div>
                      <div className="absolute bottom-1 left-1 w-3 h-3">
                        <div className="w-full h-full border-l-2 border-b-2 border-yellow-500/30 rounded-bl-sm" />
                      </div>
                      <div className="absolute bottom-1 right-1 w-3 h-3">
                        <div className="w-full h-full border-r-2 border-b-2 border-yellow-500/30 rounded-br-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05)_0%,transparent_70%)] rounded-lg" />
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,215,0,0.02)_48%,rgba(255,215,0,0.02)_52%,transparent_52%)] bg-[length:8px_8px] rounded-lg" />

                  {/* Selection indicator */}
                  {isSelected ? (
                    <div className="absolute inset-0 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <div className="text-yellow-200 text-xs font-bold tracking-widest bg-black/50 px-2 py-1 rounded border border-yellow-500/50">
                        SELECTED
                      </div>
                    </div>
                  ) : (
                    <div className="absolute bottom-2 right-2 opacity-60">
                      <Eye className="w-3 h-3 text-yellow-500" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
