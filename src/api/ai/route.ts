import { generateObject } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { openRouter } from "./open-router";

export async function GET(request: NextRequest) {
	const result = await generateObject({
		model: openRouter.chat("openai/gpt-4o-2024-11-20"),
		schema: z.object({
			en: z.string().describe("Tradução para inglês"),
			fr: z.string().describe("Tradução para francês"),
			es: z.string().describe("Tradução para espanhol"),
		}),
		prompt: 'Traduza "Hello World" para diferentes idiomas!',
		system: "Você é uma AI especializada em tradução",
	});

	return NextResponse.json({ message: result.object });
}
