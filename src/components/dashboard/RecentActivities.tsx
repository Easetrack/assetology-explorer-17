
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Package, MoveRight, Clipboard, AlertTriangle } from 'lucide-react';

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: 'received',
      asset: 'MacBook Pro M2',
      user: 'Sarah Johnson',
      initials: 'SJ',
      time: '10 minutes ago',
      icon: <Package className="h-4 w-4" />,
      color: 'bg-emerald-500'
    },
    {
      id: 2,
      type: 'assessment',
      asset: 'Office Chair XT50',
      user: 'Michael Chen',
      initials: 'MC',
      time: '1 hour ago',
      icon: <Clipboard className="h-4 w-4" />,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      type: 'move',
      asset: 'Projector P300',
      user: 'Emily Rodriguez',
      initials: 'ER',
      time: '3 hours ago',
      icon: <MoveRight className="h-4 w-4" />,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      type: 'alert',
      asset: 'Server Rack R20',
      user: 'David Kim',
      initials: 'DK',
      time: '5 hours ago',
      icon: <AlertTriangle className="h-4 w-4" />,
      color: 'bg-amber-500'
    },
    {
      id: 5,
      type: 'received',
      asset: 'Desktop Monitors x4',
      user: 'Alex Taylor',
      initials: 'AT',
      time: '1 day ago',
      icon: <Package className="h-4 w-4" />,
      color: 'bg-emerald-500'
    },
  ];

  const getActivityText = (type: string, asset: string) => {
    switch (type) {
      case 'received':
        return `Received ${asset}`;
      case 'assessment':
        return `Assessed ${asset}`;
      case 'move':
        return `Moved ${asset} to Storage B`;
      case 'alert':
        return `Flagged ${asset} for maintenance`;
      default:
        return `Updated ${asset}`;
    }
  };

  return (
    <Card className="dashboard-card h-full animate-fade-in" style={{ animationDelay: '200ms' }}>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>
          Latest asset management activities
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[360px]">
          <div className="px-6">
            {activities.map((activity) => (
              <div 
                key={activity.id} 
                className="py-4 flex items-start gap-4 border-b border-border/40 last:border-0"
              >
                <div className={`${activity.color} p-2 rounded-full text-white mt-0.5 flex-shrink-0`}>
                  {activity.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">
                    {getActivityText(activity.type, activity.asset)}
                  </p>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {activity.time}
                  </p>
                </div>
                
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback>{activity.initials}</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
