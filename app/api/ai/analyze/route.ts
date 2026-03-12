import { NextResponse } from 'next/server';
import { AnalysisRequest } from '@/modules/apex-ai/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data, question, context } = body as AnalysisRequest;

    if (!type || !data) {
      return NextResponse.json(
        { error: 'Type and data are required' },
        { status: 400 }
      );
    }

    const mockAnalysis = {
      message: 'Analysis complete. The data shows positive trends with opportunities for optimization.',
      confidence: 0.85,
    };

    return NextResponse.json({
      success: true,
      analysis: {
        summary: mockAnalysis.message,
        insights: extractInsights(mockAnalysis.message),
        recommendations: extractRecommendations(mockAnalysis.message),
        confidence: mockAnalysis.confidence || 0.8,
      },
      metadata: {
        analysisType: type,
        dataSize: JSON.stringify(data).length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Analysis API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze data' },
      { status: 500 }
    );
  }
}

function extractInsights(text: string): string[] {
  const insights: string[] = [];
  const lines = text.split('\n');

  let inInsightsSection = false;
  for (const line of lines) {
    if (line.toLowerCase().includes('insight') || line.toLowerCase().includes('key finding')) {
      inInsightsSection = true;
      continue;
    }
    if (inInsightsSection && line.trim().match(/^[-•*]\s/)) {
      insights.push(line.trim().replace(/^[-•*]\s/, ''));
    }
    if (line.toLowerCase().includes('recommendation')) {
      inInsightsSection = false;
    }
  }

  return insights.length > 0 ? insights : ['Analysis completed - configure AI provider for detailed insights'];
}

function extractRecommendations(text: string): string[] {
  const recommendations: string[] = [];
  const lines = text.split('\n');

  let inRecommendationsSection = false;
  for (const line of lines) {
    if (line.toLowerCase().includes('recommendation')) {
      inRecommendationsSection = true;
      continue;
    }
    if (inRecommendationsSection && line.trim().match(/^[-•*\d.]\s/)) {
      recommendations.push(line.trim().replace(/^[-•*\d.]\s/, ''));
    }
  }

  return recommendations.length > 0 ? recommendations : ['Configure AI provider for personalized recommendations'];
}
