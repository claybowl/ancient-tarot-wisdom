import { type NextRequest, NextResponse } from "next/server"
import { generateTarotReading, APIKeyError } from "@/lib/grok-reading"
import type { TarotCard, TarotSpread } from "@/types/tarot"

/**
 * POST /api/generate-reading
 * Body: { cards, spread, userPrompt, interpretationStyle, apiKey? }
 */
export async function POST(req: NextRequest) {
  try {
    const { cards, spread, userPrompt, interpretationStyle, apiKey } = (await req.json()) as {
      cards: TarotCard[]
      spread: TarotSpread
      userPrompt: string
      interpretationStyle: string
      apiKey?: string
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

    if (err instanceof APIKeyError) {
      return NextResponse.json({ ok: false, message: err.message }, { status: 400 })
    }
    return NextResponse.json({ ok: false, message: "Unable to generate reading." }, { status: 500 })
  }
}
