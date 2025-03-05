
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PerformanceMetrics = () => {
  const data = [
    { month: 'Jan', utilization: 85, value: 145000, maintenance: 12 },
    { month: 'Feb', utilization: 82, value: 142000, maintenance: 14 },
    { month: 'Mar', utilization: 91, value: 155000, maintenance: 11 },
    { month: 'Apr', utilization: 94, value: 165000, maintenance: 8 },
    { month: 'May', utilization: 87, value: 152000, maintenance: 9 },
    { month: 'Jun', utilization: 93, value: 168000, maintenance: 7 },
    { month: 'Jul', utilization: 94, value: 172000, maintenance: 6 },
  ];

  return (
    <Card className="dashboard-card col-span-1 md:col-span-2 animate-fade-in" style={{ animationDelay: '250ms' }}>
      <CardHeader className="pb-2">
        <CardTitle>Asset Performance</CardTitle>
        <CardDescription>
          Utilization rate and maintenance frequency
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '0.5rem', 
                  border: '1px solid rgb(226, 232, 240)',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="utilization"
                name="Utilization Rate (%)"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="maintenance"
                name="Maintenance Cases"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
