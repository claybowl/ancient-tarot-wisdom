"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TarotSpread } from "@/types/tarot"
import { Clock, Star, Compass, Heart, Zap } from "lucide-react"
import { Sparkles } from "lucide-react"

interface SpreadSelectorProps {
  onSpreadSelect: (spread: TarotSpread) => void
}

const spreads: TarotSpread[] = [
  {
    id: "three-card",
    name: "Three Card Spread",
    description: "Past, Present, Future - Perfect for beginners",
    positions: [
      { id: 1, name: "Past", description: "What influences from the past affect this situation" },
      { id: 2, name: "Present", description: "The current state of affairs" },
      { id: 3, name: "Future", description: "Potential outcome or what to expect" },
    ],
    difficulty: "Beginner",
    icon: Clock,
    color: "from-yellow-600 to-yellow-500",
  },
  {
    id: "celtic-cross",
    name: "Celtic Cross",
    description: "Comprehensive 10-card reading for deep insight",
    positions: [
      { id: 1, name: "Present Situation", description: "The heart of the matter" },
      { id: 2, name: "Challenge", description: "What crosses or challenges you" },
      { id: 3, name: "Distant Past", description: "Foundation of the situation" },
      { id: 4, name: "Recent Past", description: "Recent events affecting the situation" },
      { id: 5, name: "Possible Outcome", description: "What may come to pass" },
      { id: 6, name: "Near Future", description: "What will happen next" },
      { id: 7, name: "Your Approach", description: "How you approach the situation" },
      { id: 8, name: "External Influences", description: "How others see the situation" },
      { id: 9, name: "Hopes and Fears", description: "Your inner feelings" },
      { id: 10, name: "Final Outcome", description: "The ultimate result" },
    ],
    difficulty: "Advanced",
    icon: Star,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: "spiral-thirteen",
    name: "13-Card Spiral",
    description: "Mystical spiral layout for deep spiritual insight",
    positions: Array.from({ length: 13 }, (_, i) => ({
      id: i + 1,
      name: `Position ${i + 1}`,
      description: `Spiral position ${i + 1} - representing your spiritual journey`,
    })),
    difficulty: "Expert",
    icon: Compass,
    color: "from-yellow-700 to-yellow-500",
  },
  {
    id: "love-triangle",
    name: "Love Triangle",
    description: "Explore relationships and emotional connections",
    positions: [
      { id: 1, name: "You", description: "Your feelings and perspective" },
      { id: 2, name: "Them", description: "Their feelings and perspective" },
      { id: 3, name: "Relationship", description: "The connection between you" },
    ],
    difficulty: "Beginner",
    icon: Heart,
    color: "from-yellow-600 to-yellow-400",
  },
  {
    id: "decision-making",
    name: "Decision Crossroads",
    description: "When facing important life choices",
    positions: [
      { id: 1, name: "Current Situation", description: "Where you stand now" },
      { id: 2, name: "Option A", description: "First path and its consequences" },
      { id: 3, name: "Option B", description: "Second path and its consequences" },
      { id: 4, name: "Hidden Influences", description: "Unseen factors affecting your choice" },
      { id: 5, name: "Guidance", description: "Advice from your higher self" },
    ],
    difficulty: "Intermediate",
    icon: Zap,
    color: "from-yellow-500 to-yellow-700",
  },
]

export default function SpreadSelector({ onSpreadSelect }: SpreadSelectorProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-900/50 text-green-300 border-green-500/50"
      case "Intermediate":
        return "bg-yellow-900/50 text-yellow-300 border-yellow-500/50"
      case "Advanced":
        return "bg-orange-900/50 text-orange-300 border-orange-500/50"
      case "Expert":
        return "bg-red-900/50 text-red-300 border-red-500/50"
      default:
        return "bg-yellow-900/50 text-yellow-300 border-yellow-500/50"
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-64 h-64 border-4 border-yellow-600 rounded-full" />
          <div className="absolute w-48 h-48 border-2 border-yellow-500 rounded-full rotate-45" />
        </div>
        <h2 className="relative text-4xl font-bold text-yellow-200 mb-6 font-serif tracking-widest">
          CHOOSE YOUR SACRED SPREAD
        </h2>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent h-px top-1/2" />
          <p className="relative text-lg text-yellow-300 max-w-3xl mx-auto bg-black/80 px-8 py-3 inline-block tracking-wide border border-yellow-600/30">
            Each spread unveils different layers of cosmic truth. Begin with simple revelations and ascend to profound
            mysteries.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {spreads.map((spread) => {
          const IconComponent = spread.icon
          return (
            <Card
              key={spread.id}
              className="bg-black/90 backdrop-blur-sm border-2 border-yellow-600/30 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 hover:scale-105 hover:border-yellow-500/50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-500/10 to-transparent" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(218,165,32,0.02)_48%,rgba(218,165,32,0.02)_52%,transparent_52%)] bg-[length:25px_25px]" />
              <CardHeader className="pb-4 relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-4 rounded-full bg-gradient-to-r ${spread.color} text-black border-2 border-yellow-400/50 shadow-lg`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <Badge className={`${getDifficultyColor(spread.difficulty)} font-bold tracking-wide`}>
                    {spread.difficulty.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-yellow-200 font-serif tracking-wider">
                  {spread.name.toUpperCase()}
                </CardTitle>
                <p className="text-sm text-yellow-300 leading-relaxed">{spread.description}</p>
              </CardHeader>
              <CardContent className="pt-0 relative">
                <div className="space-y-4">
                  <div className="text-sm text-yellow-400 font-semibold tracking-wide">
                    <strong>{spread.positions.length} CARDS</strong> •
                    <span className="ml-2">
                      {spread.difficulty === "Beginner"
                        ? "5-10 MIN"
                        : spread.difficulty === "Intermediate"
                          ? "15-20 MIN"
                          : spread.difficulty === "Advanced"
                            ? "25-30 MIN"
                            : "35+ MIN"}
                    </span>
                  </div>
                  <Button
                    onClick={() => onSpreadSelect(spread)}
                    className={`w-full bg-gradient-to-r ${spread.color} hover:opacity-90 text-black font-bold tracking-widest border border-yellow-400/50 shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    SELECT THIS SPREAD
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="max-w-3xl mx-auto bg-black/90 backdrop-blur-sm border-2 border-yellow-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,rgba(218,165,32,0.03)_45%,rgba(218,165,32,0.03)_55%,transparent_55%)] bg-[length:25px_25px]" />
        <CardContent className="p-8 relative">
          <div className="text-center mb-6">
            <div className="inline-block p-3 border-2 border-yellow-600/50 rounded-full mb-4 bg-black/50">
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-yellow-200 mb-4 font-serif tracking-wider">
              GUIDANCE FOR THE SEEKER
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3 text-sm text-yellow-300">
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold">◆</span>
                <span>
                  <strong className="text-yellow-200">New to the mysteries?</strong> Begin with the Three Card Spread
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold">◆</span>
                <span>
                  <strong className="text-yellow-200">Matters of the heart?</strong> Consult the Love Triangle
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold">◆</span>
                <span>
                  <strong className="text-yellow-200">Crossroads ahead?</strong> Seek the Decision Crossroads
                </span>
              </li>
            </ul>
            <ul className="space-y-3 text-sm text-yellow-300">
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold">◆</span>
                <span>
                  <strong className="text-yellow-200">Deep revelations?</strong> The Celtic Cross reveals all
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold">◆</span>
                <span>
                  <strong className="text-yellow-200">Cosmic connection?</strong> The 13-Card Spiral channels ancient
                  power
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
