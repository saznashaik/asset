import { ChatPageContent } from '@/components/ai/chat-page-content';
import { AppSidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function ChatbotPage() {
  return (
    <SidebarProvider defaultOpen>
        <div className="flex min-h-screen">
            <AppSidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1">
                    <ChatPageContent />
                </main>
            </div>
        </div>
    </SidebarProvider>
  );
}
