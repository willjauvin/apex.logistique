// Chat conversation engine

import { AIService } from './ai-service';
import { ContextManager } from './context-manager';
import { AIMessage, AIResponse, AIServiceOptions } from './types';

export interface ChatEngineConfig {
  maxHistoryLength?: number;
  systemPrompt?: string;
}

export class ChatEngine {
  private aiService: AIService;
  private contextManager: ContextManager;
  private config: ChatEngineConfig;

  constructor(
    aiService: AIService,
    contextManager: ContextManager,
    config?: ChatEngineConfig
  ) {
    this.aiService = aiService;
    this.contextManager = contextManager;
    this.config = {
      maxHistoryLength: config?.maxHistoryLength ?? 20,
      systemPrompt: config?.systemPrompt,
    };
  }

  async sendMessage(
    conversationId: string,
    userMessage: string,
    options?: AIServiceOptions
  ): Promise<AIResponse> {
    try {
      // Get or create conversation context
      let context = this.contextManager.getContext(conversationId);
      if (!context) {
        context = this.contextManager.createContext(conversationId, {
          systemPrompt: this.config.systemPrompt,
        });
      }

      // Add user message to context
      const userMsg: AIMessage = {
        role: 'user',
        content: userMessage,
        timestamp: new Date(),
      };
      this.contextManager.addMessage(conversationId, userMsg);

      // Get messages for AI (with history limit)
      const messages = this.getMessagesForAI(conversationId);

      // Get AI response
      const response = await this.aiService.chat(messages, options);

      // Add assistant response to context
      const assistantMsg: AIMessage = {
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
      };
      this.contextManager.addMessage(conversationId, assistantMsg);

      return response;
    } catch (error) {
      throw new Error(
        `Chat Engine Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async sendSystemMessage(
    conversationId: string,
    systemMessage: string,
    options?: AIServiceOptions
  ): Promise<AIResponse> {
    try {
      // Get or create conversation context
      let context = this.contextManager.getContext(conversationId);
      if (!context) {
        context = this.contextManager.createContext(conversationId);
      }

      // Add system message
      const sysMsg: AIMessage = {
        role: 'system',
        content: systemMessage,
        timestamp: new Date(),
      };
      this.contextManager.addMessage(conversationId, sysMsg);

      // Get messages for AI
      const messages = this.getMessagesForAI(conversationId);

      // Get AI response
      const response = await this.aiService.chat(messages, options);

      // Add assistant response to context
      const assistantMsg: AIMessage = {
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
      };
      this.contextManager.addMessage(conversationId, assistantMsg);

      return response;
    } catch (error) {
      throw new Error(
        `Chat Engine Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private getMessagesForAI(conversationId: string): AIMessage[] {
    const context = this.contextManager.getContext(conversationId);
    if (!context) {
      return [];
    }

    const messages = [...context.messages];
    const systemMessages = messages.filter((m) => m.role === 'system');
    const conversationMessages = messages.filter((m) => m.role !== 'system');

    // Apply history limit to conversation messages only
    const limitedConversation =
      conversationMessages.length > this.config.maxHistoryLength!
        ? conversationMessages.slice(-this.config.maxHistoryLength!)
        : conversationMessages;

    // Combine: system messages first, then limited conversation
    return [...systemMessages, ...limitedConversation];
  }

  getConversationHistory(conversationId: string): AIMessage[] {
    const context = this.contextManager.getContext(conversationId);
    return context ? [...context.messages] : [];
  }

  clearConversation(conversationId: string): void {
    this.contextManager.clearContext(conversationId);
  }

  deleteConversation(conversationId: string): void {
    this.contextManager.deleteContext(conversationId);
  }

  listConversations(): string[] {
    return this.contextManager.listContexts();
  }

  updateSystemPrompt(systemPrompt: string): void {
    this.config.systemPrompt = systemPrompt;
  }

  getSystemPrompt(): string | undefined {
    return this.config.systemPrompt;
  }
}
