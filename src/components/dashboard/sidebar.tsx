"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, LayoutDashboard, MessageCircle, User } from 'lucide-react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';


export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, startsWith: '/dashboard' },
    { href: '/chatbot', label: 'Chat AI', icon: MessageCircle, startsWith: '/chatbot' },
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
      <Separator />
       <SidebarFooter className="p-4">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                    <AvatarImage src="https://picsum.photos/seed/2/40/40" alt="Sarah Chen" data-ai-hint="person face" />
                    <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <div className="group-data-[collapsible=icon]:hidden">
                    <p className="font-semibold text-sm">Sarah Chen</p>
                    <p className="text-xs text-muted-foreground">IT Operations Lead</p>
                </div>
            </div>
      </SidebarFooter>
    </Sidebar>
  );
}
