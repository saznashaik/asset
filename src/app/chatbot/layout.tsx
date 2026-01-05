import type { ReactNode } from 'react';
import { AppSidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function ChatbotLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
        <div className="flex min-h-screen bg-background">
            <AppSidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    </SidebarProvider>
  );
}
