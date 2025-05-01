import { generateText, tool } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { openRouter } from "../../ai/open-router";

export async function GET(request: NextRequest) {
	const result = await generateText({
		model: openRouter.chat("openai/gpt-4o-2024-11-20"),
		tools: {
			github: tool({
				description: "Ferramenta para buscar dados de um usuário no Github",
				parameters: z.object({
					username: z.string().describe("Username do usuário no Github"),
				}),
				execute: async ({ username }) => {
					const response = await fetch(
						`https://api.github.com/users/${username}`,
					);

					const data = await response.json();

					return JSON.stringify(data);
				},
			}),
		},
		prompt: "Quantos repositórios públicos possui deibsoncogo no Github?",
	});

	return NextResponse.json({
		message: result.text,
		parts: result.toolResults,
	});
}
