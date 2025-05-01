import { openrouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import type { NextRequest } from "next/server";
import { tools } from "../../ai/tools";

export async function POST(request: NextRequest) {
	const { messages } = await request.json();

	const result = streamText({
		model: openrouter.chat("openai/gpt-4o-2024-11-20"),
		tools,
		messages,
		maxSteps: 5,
		toolChoice: "required",
		system: `
      Sempre responda em markdown sem aspas no início ou fim da mensagem.
    `,
	});

	return result.toDataStreamResponse();
}
