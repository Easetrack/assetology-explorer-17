
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog,
  DialogContent, 
  DialogFooter, 
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ClipboardList, Plus, Search } from 'lucide-react';

const AssetAssessment = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const assessmentData = [
    {
      id: 'ASM-001',
      asset: 'MacBook Pro (2021)',
      assetId: 'AST-023',
      assessor: 'David Kim',
      date: '2023-07-02',
      condition: 'Excellent',
      score: 95
    },
    {
      id: 'ASM-002',
      asset: 'Office Chair XT50',
      assetId: 'AST-145',
      assessor: 'Sarah Johnson',
      date: '2023-07-01',
      condition: 'Good',
      score: 82
    },
    {
      id: 'ASM-003',
      asset: 'Conference Room Projector',
      assetId: 'AST-078',
      assessor: 'Michael Chen',
      date: '2023-06-28',
      condition: 'Fair',
      score: 68
    },
    {
      id: 'ASM-004',
      asset: 'Desktop Computer',
      assetId: 'AST-112',
      assessor: 'Emily Rodriguez',
      date: '2023-06-25',
      condition: 'Poor',
      score: 42
    },
    {
      id: 'ASM-005',
      asset: 'Network Switch Cisco 3850',
      assetId: 'AST-056',
      assessor: 'Alex Taylor',
      date: '2023-06-20',
      condition: 'Excellent',
      score: 98
    }
  ];

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case 'Excellent':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">{condition}</Badge>;
      case 'Good':
        return <Badge className="bg-blue-500 hover:bg-blue-600">{condition}</Badge>;
      case 'Fair':
        return <Badge className="bg-amber-500 hover:bg-amber-600">{condition}</Badge>;
      case 'Poor':
        return <Badge className="bg-red-500 hover:bg-red-600">{condition}</Badge>;
      default:
        return <Badge>{condition}</Badge>;
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-[70px]'}`}>
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-semibold tracking-tight">Asset Assessment</h1>
              <p className="text-muted-foreground">Evaluate and record asset conditions</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-9">
                    <Plus className="mr-2 h-4 w-4" /> New Assessment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>New Asset Assessment</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="asset">Asset</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ast-023">MacBook Pro (AST-023)</SelectItem>
                          <SelectItem value="ast-145">Office Chair (AST-145)</SelectItem>
                          <SelectItem value="ast-078">Projector (AST-078)</SelectItem>
                          <SelectItem value="ast-112">Desktop Computer (AST-112)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="score">Assessment Score (0-100)</Label>
                      <Input type="number" id="score" min="0" max="100" placeholder="Enter score" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Input id="notes" placeholder="Enter assessment notes" />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit">Save Assessment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6 animate-fade-in">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  Assessment Summary
                </CardTitle>
                <CardDescription>
                  Overview of recent asset assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Asset Condition Distribution</div>
                    </div>
                    <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="flex h-full">
                        <div className="bg-emerald-500 h-full" style={{ width: '45%' }}></div>
                        <div className="bg-blue-500 h-full" style={{ width: '30%' }}></div>
                        <div className="bg-amber-500 h-full" style={{ width: '15%' }}></div>
                        <div className="bg-red-500 h-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1"></div>
                        Excellent (45%)
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                        Good (30%)
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mr-1"></div>
                        Fair (15%)
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                        Poor (10%)
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm font-medium mb-1">Average Condition Score</div>
                      <div className="text-3xl font-semibold">85.4<span className="text-sm font-normal text-muted-foreground">/100</span></div>
                      <div className="text-xs text-muted-foreground mt-1">+2.3 from last month</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Total Assessments</div>
                      <div className="text-3xl font-semibold">126</div>
                      <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Pending Assessments</CardTitle>
                <CardDescription>
                  Assets due for assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/40">
                    <div>
                      <div className="font-medium text-sm">Server Rack Equipment</div>
                      <div className="text-xs text-muted-foreground">Last assessed: 6 months ago</div>
                    </div>
                    <Button size="sm" variant="outline" className="h-8">Assess</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/40">
                    <div>
                      <div className="font-medium text-sm">Office Furniture - Floor 3</div>
                      <div className="text-xs text-muted-foreground">Never assessed</div>
                    </div>
                    <Button size="sm" variant="outline" className="h-8">Assess</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/40">
                    <div>
                      <div className="font-medium text-sm">Company Vehicle - SUV</div>
                      <div className="text-xs text-muted-foreground">Last assessed: 3 months ago</div>
                    </div>
                    <Button size="sm" variant="outline" className="h-8">Assess</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Recent Assessments</CardTitle>
                  <CardDescription>
                    Recent asset condition evaluations
                  </CardDescription>
                </div>
                
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search assessments..." className="pl-8 h-9" />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment ID</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Asset ID</TableHead>
                    <TableHead>Assessor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Score</TableHead>
                  </TableRow>
                </TableHeader>
                
                <TableBody>
                  {assessmentData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.asset}</TableCell>
                      <TableCell>{item.assetId}</TableCell>
                      <TableCell>{item.assessor}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{getConditionBadge(item.condition)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={item.score} 
                            className={`h-2 w-16 ${getProgressColor(item.score)}`}
                          />
                          <span className="text-sm">{item.score}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AssetAssessment;
