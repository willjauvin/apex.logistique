import DashboardLayout from '@/components/DashboardLayout';
import ChatInterface from '@/components/ui/ChatInterface';

export default function AIAssistantPage() {
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-180px)]">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">AI Assistant</h1>
          <p className="text-slate-500 mt-1">Chat with Apex AI to get insights and recommendations</p>
        </div>

        <div className="h-[calc(100%-80px)]">
          <ChatInterface moduleContext="general" />
        </div>
      </div>
    </DashboardLayout>
  );
}
