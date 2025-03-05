
import React, { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Download, Filter, Search, MoreHorizontal } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const AssetRegister = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Close sidebar on mobile automatically
  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Initial check
    checkWidth();
    
    // Add event listener
    window.addEventListener('resize', checkWidth);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkWidth);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const assetData = [
    {
      id: 'AST-001',
      name: 'MacBook Pro 16"',
      category: 'IT Equipment',
      location: 'HQ - Floor 2',
      status: 'Active',
      purchaseDate: '2023-06-15',
      value: '$2,499.00'
    },
    {
      id: 'AST-002',
      name: 'Office Desk L-Shape',
      category: 'Furniture',
      location: 'HQ - Floor 1',
      status: 'Active',
      purchaseDate: '2022-11-20',
      value: '$799.00'
    },
    {
      id: 'AST-003',
      name: 'Conference Room Projector',
      category: 'IT Equipment',
      location: 'HQ - Meeting Room A',
      status: 'Maintenance',
      purchaseDate: '2022-08-05',
      value: '$1,299.00'
    },
    {
      id: 'AST-004',
      name: 'Company Vehicle - SUV',
      category: 'Vehicle',
      location: 'HQ - Parking Bay 3',
      status: 'Active',
      purchaseDate: '2021-12-10',
      value: '$45,000.00'
    },
    {
      id: 'AST-005',
      name: 'Server Rack Cabinet',
      category: 'IT Equipment',
      location: 'HQ - Server Room',
      status: 'Active',
      purchaseDate: '2023-01-15',
      value: '$2,100.00'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">{status}</Badge>;
      case 'Maintenance':
        return <Badge className="bg-amber-500 hover:bg-amber-600">{status}</Badge>;
      case 'Disposed':
        return <Badge className="bg-red-500 hover:bg-red-600">{status}</Badge>;
      case 'In Transit':
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-[70px]'} ml-0`}>
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="font-semibold tracking-tight">Asset Register</h1>
              <p className="text-muted-foreground">Manage and track all your assets</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-9">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-9">
                    <Plus className="mr-2 h-4 w-4" /> Add Asset
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] max-w-[95vw]">
                  <DialogHeader>
                    <DialogTitle>Add New Asset</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new asset to add it to the register.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Asset Name</Label>
                      <Input id="name" placeholder="Enter asset name" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="it-equipment">IT Equipment</SelectItem>
                            <SelectItem value="furniture">Furniture</SelectItem>
                            <SelectItem value="vehicle">Vehicle</SelectItem>
                            <SelectItem value="machinery">Machinery</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="disposed">Disposed</SelectItem>
                            <SelectItem value="transit">In Transit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Enter location" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="purchase-date">Purchase Date</Label>
                        <Input id="purchase-date" type="date" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="value">Value</Label>
                        <Input id="value" placeholder="Enter value" />
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit">Add Asset</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Card className="animate-fade-in">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle>Assets</CardTitle>
                  <CardDescription>
                    View and manage your complete asset inventory
                  </CardDescription>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search assets..." className="pl-8 h-9" />
                  </div>
                  
                  <Button variant="outline" size="sm" className="h-9 w-full sm:w-auto">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6 overflow-auto">
              <ScrollArea className="w-full">
                <div className="min-w-[800px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Purchase Date</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                      {assetData.map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.id}</TableCell>
                          <TableCell>{asset.name}</TableCell>
                          <TableCell>{asset.category}</TableCell>
                          <TableCell>{asset.location}</TableCell>
                          <TableCell>{getStatusBadge(asset.status)}</TableCell>
                          <TableCell>{asset.purchaseDate}</TableCell>
                          <TableCell>{asset.value}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AssetRegister;
