"use client";

import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold">Executive Dashboard</h1>
        <span className="text-sm text-muted-foreground hidden sm:inline">| Last updated: 2 min ago</span>
      </div>

      <div className="flex w-full items-center gap-4 justify-end">
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Environment:</span>
            <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">Production</Badge>
        </div>
      </div>
    </header>
  );
}
