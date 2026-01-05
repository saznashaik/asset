'use client';

import { Card } from "@/components/ui/card";

export function QuickSightEmbed() {
  const embedUrl = "https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/430248170338/dashboards/f9ae3294-c908-483f-91ef-8469921e94e7?directory_alias=Keerthisri"; 

  return (
    <Card className="h-full w-full border-0 rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          height="100%"
          width="100%"
          frameBorder="0"
          scrolling="no"
          title="QuickSight Dashboard"
        ></iframe>
    </Card>
  );
}
