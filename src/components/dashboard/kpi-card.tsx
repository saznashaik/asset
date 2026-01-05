"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    change?: string;
    changeType?: 'increase' | 'decrease';
}

export function KpiCard({ title, value, icon: Icon, change, changeType }: KpiCardProps) {
    return (
        <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={cn("h-5 w-5 text-muted-foreground", {
                    'text-red-500': changeType === 'increase',
                    'text-green-500': changeType === 'decrease'
                })} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change && <p className="text-xs text-muted-foreground">
                    {change}
                </p>}
            </CardContent>
        </Card>
    );
}
