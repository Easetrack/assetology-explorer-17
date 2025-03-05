
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const AssetDistribution = () => {
  const data = [
    { name: 'IT Equipment', value: 45, color: '#3b82f6' },
    { name: 'Office Furniture', value: 30, color: '#8b5cf6' },
    { name: 'Vehicles', value: 15, color: '#10b981' },
    { name: 'Machinery', value: 10, color: '#f59e0b' }
  ];

  return (
    <Card className="dashboard-card col-span-1 md:col-span-2 animate-fade-in" style={{ animationDelay: '150ms' }}>
      <CardHeader className="pb-2">
        <CardTitle>Asset Distribution</CardTitle>
        <CardDescription>
          Asset categories by percentage
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{ 
                  borderRadius: '0.5rem', 
                  border: '1px solid rgb(226, 232, 240)',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center" 
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetDistribution;
