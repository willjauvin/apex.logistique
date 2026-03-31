import { NextResponse } from "next/server";
import { AIService } from "@/modules/apex-ai/ai-service";
import type { AIProvider, AIMessage } from "@/modules/apex-ai/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      message,
      conversationId = "default",
      provider = "gemini",
    }: {
      message: string;
      conversationId?: string;
      provider?: AIProvider;
    } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message requis" },
        { status: 400 }
      );
    }

    const ai = new AIService({
      provider,
      apiKey:
        provider === "gemini"
          ? process.env.GEMINI_API_KEY
          : provider === "openai"
          ? process.env.OPENAI_API_KEY
          : undefined,
      model:
        provider === "gemini"
          ? "gemini-3.1-flash-lite-preview"
          : provider === "openai"
          ? "gpt-4o-mini"
          : "llama3",
      temperature: 0.7,
      maxTokens: 1000,
      baseURL: provider === "local" ? "http://localhost:11434" : undefined,
    });

  const messages: AIMessage[] = [
  {
    role: "system",
    content: `
Tu es Apex, une IA stratégique conçue pour aider à gérer, développer et optimiser des entreprises.

Domaines principaux :
- stratégie d’entreprise
- logistique et transport
- optimisation opérationnelle
- analyse de projets
- génération d’idées d’affaires
- soutien à SimpliShop et aux plateformes SaaS
- aide à la décision

Comportement attendu :
- Réponds toujours directement.
- Ne te présente jamais.
- N'utilise jamais de formule de salutation.
- Sois orienté action, performance, croissance et rentabilité.
- Quand c’est pertinent, propose une solution par étapes.
- Quand une idée semble faible, dis-le franchement mais de façon constructive.
- Quand plusieurs options existent, recommande la meilleure en premier.
- Mets l’accent sur les solutions réalistes, utiles et applicables.
- Garde un ton professionnel, intelligent et stratégique.

Format :
- Réponse courte à moyenne selon la question
- Sections courtes si utile
- Pas de blabla
- Pas de remplissage
`,
  },
  {
    role: "user",
    content: message,
  },
];

    const response = await ai.chat(messages);

    return NextResponse.json({
      success: true,
      response: response.content,
      metadata: {
        provider,
        conversationId,
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to process message",
      },
      { status: 500 }
    );
  }
}
