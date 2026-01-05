"use client"

import { QuickSightEmbed } from '@/components/dashboard/quicksight-embed';

export function DashboardContent() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-1">
                <QuickSightEmbed />
            </div>
        </div>
    );
}
