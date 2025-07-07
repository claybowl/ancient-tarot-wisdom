export interface TarotCard {
  id: number
  name: string
  suit: string
  type: "Major" | "Minor" | "Court"
  number: number
  upright: boolean
  keywords: string[]
}

export interface SpreadPosition {
  id: number
  name: string
  description: string
}

export interface TarotSpread {
  id: string
  name: string
  description: string
  positions: SpreadPosition[]
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  icon: any
  color: string
}

export interface InterpretationStyle {
  id: string
  name: string
  description: string
}
