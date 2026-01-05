import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from '@/components/dashboard/kpi-card';
import { Bell, DollarSign, ShieldAlert, Hammer, CalendarClock } from "lucide-react";

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
    change: ' ',
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

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {kpiData.map((kpi) => (
              <KpiCard key={kpi.title} {...kpi} />
          ))}
      </div>
      <div className="flex justify-center items-center">
          <Card className="w-full max-w-md text-center shadow-lg">
              <CardHeader>
                  <CardTitle className="flex justify-center items-center gap-2">
                      <Bell className="h-6 w-6" />
                      Notifications
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">You get notifications here.</p>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
