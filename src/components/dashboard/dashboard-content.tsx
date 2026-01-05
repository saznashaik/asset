"use client"

import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Blocks, Clock, Wrench } from 'lucide-react';
import { QuickSightEmbed } from '@/components/dashboard/quicksight-embed';

type StatCardProps = {
    title: string;
    value: string;
    change?: string;
    icon: ReactNode;
    changeType?: 'increase' | 'decrease';
    details: string;
    iconBgColor: string;
};

function StatCard({ title, value, change, icon, changeType, details, iconBgColor }: StatCardProps) {
    const isIncrease = changeType === 'increase';
    const changeColor = isIncrease ? 'text-green-600' : 'text-red-600';
    return (
        <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                    <div className="text-3xl font-bold">{value}</div>
                </div>
                <div className={`p-2 rounded-md ${iconBgColor}`}>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                {change && (
                  <div className="text-xs font-medium flex items-center">
                    <span className={changeColor}>{change}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1">{details}</p>
            </CardContent>
        </Card>
    );
}

export function DashboardContent() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Total Assets"
                  value="12,847"
                  change="+5.2%"
                  icon={<Blocks className="h-6 w-6 text-blue-500" />}
                  iconBgColor="bg-blue-100"
                  details="Servers: 4,231 | Workstations: 5,892"
                  changeType="increase"
                />
                <StatCard
                  title="High-Risk Assets"
                  value="247"
                  change="+12.3%"
                  icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
                  iconBgColor="bg-red-100"
                  details="Critical: 47 | High: 124"
                  changeType="increase"
                />
                <StatCard
                  title="Repair Cost (12M)"
                  value="$847K"
                  change="+8.1%"
                  icon={<Wrench className="h-6 w-6 text-orange-500" />}
                  iconBgColor="bg-orange-100"
                  details="Q1: $198K | Q2: $224K"
                  changeType="increase"
                />
                <StatCard
                  title="Avg Downtime/Asset"
                  value="4.2h"
                  change="-3.2%"
                  icon={<Clock className="h-6 w-6 text-purple-500" />}
                  iconBgColor="bg-purple-100"
                  details="Target: <3h | Best: 1.8h"
                  changeType="decrease"
                />
            </div>
            <div className="grid gap-6 lg:grid-cols-1">
                <QuickSightEmbed />
            </div>
        </div>
    );
}
