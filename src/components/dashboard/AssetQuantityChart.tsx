
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AssetQuantityChart = () => {
  // Asset quantity data by category
  const data = [
    { category: 'IT Equipment', quantity: 1245 },
    { category: 'Office Furniture', quantity: 876 },
    { category: 'Vehicles', quantity: 32 },
    { category: 'Machinery', quantity: 245 },
    { category: 'Electronics', quantity: 145 },
  ];

  // Custom colors for the bars
  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <Card className="dashboard-card animate-fade-in" style={{ animationDelay: '200ms' }}>
      <CardHeader className="pb-2">
        <CardTitle>Asset Quantities</CardTitle>
        <CardDescription>
          Number of assets by category
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 40,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="category" 
                angle={-45}
                textAnchor="end"
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}`, 'Quantity']}
                contentStyle={{ 
                  borderRadius: '0.5rem', 
                  border: '1px solid rgb(226, 232, 240)',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="quantity">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetQuantityChart;
