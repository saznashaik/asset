"use client"

import type { ReactNode } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Users, TrendingUp, TrendingDown, Activity, Star } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Line, LineChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { placeholderImages } from '@/lib/placeholder-images';

type StatCardProps = {
    title: string;
    value: string;
    change: string;
    icon: ReactNode;
    changeType: 'increase' | 'decrease';
};

function StatCard({ title, value, change, icon, changeType }: StatCardProps) {
    const isIncrease = changeType === 'increase';
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={`text-xs text-muted-foreground flex items-center ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
                    {isIncrease ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    {change} from last month
                </p>
            </CardContent>
        </Card>
    );
}

const salesData = [
    { month: 'Jan', sales: 4000 }, { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 }, { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 }, { month: 'Jun', sales: 5500 },
    { month: 'Jul', sales: 6500 }, { month: 'Aug', sales: 7000 },
];
const salesChartConfig = {
  sales: { label: "Sales", color: "hsl(var(--accent))" },
} satisfies ChartConfig

function SalesChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Last 8 months performance</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={salesChartConfig} className="h-[250px] w-full">
                    <BarChart data={salesData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `$${value / 1000}K`} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Bar dataKey="sales" fill="var(--color-sales)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

const satisfactionData = [
  { date: 'Wk 1', score: 92 }, { date: 'Wk 2', score: 94 },
  { date: 'Wk 3', score: 93 }, { date: 'Wk 4', score: 95 },
  { date: 'Wk 5', score: 96 }, { date: 'Wk 6', score: 94 },
];
const satisfactionChartConfig = {
  score: { label: "Score", color: "hsl(var(--primary))" },
} satisfies ChartConfig

function CustomerSatisfactionChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
                 <CardDescription>Weekly CSAT score</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={satisfactionChartConfig} className="h-[250px] w-full">
                    <LineChart data={satisfactionData} accessibilityLayer margin={{ left: -20, right: 20 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />
                        <YAxis domain={[85, 100]} tickLine={false} axisLine={false} tickMargin={10} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                        <Line type="monotone" dataKey="score" stroke="var(--color-score)" strokeWidth={2} dot={{ r: 5, fill: "var(--color-score)" }} activeDot={{ r: 7 }} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

function QuickSightDashboard({ id, title }: { id: string; title: string }) {
    const image = placeholderImages.find(img => img.id === id);

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {image ? (
                    <div className="aspect-video overflow-hidden rounded-lg border">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            width={800}
                            height={450}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                            data-ai-hint={image.imageHint}
                        />
                    </div>
                ) : <div className="aspect-video bg-muted rounded-lg flex items-center justify-center"><p>Image not found</p></div>}
            </CardContent>
        </Card>
    );
}

export function DashboardContent() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Revenue" value="$45,231.89" change="+20.1%" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} changeType="increase" />
                <StatCard title="New Customers" value="+2,350" change="+180.1%" icon={<Users className="h-4 w-4 text-muted-foreground" />} changeType="increase" />
                <StatCard title="Avg. Response Time" value="32s" change="-2.4%" icon={<Activity className="h-4 w-4 text-muted-foreground" />} changeType="decrease" />
                <StatCard title="Satisfaction Score" value="98.2%" change="+1.2%" icon={<Star className="h-4 w-4 text-muted-foreground" />} changeType="increase" />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
                <SalesChart />
                <CustomerSatisfactionChart />
            </div>
             <div>
                <h2 className="text-2xl font-semibold tracking-tight mb-4">QuickSight Dashboards</h2>
                <div className="grid gap-4 lg:grid-cols-2">
                    <QuickSightDashboard id="qsd-1" title="Regional Performance" />
                    <QuickSightDashboard id="qsd-2" title="Product Analytics" />
                </div>
            </div>
        </div>
    );
}
