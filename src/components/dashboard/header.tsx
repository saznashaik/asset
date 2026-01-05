"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { MessageSquare, RefreshCw, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChatAgentDialog } from '@/components/ai/chat-agent-dialog';
import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const { toast } = useToast();
  const [isChatOpen, setChatOpen] = useState(false);

  const handleRefresh = () => {
    toast({
      title: "Refreshing Data",
      description: "Dashboard data is being updated.",
    });
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold hidden sm:block">Executive Dashboard</h1>
      </div>

      <div className="flex w-full items-center gap-4 justify-end">
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
          <span className="hidden sm:inline ml-2">Refresh</span>
        </Button>
        <ChatAgentDialog open={isChatOpen} onOpenChange={setChatOpen}>
            <Button variant="accent">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Ask AI</span>
            </Button>
        </ChatAgentDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9 border">
                <AvatarImage src="https://picsum.photos/seed/1/40/40" alt="User avatar" data-ai-hint="person face" />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
