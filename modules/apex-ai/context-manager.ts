// Context management for conversations

import { ChatContext, AIMessage } from './types';

export interface ContextOptions {
  systemPrompt?: string;
  metadata?: Record<string, any>;
}

export class ContextManager {
  private contexts: Map<string, ChatContext>;
  private maxContexts: number;

  constructor(maxContexts: number = 100) {
    this.contexts = new Map();
    this.maxContexts = maxContexts;
  }

  createContext(conversationId: string, options?: ContextOptions): ChatContext {
    const context: ChatContext = {
      conversationId,
      messages: [],
      metadata: options?.metadata,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add system prompt if provided
    if (options?.systemPrompt) {
      context.messages.push({
        role: 'system',
        content: options.systemPrompt,
        timestamp: new Date(),
      });
    }

    // Check if we need to remove old contexts
    if (this.contexts.size >= this.maxContexts) {
      this.removeOldestContext();
    }

    this.contexts.set(conversationId, context);
    return context;
  }

  getContext(conversationId: string): ChatContext | undefined {
    return this.contexts.get(conversationId);
  }

  addMessage(conversationId: string, message: AIMessage): void {
    const context = this.contexts.get(conversationId);
    if (!context) {
      throw new Error(`Context not found: ${conversationId}`);
    }

    context.messages.push(message);
    context.updatedAt = new Date();
  }

  updateMetadata(conversationId: string, metadata: Record<string, any>): void {
    const context = this.contexts.get(conversationId);
    if (!context) {
      throw new Error(`Context not found: ${conversationId}`);
    }

    context.metadata = { ...context.metadata, ...metadata };
    context.updatedAt = new Date();
  }

  clearContext(conversationId: string): void {
    const context = this.contexts.get(conversationId);
    if (!context) {
      throw new Error(`Context not found: ${conversationId}`);
    }

    // Keep system messages
    const systemMessages = context.messages.filter((m) => m.role === 'system');
    context.messages = systemMessages;
    context.updatedAt = new Date();
  }

  deleteContext(conversationId: string): void {
    this.contexts.delete(conversationId);
  }

  listContexts(): string[] {
    return Array.from(this.contexts.keys());
  }

  getContextCount(): number {
    return this.contexts.size;
  }

  getAllContexts(): ChatContext[] {
    return Array.from(this.contexts.values());
  }

  private removeOldestContext(): void {
    let oldestId: string | null = null;
    let oldestDate: Date | null = null;

    for (const [id, context] of Array.from(this.contexts.entries())) {
      if (!oldestDate || context.updatedAt < oldestDate) {
        oldestDate = context.updatedAt;
        oldestId = id;
      }
    }

    if (oldestId) {
      this.contexts.delete(oldestId);
    }
  }

  exportContext(conversationId: string): string {
    const context = this.contexts.get(conversationId);
    if (!context) {
      throw new Error(`Context not found: ${conversationId}`);
    }

    return JSON.stringify(context, null, 2);
  }

  importContext(contextData: string): void {
    try {
      const context = JSON.parse(contextData) as ChatContext;

      // Convert date strings back to Date objects
      context.createdAt = new Date(context.createdAt);
      context.updatedAt = new Date(context.updatedAt);
      context.messages.forEach((msg) => {
        if (msg.timestamp) {
          msg.timestamp = new Date(msg.timestamp);
        }
      });

      this.contexts.set(context.conversationId, context);
    } catch (error) {
      throw new Error(
        `Failed to import context: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
