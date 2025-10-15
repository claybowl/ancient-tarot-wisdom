import { type NextRequest, NextResponse } from "next/server"
import { generateTarotReading, APIKeyError } from "@/lib/grok-reading"
import type { TarotCard, TarotSpread } from "@/types/tarot"

/**
 * POST /api/generate-reading
 * Body: { cards, spread, userPrompt, interpretationStyle, apiKey? }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { cards, spread, userPrompt, interpretationStyle, apiKey } = body as {
      cards: TarotCard[]
      spread: TarotSpread
      userPrompt: string
      interpretationStyle: string
      apiKey?: string
    }

    // Validate required fields
    if (!cards || !spread || !userPrompt || !interpretationStyle) {
      return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 })
    }

    const reading = await generateTarotReading({
      cards,
      spread,
      userPrompt,
      interpretationStyle,
      apiKey,
    })

    return NextResponse.json({ ok: true, reading })
  } catch (err) {
    console.error("API /generate-reading error:", err)

    // Handle APIKeyError specifically
    if (err instanceof APIKeyError) {
      return NextResponse.json({ ok: false, message: err.message }, { status: 400 })
    }

    // Handle other errors
    const errorMessage = err instanceof Error ? err.message : "Unable to generate reading."
    return NextResponse.json({ ok: false, message: errorMessage }, { status: 500 })
  }
}
