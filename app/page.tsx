"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Sparkles, History, Layout } from "lucide-react"
import SpreadSelector from "@/components/spread-selector"
import ReadingInterface from "@/components/reading-interface"
import EducationModal from "@/components/education-modal"
import type { TarotCard, TarotSpread } from "@/types/tarot"
import Image from "next/image"

export default function TarotApp() {
  const [currentView, setCurrentView] = useState<"home" | "spread" | "reading">("home")
  const [selectedSpread, setSelectedSpread] = useState<TarotSpread | null>(null)
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [showEducation, setShowEducation] = useState(false)

  const handleSpreadSelect = (spread: TarotSpread) => {
    setSelectedSpread(spread)
    setCurrentView("reading")
  }

  const handleCardsSelected = (cards: TarotCard[]) => {
    setSelectedCards(cards)
  }

  const resetReading = () => {
    setCurrentView("home")
    setSelectedSpread(null)
    setSelectedCards([])
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Art Deco Header with Banner */}
      <header className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-20">
          {/* Art Deco geometric pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(218,165,32,0.1)_0%,transparent_50%)] bg-[length:100px_100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(218,165,32,0.05)_35%,rgba(218,165,32,0.05)_65%,transparent_65%)] bg-[length:40px_40px]" />
        </div>

        {/* Banner Image */}
        <div className="relative container mx-auto px-4 py-8">
          <div className="flex justify-center mb-8">
            <div className="relative max-w-4xl w-full">
              <Image
                src="/images/tarot-banner.png"
                alt="Tarot & I Ching App"
                width={1200}
                height={600}
                className="w-full h-auto rounded-lg shadow-2xl border-2 border-yellow-600/30"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
          </div>

          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent h-px top-1/2" />
              <p className="relative text-xl md:text-2xl text-yellow-200 font-light tracking-[0.3em] bg-black/80 px-8 py-3 inline-block border border-yellow-600/30">
                ANCIENT WISDOM • MODERN INSIGHT • AI POWERED
              </p>
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <Badge
                variant="secondary"
                className="bg-black/80 text-yellow-200 border-yellow-600/50 px-4 py-2 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                INTUITIVE GUIDANCE
              </Badge>
              <Badge
                variant="secondary"
                className="bg-black/80 text-yellow-200 border-yellow-600/50 px-4 py-2 backdrop-blur-sm"
              >
                <History className="w-4 h-4 mr-2" />
                ESOTERIC WISDOM
              </Badge>
              <Badge
                variant="secondary"
                className="bg-black/80 text-yellow-200 border-yellow-600/50 px-4 py-2 backdrop-blur-sm"
              >
                <Layout className="w-4 h-4 mr-2" />
                SACRED GEOMETRY
              </Badge>
            </div>
          </div>
        </div>

        {/* Art Deco bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600" />
      </header>

      {/* Navigation */}
      <nav className="bg-black/95 backdrop-blur-sm border-b-2 border-yellow-600/30 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Button
                variant={currentView === "home" ? "default" : "ghost"}
                onClick={() => setCurrentView("home")}
                className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black border border-yellow-400/50 font-bold tracking-wide shadow-lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                NEW READING
              </Button>
              <Button
                variant={currentView === "spread" ? "default" : "ghost"}
                onClick={() => setCurrentView("spread")}
                className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black border border-yellow-400/50 font-bold tracking-wide shadow-lg"
              >
                <Layout className="w-4 h-4 mr-2" />
                CHOOSE SPREAD
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowEducation(true)}
              className="border-yellow-600/50 text-yellow-200 hover:bg-yellow-600/20 bg-black/50 font-bold tracking-wide backdrop-blur-sm"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              ARCANE KNOWLEDGE
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === "home" && (
          <div className="text-center space-y-8">
            <Card className="max-w-4xl mx-auto bg-black/90 backdrop-blur-sm border-2 border-yellow-600/30 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(218,165,32,0.03)_48%,rgba(218,165,32,0.03)_52%,transparent_52%)] bg-[length:30px_30px]" />
              <CardHeader className="bg-gradient-to-r from-black/80 to-black/60 border-b-2 border-yellow-600/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(218,165,32,0.05)_40%,rgba(218,165,32,0.05)_60%,transparent_60%)] bg-[length:20px_20px]" />
                <CardTitle className="relative text-3xl text-yellow-200 flex items-center justify-center gap-4 font-serif tracking-wider">
                  <div className="w-10 h-10 border-2 border-yellow-600 rounded-full flex items-center justify-center bg-black/50">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                  </div>
                  ENTER THE REALM OF DIVINATION
                  <div className="w-10 h-10 border-2 border-yellow-600 rounded-full flex items-center justify-center bg-black/50">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-12 relative">
                {/* Art Deco corner decorations */}
                <div className="absolute top-6 left-6 w-20 h-20 border-l-2 border-t-2 border-yellow-600/40" />
                <div className="absolute top-6 right-6 w-20 h-20 border-r-2 border-t-2 border-yellow-600/40" />
                <div className="absolute bottom-6 left-6 w-20 h-20 border-l-2 border-b-2 border-yellow-600/40" />
                <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 border-yellow-600/40" />

                <p className="text-lg text-yellow-100 mb-10 leading-relaxed font-light tracking-wide max-w-3xl mx-auto">
                  Unlock the mysteries of the cosmos through the ancient arts of tarot and I Ching. Let AI-powered
                  wisdom guide you through the labyrinth of fate and fortune, where sacred symbols meet modern insight.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
                  <div className="p-8 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 rounded-lg border border-yellow-600/30 relative overflow-hidden group hover:border-yellow-500/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-500/10 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="font-bold text-yellow-200 mb-4 text-xl tracking-wide relative">SACRED SPREADS</h3>
                    <p className="text-sm text-yellow-300 leading-relaxed relative">
                      From mystical three-card revelations to the profound Celtic Cross and the ancient 13-card spiral
                      of wisdom
                    </p>
                  </div>
                  <div className="p-8 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 rounded-lg border border-yellow-600/30 relative overflow-hidden group hover:border-yellow-500/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-500/10 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="font-bold text-yellow-200 mb-4 text-xl tracking-wide relative">AI INTERPRETATION</h3>
                    <p className="text-sm text-yellow-300 leading-relaxed relative">
                      Mystical insights woven with ancient wisdom and powered by advanced AI for personalized guidance
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setCurrentView("spread")}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-700 hover:via-yellow-600 hover:to-yellow-700 text-black px-16 py-6 text-xl font-bold tracking-widest border-2 border-yellow-400/50 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">BEGIN YOUR MYSTICAL JOURNEY</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === "spread" && <SpreadSelector onSpreadSelect={handleSpreadSelect} />}

        {currentView === "reading" && selectedSpread && (
          <ReadingInterface spread={selectedSpread} onCardsSelected={handleCardsSelected} onReset={resetReading} />
        )}
      </main>

      {/* Education Modal */}
      <EducationModal isOpen={showEducation} onClose={() => setShowEducation(false)} />

      {/* Art Deco Footer */}
      <footer className="mt-16 bg-black text-white relative overflow-hidden border-t-2 border-yellow-600/30">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(218,165,32,0.03)_48%,rgba(218,165,32,0.03)_52%,transparent_52%)] bg-[length:30px_30px]" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600" />
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-block p-6 border-2 border-yellow-600/50 rounded-full bg-black/50 backdrop-blur-sm">
                <Sparkles className="w-10 h-10 text-yellow-500" />
              </div>
            </div>
            <p className="text-yellow-200 mb-4 text-xl font-serif tracking-wider">
              "The cards are mirrors of the soul's deepest wisdom"
            </p>
            <p className="text-sm text-yellow-400 tracking-widest">WHERE ANCIENT MYSTERIES MEET MODERN INSIGHT</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
