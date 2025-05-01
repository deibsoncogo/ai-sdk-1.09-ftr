import { generateText } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { openRouter } from "./open-router";

export async function GET(request: NextRequest) {
	const result = await generateText({
		model: openRouter.chat("openai/chatgpt-4o-latest"),
		prompt: 'Traduza "Hello World" para português!',
		system: "Você é uma AI especializada em tradução",
	});

	return NextResponse.json({ message: result.text });
}
