
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart3, Search } from "lucide-react";

const AssetCount = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Asset Count</h1>
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            Start New Count
          </Button>
        </div>
        
        <Separator />
        
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search counts by ID, location, or date..." className="pl-10" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Asset Count #{1000 + i}</CardTitle>
                <CardDescription>Location: Warehouse {String.fromCharCode(65 + i)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`font-medium ${i % 3 === 0 ? 'text-green-500' : i % 3 === 1 ? 'text-amber-500' : 'text-blue-500'}`}>
                      {i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'In Progress' : 'Scheduled'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Started:</span>
                    <span>{new Date(2023, 5 + i, 10 + i).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items Counted:</span>
                    <span>{120 + i * 15} / {i % 3 === 0 ? (120 + i * 15) : (200 + i * 20)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assigned To:</span>
                    <span>Team {i + 1}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetCount;
