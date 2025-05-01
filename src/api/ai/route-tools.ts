import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateText, tool } from "ai";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
	const result = await generateText({
		model: openrouter.chat("openai/gpt-4o-2024-11-20"),
		tools: {
			profileAndUrls: tool({
				description:
					"Ferramenta serve para buscar do perfil de um usuário do GitHub ou acessar URLs da API para outras informações de um usuário como lista de organizações, repositórios, eventos, seguidores, seguindo, etc...",
				parameters: z.object({
					username: z.string().describe("Username do usuário no GitHub"),
				}),
				execute: async ({ username }) => {
					const response = await fetch(
						`https://api.github.com/users/${username}`,
					);

					const data = await response.json();

					return JSON.stringify(data);
				},
			}),

			fetchHTTP: tool({
				description:
					"Essa ferramenta serve para realizar uma requisição HTTP em uma URL especificada e acessar sua resposta",
				parameters: z.object({
					url: z.string().describe("URL a ser requisitada"),
				}),
				execute: async ({ url }) => {
					const response = await fetch(url);
					const data = await response.text();

					return data;
				},
			}),
		},
		prompt:
			"Me dê uma lista de usuários que o usuário diego3g segue no GitHub?",
		maxSteps: 5,

		onStepFinish({ toolResults }) {
			console.log(toolResults);
		},
	});

	return NextResponse.json({
		message: result.text,
		parts: result.toolResults,
	});
}
