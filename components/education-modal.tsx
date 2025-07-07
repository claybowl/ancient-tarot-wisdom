"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Star, Clock, Globe } from "lucide-react"

interface EducationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EducationModal({ isOpen, onClose }: EducationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="border-b-2 border-purple-500/30 pb-6 mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent" />
          <div className="text-center">
            <div className="inline-block p-4 border-2 border-yellow-400/50 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-yellow-400" />
            </div>
            <DialogTitle className="text-3xl text-purple-200 flex items-center justify-center gap-3 font-serif tracking-widest">
              ARCANE KNOWLEDGE
            </DialogTitle>
            <p className="text-purple-300 mt-2 tracking-wide">Ancient Wisdom for the Modern Seeker</p>
          </div>
        </DialogHeader>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-purple-500/30 p-1">
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white font-semibold tracking-wide"
            >
              ORIGINS
            </TabsTrigger>
            <TabsTrigger
              value="cards"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white font-semibold tracking-wide"
            >
              THE CARDS
            </TabsTrigger>
            <TabsTrigger
              value="reading"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white font-semibold tracking-wide"
            >
              DIVINATION
            </TabsTrigger>
            <TabsTrigger
              value="mysticism"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white font-semibold tracking-wide"
            >
              MYSTICISM
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6 space-y-6">
            <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 border-2 border-purple-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-3 text-purple-200 font-serif tracking-wider">
                  <Clock className="w-6 h-6 text-yellow-400" />
                  ORIGINS OF THE SACRED CARDS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative">
                <p className="text-purple-300 leading-relaxed">
                  The mystical tarot emerged from the shadows of 15th-century Europe, born as mere playing cards but
                  destined to become vessels of divine wisdom. Their transformation into tools of divination drew from
                  the deepest wells of esoteric knowledge.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-purple-800/30 to-indigo-800/30 rounded-lg border border-purple-500/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-yellow-400/10 to-transparent" />
                    <h4 className="font-bold text-purple-200 mb-3 tracking-wider">EGYPTIAN MYSTERIES</h4>
                    <p className="text-sm text-purple-300 leading-relaxed">
                      Though not born in ancient Egypt, the tarot's imagery channels the profound symbolism of the
                      pharaohs, particularly through the Art Deco renaissance that married geometric precision with
                      mystical wisdom.
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-indigo-800/30 to-slate-800/30 rounded-lg border border-indigo-500/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-yellow-400/10 to-transparent" />
                    <h4 className="font-bold text-indigo-200 mb-3 tracking-wider">RENAISSANCE ALCHEMY</h4>
                    <p className="text-sm text-indigo-300 leading-relaxed">
                      The Renaissance obsession with Hermetic philosophy, sacred geometry, and Neoplatonic mysteries
                      infused the tarot with layers of symbolic meaning that transcend mere fortune-telling.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 border-2 border-purple-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500" />
              <CardHeader className="relative">
                <CardTitle className="text-purple-200 font-serif tracking-wider">Timeline of Tarot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className="border-purple-400/50 text-purple-300 bg-purple-900/30 min-w-[100px] font-bold tracking-wide"
                    >
                      1440s
                    </Badge>
                    <p className="text-sm text-gray-700">First tarot decks appear in Northern Italy</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className="border-purple-400/50 text-purple-300 bg-purple-900/30 min-w-[100px] font-bold tracking-wide"
                    >
                      1781
                    </Badge>
                    <p className="text-sm text-gray-700">Antoine Court de Gébelin links tarot to ancient Egypt</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className="border-purple-400/50 text-purple-300 bg-purple-900/30 min-w-[100px] font-bold tracking-wide"
                    >
                      1909
                    </Badge>
                    <p className="text-sm text-gray-700">
                      Rider-Waite deck published, becoming the most influential design
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className="border-purple-400/50 text-purple-300 bg-purple-900/30 min-w-[100px] font-bold tracking-wide"
                    >
                      1920s
                    </Badge>
                    <p className="text-sm text-gray-700">
                      Art Deco tarot designs emerge, emphasizing geometric symbolism
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="mt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 border-2 border-purple-500/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500" />
                <CardHeader className="relative">
                  <CardTitle className="text-purple-200 font-serif tracking-wider">Major Arcana (22 cards)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    The "Greater Secrets" represent major life themes, spiritual lessons, and archetypal energies.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">The Fool (0)</span>
                      <span className="text-gray-600">New beginnings</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">The Magician (I)</span>
                      <span className="text-gray-600">Manifestation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">The High Priestess (II)</span>
                      <span className="text-gray-600">Intuition</span>
                    </div>
                    <div className="text-center text-gray-500 py-2">... and 19 more</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 border-2 border-purple-500/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500" />
                <CardHeader className="relative">
                  <CardTitle className="text-purple-200 font-serif tracking-wider">Minor Arcana (56 cards)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    The "Lesser Secrets" deal with everyday situations and practical matters.
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <div className="font-medium text-blue-900">Cups (Water)</div>
                      <div className="text-sm text-blue-700">Emotions, relationships, spirituality</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded border border-red-200">
                      <div className="font-medium text-red-900">Wands (Fire)</div>
                      <div className="text-sm text-red-700">Passion, creativity, career</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <div className="font-medium text-gray-900">Swords (Air)</div>
                      <div className="text-sm text-gray-700">Thoughts, communication, conflict</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded border border-green-200">
                      <div className="font-medium text-green-900">Pentacles (Earth)</div>
                      <div className="text-sm text-green-700">Material world, money, health</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reading" className="mt-6 space-y-6">
            <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 border-2 border-purple-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500" />
              <CardHeader className="relative">
                <CardTitle className="text-purple-200 font-serif tracking-wider">Developing Your Intuition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-amber-900">Before You Begin</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Clear your mind and set an intention</li>
                      <li>• Create a quiet, sacred space</li>
                      <li>• Focus on a specific question or area of life</li>
                      <li>• Trust your first impressions</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-amber-900">Reading Techniques</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Notice which cards draw your attention</li>
                      <li>• Look for patterns in suits and numbers</li>
                      <li>• Consider the story the cards tell together</li>
                      <li>• Journal your interpretations</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">💡 Beginner's Tip</h4>
                  <p className="text-sm text-amber-800">
                    Don't worry about memorizing meanings. Instead, look at each card and ask: "What story is this image
                    telling me?" Your intuition knows more than you think.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 border-2 border-purple-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500" />
              <CardHeader className="relative">
                <CardTitle className="text-purple-200 font-serif tracking-wider">Common Spreads Explained</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Three Card Spread</h4>
                    <p className="text-sm text-green-800 mb-2">Perfect for daily guidance or simple questions</p>
                    <div className="text-xs text-green-700">Past → Present → Future | Situation → Action → Outcome</div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Celtic Cross</h4>
                    <p className="text-sm text-purple-800 mb-2">Comprehensive reading for complex situations</p>
                    <div className="text-xs text-purple-700">10 positions covering all aspects of your question</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mysticism" className="mt-6 space-y-6">
            <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 border-2 border-purple-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2 text-purple-200 font-serif tracking-wider">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Esoteric Connections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Kabbalah & Tree of Life</h4>
                    <p className="text-sm text-purple-800">
                      Each Major Arcana card corresponds to a path on the Kabbalistic Tree of Life, representing
                      different aspects of spiritual development and divine emanation.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Hebrew Alphabet</h4>
                    <p className="text-sm text-blue-800">
                      The 22 Major Arcana cards align with the 22 letters of the Hebrew alphabet, each carrying sacred
                      meaning and numerical significance in Jewish mysticism.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">Numerology in Tarot</h4>
                  <p className="text-sm text-amber-800 mb-3">
                    Numbers in tarot carry deep significance, reflecting universal patterns and cycles:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-amber-700">
                    <div>
                      <strong>1-3:</strong> Beginning, growth, creation
                    </div>
                    <div>
                      <strong>4-6:</strong> Stability, harmony, responsibility
                    </div>
                    <div>
                      <strong>7-9:</strong> Spirituality, completion, wisdom
                    </div>
                    <div>
                      <strong>10:</strong> Fulfillment, new cycles
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 border-2 border-purple-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2 text-purple-200 font-serif tracking-wider">
                  <Globe className="w-5 h-5 text-yellow-400" />
                  Connecting to Other Systems
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Tarot doesn't exist in isolation - it connects to many other divination and wisdom traditions:
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 rounded border border-orange-200">
                    <h4 className="font-medium text-orange-900">I Ching</h4>
                    <p className="text-sm text-orange-800">
                      Both systems use symbolic imagery to provide guidance. The 64 hexagrams of the I Ching can be
                      correlated with tarot combinations for deeper insight.
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <h4 className="font-medium text-green-900">Astrology</h4>
                    <p className="text-sm text-green-800">
                      Each tarot card has astrological correspondences - planets, signs, and elements that add layers of
                      meaning to readings.
                    </p>
                  </div>

                  <div className="p-3 bg-red-50 rounded border border-red-200">
                    <h4 className="font-medium text-red-900">Runes</h4>
                    <p className="text-sm text-red-800">
                      Like tarot, runes are symbols that speak to the unconscious mind, offering guidance through
                      archetypal imagery and ancient wisdom.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">🔮 Future Expansion</h4>
                  <p className="text-sm text-amber-800">
                    This application could integrate with I Ching hexagrams, astrological transits, and runic divination
                    to create a comprehensive spiritual guidance system, following the pattern recognition principles
                    explored by visionaries like Terence McKenna.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
