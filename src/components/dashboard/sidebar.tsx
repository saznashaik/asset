"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, LayoutDashboard, MessageCircle, Bell } from 'lucide-react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, startsWith: '/dashboard' },
    { href: '/chatbot', label: 'Chat AI', icon: MessageCircle, startsWith: '/chatbot' },
    { href: '/notifications', label: 'Notifications', icon: Bell, startsWith: '/notifications' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <Link href="/" className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <div className="bg-primary text-primary-foreground rounded-md p-2">
                <Bot size={24} />
            </div>
            <span className="text-xl font-bold text-foreground group-data-[collapsible=icon]:hidden">AssetAI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2 flex-1">
        <SidebarMenu>
          {menuItems.map(item => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === item.href || (item.startsWith && pathname.startsWith(item.startsWith))} 
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon className="text-sidebar-accent-foreground"/>
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
