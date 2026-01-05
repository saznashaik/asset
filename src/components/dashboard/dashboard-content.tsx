"use client"

import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Line, LineChart, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { AlertTriangle, Blocks, Clock, Wrench } from 'lucide-react';

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

const assetsByCategoryData = [
    { name: 'Servers', value: 4231, fill: 'var(--color-chart-1)' },
    { name: 'Workstations', value: 5892, fill: 'var(--color-chart-1)' },
    { name: 'Network', value: 2724, fill: 'var(--color-chart-1)' },
    { name: 'Mobile', value: 1843, fill: 'var(--color-chart-1)' },
    { name: 'Other', value: 954, fill: 'var(--color-chart-1)' },
];
const assetsChartConfig = {
  value: { label: "Assets" },
} satisfies ChartConfig

function AssetsByCategoryChart() {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Assets by Category</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={assetsChartConfig} className="h-[250px] w-full">
                    <BarChart data={assetsByCategoryData} accessibilityLayer layout="vertical" margin={{ left: 10, right: 30 }}>
                        <CartesianGrid horizontal={false} />
                        <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={10} />
                        <XAxis type="number" dataKey="value" hide />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))' }}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

const repairCostData = [
  { month: 'Jan', cost: 198 }, { month: 'Feb', cost: 224 },
  { month: 'Mar', cost: 201 }, { month: 'Apr', cost: 245 },
  { month: 'May', cost: 230 }, { month: 'Jun', cost: 260 },
  { month: 'Jul', cost: 290 }, { month: 'Aug', cost: 275 },
];

const repairCostChartConfig = {
  cost: { label: "Repair Cost", color: "hsl(var(--primary))" },
} satisfies ChartConfig

function RepairCostTrendChart() {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Repair Cost Trend</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={repairCostChartConfig} className="h-[250px] w-full">
                    <LineChart data={repairCostData} accessibilityLayer margin={{ left: -20, right: 20 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                        <YAxis domain={[150, 350]} tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `$${value}K`} />
                        <Tooltip cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '3 3' }} content={<ChartTooltipContent indicator="dot" />} />
                        <Line type="monotone" dataKey="cost" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ChartContainer>
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
            <div className="grid gap-6 lg:grid-cols-2">
                <AssetsByCategoryChart />
                <RepairCostTrendChart />
            </div>
        </div>
    );
}
