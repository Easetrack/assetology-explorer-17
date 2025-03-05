
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MoveRight, Plus, Search } from 'lucide-react';

const AssetMove = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const moveHistory = [
    {
      id: 'MOV-001',
      asset: 'MacBook Pro 16"',
      assetId: 'AST-023',
      fromLocation: 'HQ - Floor 2',
      toLocation: 'HQ - Floor 3',
      requestedBy: 'Sarah Johnson',
      date: '2023-07-10',
      status: 'Completed'
    },
    {
      id: 'MOV-002',
      asset: 'Office Desk',
      assetId: 'AST-145',
      fromLocation: 'HQ - Floor 1',
      toLocation: 'Branch Office',
      requestedBy: 'Michael Chen',
      date: '2023-07-08',
      status: 'Completed'
    },
    {
      id: 'MOV-003',
      asset: 'Conference Room Projector',
      assetId: 'AST-078',
      fromLocation: 'HQ - Meeting Room A',
      toLocation: 'HQ - Meeting Room B',
      requestedBy: 'David Kim',
      date: '2023-07-05',
      status: 'Completed'
    },
    {
      id: 'MOV-004',
      asset: 'Server Rack Cabinet',
      assetId: 'AST-056',
      fromLocation: 'HQ - Server Room',
      toLocation: 'Data Center',
      requestedBy: 'Emily Rodriguez',
      date: '2023-07-01',
      status: 'In Transit'
    }
  ];

  const pendingMoves = [
    {
      id: 'REQ-001',
      asset: 'Desktop Computer',
      assetId: 'AST-112',
      fromLocation: 'HQ - Floor 1',
      toLocation: 'Branch Office',
      requestedBy: 'Alex Taylor',
      requestDate: '2023-07-12',
      scheduledDate: '2023-07-20'
    },
    {
      id: 'REQ-002',
      asset: 'Office Chairs (x5)',
      assetId: 'AST-187',
      fromLocation: 'Storage Room',
      toLocation: 'HQ - Floor 3',
      requestedBy: 'Jennifer Lopez',
      requestDate: '2023-07-11',
      scheduledDate: '2023-07-18'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">{status}</Badge>;
      case 'In Transit':
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>;
      case 'Scheduled':
        return <Badge className="bg-amber-500 hover:bg-amber-600">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-[70px]'}`}>
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-semibold tracking-tight">Asset Move</h1>
              <p className="text-muted-foreground">Track and manage asset relocations</p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="h-9">
                  <Plus className="mr-2 h-4 w-4" /> Request Move
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Request Asset Move</DialogTitle>
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
                        <SelectItem value="ast-145">Office Desk (AST-145)</SelectItem>
                        <SelectItem value="ast-078">Projector (AST-078)</SelectItem>
                        <SelectItem value="ast-112">Desktop Computer (AST-112)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="from-location">From Location</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hq-f1">HQ - Floor 1</SelectItem>
                          <SelectItem value="hq-f2">HQ - Floor 2</SelectItem>
                          <SelectItem value="hq-f3">HQ - Floor 3</SelectItem>
                          <SelectItem value="branch">Branch Office</SelectItem>
                          <SelectItem value="storage">Storage Room</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="to-location">To Location</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hq-f1">HQ - Floor 1</SelectItem>
                          <SelectItem value="hq-f2">HQ - Floor 2</SelectItem>
                          <SelectItem value="hq-f3">HQ - Floor 3</SelectItem>
                          <SelectItem value="branch">Branch Office</SelectItem>
                          <SelectItem value="storage">Storage Room</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="scheduled-date">Scheduled Date</Label>
                    <Input type="date" id="scheduled-date" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" placeholder="Enter any additional details" />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 animate-fade-in">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <MoveRight className="h-5 w-5 text-primary" />
                  Asset Movement Overview
                </CardTitle>
                <CardDescription>
                  Current asset location changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">This Month</p>
                    <p className="text-2xl font-semibold">24</p>
                    <p className="text-xs text-emerald-600">+12% from previous</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">In Transit</p>
                    <p className="text-2xl font-semibold">3</p>
                    <p className="text-xs text-blue-600">Arriving soon</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="text-2xl font-semibold">5</p>
                    <p className="text-xs text-amber-600">Scheduled</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Top Location</p>
                    <p className="text-lg font-semibold">HQ Floor 3</p>
                    <p className="text-xs">42% of moves</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Pending Moves</CardTitle>
                <CardDescription>
                  Upcoming asset relocations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingMoves.map((move) => (
                    <div key={move.id} className="p-3 bg-background rounded-lg border border-border/40">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-medium">{move.asset}</span>
                        <Badge variant="outline" className="text-xs">{move.id}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {move.fromLocation} → {move.toLocation}
                      </p>
                      <div className="flex justify-between text-xs">
                        <span>Scheduled: {move.scheduledDate}</span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="history" className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <TabsList className="mb-6">
              <TabsTrigger value="history">Move History</TabsTrigger>
              <TabsTrigger value="locations">Asset Locations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history">
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle>Asset Move History</CardTitle>
                      <CardDescription>
                        Record of all asset relocations
                      </CardDescription>
                    </div>
                    
                    <div className="relative w-64">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input placeholder="Search moves..." className="pl-8 h-9" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Move ID</TableHead>
                        <TableHead>Asset</TableHead>
                        <TableHead>Asset ID</TableHead>
                        <TableHead>From Location</TableHead>
                        <TableHead>To Location</TableHead>
                        <TableHead>Requested By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                      {moveHistory.map((move) => (
                        <TableRow key={move.id}>
                          <TableCell className="font-medium">{move.id}</TableCell>
                          <TableCell>{move.asset}</TableCell>
                          <TableCell>{move.assetId}</TableCell>
                          <TableCell>{move.fromLocation}</TableCell>
                          <TableCell>{move.toLocation}</TableCell>
                          <TableCell>{move.requestedBy}</TableCell>
                          <TableCell>{move.date}</TableCell>
                          <TableCell>{getStatusBadge(move.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="locations">
              <Card>
                <CardHeader>
                  <CardTitle>Location Distribution</CardTitle>
                  <CardDescription>
                    Where your assets are currently located
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">HQ - Main Building</span>
                      <span className="text-sm">1,358 assets</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Floor 1</span>
                        <span>425 assets (31%)</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: '31%' }}></div>
                      </div>
                      
                      <div className="flex justify-between text-xs">
                        <span>Floor 2</span>
                        <span>512 assets (38%)</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: '38%' }}></div>
                      </div>
                      
                      <div className="flex justify-between text-xs">
                        <span>Floor 3</span>
                        <span>315 assets (23%)</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: '23%' }}></div>
                      </div>
                      
                      <div className="flex justify-between text-xs">
                        <span>Server Room</span>
                        <span>106 assets (8%)</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: '8%' }}></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Branch Office</span>
                      <span className="text-sm">456 assets</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Main Area</span>
                        <span>326 assets (71%)</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full" style={{ width: '71%' }}></div>
                      </div>
                      
                      <div className="flex justify-between text-xs">
                        <span>Meeting Rooms</span>
                        <span>98 assets (22%)</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full" style={{ width: '22%' }}></div>
                      </div>
                      
                      <div className="flex justify-between text-xs">
                        <span>Storage</span>
                        <span>32 assets (7%)</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full" style={{ width: '7%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AssetMove;
