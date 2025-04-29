import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const result = await generateText({
		model: openai("gpt-4o"),
		prompt: 'Traduza "Hello World" para português!',
		system:
			"Você é uma AI especializada em tradução, sempre retorno da maneiro mais sucinta",
	});

	return NextResponse.json({ message: result.text });
}
