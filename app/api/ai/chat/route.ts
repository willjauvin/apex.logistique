import { NextResponse } from "next/server";
import { AIService } from "@/modules/apex-ai/ai-service";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message requis" },
        { status: 400 }
      );
    }

    const ai = new AIService({
      provider: "gemini",
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-1.5-flash",
      temperature: 0.7,
      maxTokens: 1000,
    });

    const response = await ai.chat([
      {
        role: "system",
        content: "Tu es Apex, une IA intelligente pour business et logistique.",
      },
      {
        role: "user",
        content: message,
      },
    ]);

    return NextResponse.json({
      success: true,
      response: response.content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
    return NextResponse.json({
      success: true,
      response: mockResponse.message,
      confidence: mockResponse.confidence,
      suggestions: mockResponse.suggestions,
      metadata: mockResponse.metadata,
      conversationHistory: [],
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) {
      return NextResponse.json(
        { error: 'conversationId is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      conversationId,
      history: [],
      messageCount: 0,
    });
  } catch (error) {
    console.error('Chat history API error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve conversation history' },
      { status: 500 }
    );
  }
}
