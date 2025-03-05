
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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Filter, Plus, Search } from 'lucide-react';

const AssetReceived = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const recentReceived = [
    {
      id: 'RCV-001',
      asset: 'Dell Latitude Laptop',
      supplier: 'Dell Technologies',
      receivedBy: 'John Smith',
      date: '2023-07-15',
      status: 'Completed'
    },
    {
      id: 'RCV-002',
      asset: 'Office Chairs (x10)',
      supplier: 'Office Furniture Co.',
      receivedBy: 'Emily Chang',
      date: '2023-07-12',
      status: 'Completed'
    },
    {
      id: 'RCV-003',
      asset: 'Conference Room A/V System',
      supplier: 'AV Solutions Inc.',
      receivedBy: 'Michael Johnson',
      date: '2023-07-10',
      status: 'Inspection Required'
    },
    {
      id: 'RCV-004',
      asset: 'Network Switches',
      supplier: 'Cisco Systems',
      receivedBy: 'Sarah Williams',
      date: '2023-07-05',
      status: 'Completed'
    }
  ];

  const expectedDeliveries = [
    {
      id: 'PO-001',
      asset: 'MacBook Pro M2 (x5)',
      supplier: 'Apple Inc.',
      expectedDate: '2023-07-20',
      purchaseOrder: 'PO-2023-056'
    },
    {
      id: 'PO-002',
      asset: 'Office Desks (x8)',
      supplier: 'Office Furniture Co.',
      expectedDate: '2023-07-22',
      purchaseOrder: 'PO-2023-057'
    },
    {
      id: 'PO-003',
      asset: 'Projectors (x2)',
      supplier: 'AV Solutions Inc.',
      expectedDate: '2023-07-25',
      purchaseOrder: 'PO-2023-058'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">{status}</Badge>;
      case 'Inspection Required':
        return <Badge className="bg-amber-500 hover:bg-amber-600">{status}</Badge>;
      case 'Pending':
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>;
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
              <h1 className="font-semibold tracking-tight">Asset Received</h1>
              <p className="text-muted-foreground">Track received assets and expected deliveries</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              
              <Button size="sm" className="h-9">
                <Plus className="mr-2 h-4 w-4" /> Record Receipt
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="recent" className="animate-fade-in">
            <TabsList className="mb-6">
              <TabsTrigger value="recent">Recently Received</TabsTrigger>
              <TabsTrigger value="expected">Expected Deliveries</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent">
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle>Recent Received Assets</CardTitle>
                      <CardDescription>
                        Assets received in the past 30 days
                      </CardDescription>
                    </div>
                    
                    <div className="relative w-64">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input placeholder="Search received assets..." className="pl-8 h-9" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Receipt ID</TableHead>
                        <TableHead>Asset</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Received By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                      {recentReceived.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.asset}</TableCell>
                          <TableCell>{item.supplier}</TableCell>
                          <TableCell>{item.receivedBy}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="expected">
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle>Expected Deliveries</CardTitle>
                      <CardDescription>
                        Assets scheduled to be received
                      </CardDescription>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-[240px] justify-start text-left font-normal h-9">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Asset</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Expected Date</TableHead>
                        <TableHead>Purchase Order</TableHead>
                      </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                      {expectedDeliveries.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.asset}</TableCell>
                          <TableCell>{item.supplier}</TableCell>
                          <TableCell>{item.expectedDate}</TableCell>
                          <TableCell>{item.purchaseOrder}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AssetReceived;
