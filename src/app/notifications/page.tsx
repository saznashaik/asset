import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="flex justify-center items-center h-full">
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
  );
}
