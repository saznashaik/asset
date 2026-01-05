"use client";

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
  },
  {
    title: 'Warranties Expiring (2025-2027)',
    value: '611',
    icon: CalendarClock,
  },
];

export default function ChatbotPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {kpiData.map((kpi) => (
                    <KpiCard key={kpi.title} {...kpi} />
                ))}
            </div>
            <div className="h-[calc(100vh-24rem)]">
                <iframe 
                    className="w-full h-full border-0 rounded-lg"
                    src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/430248170338/chatagents/15dcd6d3-12e0-4bcc-b0bb-999a4a3de9c3?directory_alias=Keerthisri">
                </iframe>
            </div>
        </div>
    );
}
