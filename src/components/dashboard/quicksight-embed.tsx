'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickSightEmbed() {
  const embedUrl = "https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/430248170338/dashboards/f9ae3294-c908-483f-91ef-8469921e94e7?directory_alias=Keerthisri"; 

  return (
    <Card className="shadow-sm h-[800px] w-full">
      <CardHeader>
        <CardTitle>Asset Management Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-full pb-6">
        <iframe
          src={embedUrl}
          height="100%"
          width="100%"
          frameBorder="0"
          scrolling="no"
          title="QuickSight Dashboard"
        ></iframe>
      </CardContent>
    </Card>
  );
}
