"use client"

import { useState, useEffect } from "react"
import { Sparkles, Eye, BookOpen, Zap } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Choose Your Sacred Spread",
    description: "Select from mystical layouts ranging from simple three-card draws to the profound Celtic Cross",
    icon: BookOpen,
    gradient: "from-purple-900/40 via-indigo-900/40 to-black",
    pattern: "bg-[radial-gradient(circle_at_20%_50%,rgba(147,51,234,0.15)_0%,transparent_50%)]",
  },
  {
    id: 2,
    title: "Draw Your Destiny Cards",
    description: "Let intuition guide you as the cosmic deck reveals the cards meant for your journey",
    icon: Sparkles,
    gradient: "from-yellow-900/40 via-amber-900/40 to-black",
    pattern: "bg-[radial-gradient(circle_at_80%_50%,rgba(251,191,36,0.15)_0%,transparent_50%)]",
  },
  {
    id: 3,
    title: "Receive AI-Powered Wisdom",
    description: "Ancient tarot meanings enhanced by modern AI create deeply personalized interpretations",
    icon: Zap,
    gradient: "from-blue-900/40 via-cyan-900/40 to-black",
    pattern: "bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15)_0%,transparent_50%)]",
  },
  {
    id: 4,
    title: "Discover Your True Path",
    description: "Gain clarity, insight, and actionable guidance for your life's most important questions",
    icon: Eye,
    gradient: "from-pink-900/40 via-purple-900/40 to-black",
    pattern: "bg-[radial-gradient(circle_at_30%_70%,rgba(236,72,153,0.15)_0%,transparent_50%)]",
  },
]

export default function AnimatedHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setIsTransitioning(false)
      }, 500)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const current = slides[currentSlide]
  const Icon = current.icon

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient and pattern */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${current.gradient} transition-all duration-1000 ease-in-out ${
          isTransitioning ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className={`absolute inset-0 ${current.pattern} transition-all duration-1000`} />
      </div>

      {/* Art Deco geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(218,165,32,0.1)_48%,rgba(218,165,32,0.1)_52%,transparent_52%)] bg-[length:40px_40px]" />
      </div>

      {/* Animated content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`text-center max-w-3xl px-8 transition-all duration-700 ${
            isTransitioning ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"
          }`}
        >
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div
              className={`p-6 border-4 border-yellow-500/30 rounded-full bg-black/50 backdrop-blur-sm transition-all duration-700 ${
                isTransitioning ? "rotate-180 scale-0" : "rotate-0 scale-100"
              }`}
            >
              <Icon className="w-16 h-16 text-yellow-400" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-200 mb-6 font-serif tracking-wider">
            {current.title.toUpperCase()}
          </h2>

          {/* Description */}
          <p className="text-xl text-yellow-300/90 leading-relaxed tracking-wide">{current.description}</p>

          {/* Progress dots */}
          <div className="flex justify-center gap-3 mt-12">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => {
                  setIsTransitioning(true)
                  setTimeout(() => {
                    setCurrentSlide(index)
                    setIsTransitioning(false)
                  }, 500)
                }}
                className={`transition-all duration-500 rounded-full ${
                  index === currentSlide ? "w-12 h-3 bg-yellow-500" : "w-3 h-3 bg-yellow-500/30 hover:bg-yellow-500/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mystical floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
