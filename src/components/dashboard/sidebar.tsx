"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, LayoutDashboard, MessageSquare } from 'lucide-react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <div className="bg-primary text-primary-foreground rounded-lg p-2">
                <Bot size={24} />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">AssetAI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/'} tooltip="Chatbot">
              <Link href="/">
                <MessageSquare />
                Chatbot
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard')} tooltip="Dashboard">
              <Link href="/dashboard">
                <LayoutDashboard />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
