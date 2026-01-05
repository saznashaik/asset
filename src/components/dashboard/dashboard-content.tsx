
"use client"

import { QuickSightEmbed } from '@/components/dashboard/quicksight-embed';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { DollarSign, ShieldAlert, Hammer, CalendarClock } from 'lucide-react';

const kpiData = [
  {
    title: 'Total Assets',
    value: '2,000',
    icon: DollarSign,
  },
  {
    title: 'High Risk & Critical Risks',
    value: '500',
    icon: ShieldAlert,
    change: 'Critical',
    changeType: 'increase' as const,
  },
  {
    title: 'Replacement Cost',
    value: '$1,460,174',
    icon: DollarSign,
  },
  {
    title: 'Assets Currently in Repair',
    value: '679 (34.0%)',
    icon: Hammer,
    change: 'Critical',
    changeType: 'increase' as const,
  },
  {
    title: 'Warranties Expiring (2025-2027)',
    value: '611',
    icon: CalendarClock,
  },
];

export function DashboardContent() {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
