"use client";

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  const pathname = usePathname();

  let title = 'Executive Dashboard';
  if (pathname.startsWith('/dashboard')) {
    title = 'Asset Management Executive Dashboard';
  } else if (pathname.startsWith('/chatbot')) {
    title = 'Chat with AssetBot';
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
    </header>
  );
}
