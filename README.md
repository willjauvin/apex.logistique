# Apex Intel - Modular AI Platform

A comprehensive AI-powered logistics and business intelligence platform built with Next.js 14, featuring modular architecture and provider-agnostic AI capabilities.

## Features

### Core Platform
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Modular Architecture**: Plug-and-play modules for different business domains
- **Provider-Agnostic AI**: Support for OpenAI, Gemini, Anthropic, and local models
- **Real-time Dashboard**: Interactive metrics and insights
- **Responsive Design**: Mobile-first approach with modern UI/UX

### Apex AI Module
- Conversational AI assistant with ChatGPT-like interface
- Context-aware conversations
- Multi-provider AI support (OpenAI, Gemini, Anthropic, Local)
- Streaming responses
- Dynamic prompt generation
- Data analysis and insights

### Logistics Module
- **Route Optimization**: Haversine-based distance calculations and nearest neighbor algorithms
- **Fleet Management**: Vehicle tracking, utilization analysis, and performance metrics
- **Delivery Prediction**: ML-based ETA predictions with traffic and weather factors
- **Cost Analysis**: Fuel cost estimation and savings calculations

### Analytics Module
- **Time Series Analysis**: Trend detection and forecasting
- **Anomaly Detection**: Identify unusual patterns in data
- **KPI Tracking**: Monitor key performance indicators
- **Metrics Dashboard**: Visual representation of business metrics
- **Comparative Analysis**: Compare datasets and identify improvements

### Automation Module
- **Workflow Engine**: Build custom workflows with conditional logic
- **Task Scheduler**: Schedule recurring and one-time tasks
- **Event Triggers**: Trigger actions based on events
- **Execution History**: Track workflow runs and results
- **Retry Policies**: Automatic retry on failures

## Project Structure

```
apex-intel/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   └── ai/                   # AI endpoints
│   │       ├── chat/             # Chat API
│   │       └── analyze/          # Analysis API
│   ├── dashboard/                # Dashboard pages
│   │   ├── ai-assistant/         # AI chat interface
│   │   ├── logistics/            # Logistics module
│   │   ├── analytics/            # Analytics module
│   │   ├── automation/           # Automation module
│   │   └── reports/              # Reports page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # UI components
│   │   └── ChatInterface.tsx     # Chat UI
│   ├── DashboardLayout.tsx       # Dashboard wrapper
│   ├── Sidebar.tsx               # Navigation sidebar
│   ├── Header.tsx                # Page header
│   ├── StatsCards.tsx            # Metrics cards
│   ├── RecentShipments.tsx       # Shipments list
│   └── QuickActions.tsx          # Action buttons
├── modules/                      # Core business modules
│   ├── apex-ai/                  # AI module
│   │   ├── types.ts              # Type definitions
│   │   ├── ai-service.ts         # AI provider service
│   │   ├── chat-engine.ts        # Chat management
│   │   ├── context-manager.ts    # Context handling
│   │   ├── prompt-builder.ts     # Prompt templates
│   │   └── index.ts              # Module exports
│   ├── logistics/                # Logistics module
│   │   ├── route-optimizer.ts    # Route optimization
│   │   ├── fleet-manager.ts      # Fleet management
│   │   ├── delivery-predictor.ts # Delivery predictions
│   │   └── index.ts              # Module exports
│   ├── analytics/                # Analytics module
│   │   ├── data-analyzer.ts      # Data analysis
│   │   ├── metrics-tracker.ts    # KPI tracking
│   │   └── index.ts              # Module exports
│   └── automation/               # Automation module
│       ├── workflow-engine.ts    # Workflow execution
│       ├── scheduler.ts          # Task scheduling
│       └── index.ts              # Module exports
├── lib/                          # Shared libraries
│   └── supabase.ts               # Supabase client
├── utils/                        # Utility functions
│   └── format.ts                 # Formatting helpers
└── supabase/                     # Database migrations
    └── migrations/               # SQL migrations

```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (for database)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Database Setup

The platform uses Supabase for data persistence. Database migrations are included for:

- Organizations
- Conversations and messages
- AI insights
- Custom module tables

## AI Provider Configuration

The platform supports multiple AI providers. To configure:

1. **OpenAI**: Add `OPENAI_API_KEY` to environment variables
2. **Gemini**: Add `GEMINI_API_KEY` to environment variables
3. **Anthropic**: Add `ANTHROPIC_API_KEY` to environment variables
4. **Local Models**: Configure `baseURL` in AI service config

## Module Development

Each module follows a standard structure:

```typescript
// Module exports
export { MainClass } from './main-class';
export * from './types';

export const ModuleName = {
  name: 'Module Name',
  slug: 'module-slug',
  version: '1.0.0',
  description: 'Module description',
  features: ['Feature 1', 'Feature 2'],
};
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **AI**: Multi-provider support
- **State**: React Hooks
- **API**: Next.js API Routes

## Key Design Decisions

### Provider-Agnostic Architecture
The AI service layer abstracts provider-specific implementations, allowing easy switching between OpenAI, Gemini, Anthropic, or local models.

### Modular Design
Each business domain is isolated into its own module with clear interfaces, making it easy to add, remove, or modify modules independently.

### TypeScript Best Practices
- Strict type checking
- Interface-based design
- Array.from() for Map iterations (TypeScript compatibility)
- Comprehensive error handling

### Performance Optimizations
- Static page generation where possible
- Code splitting
- Lazy loading
- Optimized bundle size

## Production Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## License

Proprietary - Apex Intel Platform

## Support

For support and inquiries, contact the development team.

---

Built with Next.js and TypeScript
