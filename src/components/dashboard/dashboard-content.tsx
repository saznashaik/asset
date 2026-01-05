"use client"

import { QuickSightEmbed } from '@/components/dashboard/quicksight-embed';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { DollarSign, ShieldAlert, Wrench, Clock } from 'lucide-react';

const kpiData = [
  {
    title: 'Total Assets',
    value: '12,847',
    icon: DollarSign,
    change: '+2.5%',
    changeType: 'increase' as const,
  },
  {
    title: 'High-Risk Assets',
    value: '247',
    icon: ShieldAlert,
    change: '-1.2%',
    changeType: 'decrease' as const,
  },
  {
    title: 'Repair Cost (12m)',
    value: '$847K',
    icon: Wrench,
    change: '+5.8%',
    changeType: 'increase' as const,
  },
  {
    title: 'Avg. Downtime/Asset',
    value: '4.2h',
    icon: Clock,
    change: '+0.5h',
    changeType: 'increase' as const,
  },
];

export function DashboardContent() {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {kpiData.map((kpi) => (
                    <KpiCard key={kpi.title} {...kpi} />
                ))}
            </div>
            <div className="h-[calc(100vh-16rem)]">
                <QuickSightEmbed />
            </div>
        </div>
    );
}
