'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickSightEmbed() {
  // TODO: Replace with your QuickSight embed URL
  const embedUrl = "https://your-quicksight-url.quicksight.aws.amazon.com/embed/12345/dashboards/67890"; 

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
