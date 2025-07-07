import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"
import type { TarotCard, TarotSpread } from "@/types/tarot"

interface ReadingParams {
  cards: TarotCard[]
  spread: TarotSpread
  userPrompt: string
  interpretationStyle: string
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

export async function generateTarotReading({
  cards,
  spread,
  userPrompt,
  interpretationStyle,
}: ReadingParams): Promise<AIReading> {
  const cardDescriptions = cards
    .map(
      (card, index) =>
        `Position ${index + 1} (${spread.positions[index].name}): ${card.name} of ${card.suit} - Keywords: ${card.keywords.join(", ")}`,
    )
    .join("\n")

  const spreadDescription = spread.positions.map((pos) => `${pos.name}: ${pos.description}`).join("\n")

  const prompt = `You are a master tarot reader with deep knowledge of symbolism, psychology, and mystical traditions. 

READING CONTEXT:
Spread: ${spread.name}
Interpretation Style: ${interpretationStyle}
User's Question/Situation: "${userPrompt}"

SPREAD POSITIONS:
${spreadDescription}

CARDS DRAWN:
${cardDescriptions}

Please provide a comprehensive tarot reading in JSON format with the following structure:

{
  "overallReading": "A detailed 3-4 paragraph overall interpretation that weaves together all the cards in relation to the user's question, considering the spread positions and their meanings. Make this deeply insightful and personalized to their situation.",
  
  "cardInterpretations": {
    "0": {
      "meaning": "Detailed interpretation of the first card in its position, relating to the user's question",
      "advice": "Specific guidance and advice based on this card",
      "symbolism": "Deep symbolic meaning and archetypal significance"
    },
    "1": {
      "meaning": "Detailed interpretation of the second card in its position",
      "advice": "Specific guidance and advice based on this card", 
      "symbolism": "Deep symbolic meaning and archetypal significance"
    }
    // Continue for all cards...
  },
  
  "keyInsights": [
    "3-5 key insights or revelations from the reading",
    "Each should be profound and actionable"
  ],
  
  "actionSteps": [
    "3-5 specific action steps the user can take",
    "Based on the guidance from the cards"
  ]
}

INTERPRETATION STYLE GUIDELINES:
- Traditional: Focus on classic meanings, established symbolism, and time-tested interpretations
- Intuitive: Emphasize feelings, first impressions, and personal resonance with the imagery
- Psychological: Use Jungian concepts, archetypes, and psychological insights
- Mystical: Incorporate Kabbalah, numerology, esoteric wisdom, and spiritual connections

Make the reading deeply personal, insightful, and actionable. Use rich, evocative language that captures the mystical nature of tarot while providing practical wisdom. Ensure each card interpretation is substantial (2-3 paragraphs) and directly relates to the user's question and the card's position in the spread.`

  try {
    const { text } = await generateText({
      model: xai("grok-3"),
      prompt,
      temperature: 0.7,
      maxTokens: 4000,
    })

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Invalid response format from AI")
    }

    const reading = JSON.parse(jsonMatch[0]) as AIReading

    // Validate the response structure
    if (!reading.overallReading || !reading.cardInterpretations || !reading.keyInsights || !reading.actionSteps) {
      throw new Error("Incomplete reading response")
    }

    return reading
  } catch (error) {
    console.error("Error generating tarot reading:", error)
    throw new Error("Failed to generate reading")
  }
}
