// TypeScript types for AI system

export type AIProvider = 'openai' | 'gemini' | 'anthropic' | 'local';

export interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  baseURL?: string; // For local models
}

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason?: string;
}

export interface ChatContext {
  conversationId: string;
  messages: AIMessage[];
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromptTemplate {
  id: string;
  name: string;
  template: string;
  variables: string[];
  category?: string;
}

export interface StreamChunk {
  content: string;
  isComplete: boolean;
}

export type AIStreamCallback = (chunk: StreamChunk) => void;

export interface AIServiceOptions {
  streaming?: boolean;
  onStream?: AIStreamCallback;
}

export interface AnalysisRequest {
  type: 'sales' | 'performance' | 'financial' | 'logistics' | 'general';
  data: Record<string, unknown>;
  question?: string;
  context?: Record<string, unknown>;
}

export interface AnalysisResult {
  summary: string;
  insights: string[];
  recommendations: string[];
  visualizations?: Record<string, unknown>;
  confidence: number;
}
