
import React, { useState, useEffect } from 'react';
import AssetSummary from '@/components/dashboard/AssetSummary';
import AssetDistribution from '@/components/dashboard/AssetDistribution';
import RecentActivities from '@/components/dashboard/RecentActivities';
import PerformanceMetrics from '@/components/dashboard/PerformanceMetrics';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { 
  CircleChevronRight, 
  Package, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  BarChart3,
  Truck,
  ClipboardCheck,
  MoveHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  
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

  const handleIconClick = (panelId: string) => {
    setActivePanel(activePanel === panelId ? null : panelId);
  };

  const renderDetailPanel = () => {
    switch (activePanel) {
      case 'totalAssets':
        return (
          <Card className="w-full animate-fade-in mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <Package className="mr-2 h-5 w-5" /> 
                Total Assets Detail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">Detailed breakdown of all assets in the system.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <Card className="bg-white/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">IT Equipment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-semibold">1,245</p>
                      <p className="text-xs text-muted-foreground mt-1">48% of total</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Office Furniture</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-semibold">876</p>
                      <p className="text-xs text-muted-foreground mt-1">34% of total</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Vehicles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-semibold">32</p>
                      <p className="text-xs text-muted-foreground mt-1">1% of total</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Button className="mt-4" variant="outline" size="sm" onClick={() => setActivePanel(null)}>
                  Close Details
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'maintenance':
        return (
          <Card className="w-full animate-fade-in mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-600">
                <AlertTriangle className="mr-2 h-5 w-5" /> 
                Maintenance Required Detail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">Assets requiring immediate maintenance attention.</p>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span>Server Rack #3 - Cooling System Failure</span>
                    </div>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Critical</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                      <span>Printer A113 - Toner Low</span>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Medium</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                      <span>Company Vehicle #8 - Service Due</span>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Medium</span>
                  </div>
                </div>
                
                <Button className="mt-4" variant="outline" size="sm" onClick={() => setActivePanel(null)}>
                  Close Details
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'pending':
        return (
          <Card className="w-full animate-fade-in mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-600">
                <Clock className="mr-2 h-5 w-5" /> 
                Pending Assessments Detail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">Assets awaiting assessment and verification.</p>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium">New Laptops - IT Department</p>
                      <p className="text-xs text-muted-foreground">15 units received on May 15, 2023</p>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Due in 2 days</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium">Office Chairs - Admin Department</p>
                      <p className="text-xs text-muted-foreground">25 units received on May 17, 2023</p>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Due in 4 days</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium">Network Equipment</p>
                      <p className="text-xs text-muted-foreground">Various items received on May 10, 2023</p>
                    </div>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Overdue</span>
                  </div>
                </div>
                
                <Button className="mt-4" variant="outline" size="sm" onClick={() => setActivePanel(null)}>
                  Close Details
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'utilization':
        return (
          <Card className="w-full animate-fade-in mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-600">
                <CheckCircle2 className="mr-2 h-5 w-5" /> 
                Utilization Rate Detail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">Detailed breakdown of asset utilization by department.</p>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">IT Department</span>
                      <span className="text-sm font-medium">97%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '97%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Sales Department</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Marketing Department</span>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Finance Department</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
                
                <Button className="mt-4" variant="outline" size="sm" onClick={() => setActivePanel(null)}>
                  Close Details
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-[70px]'} ml-0`}>
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="font-semibold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Overview of your asset management system</p>
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {activePanel && renderDetailPanel()}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { 
                  id: 'totalAssets', 
                  title: 'Total Assets', 
                  value: '2,543', 
                  icon: <Package className="h-5 w-5" />,
                  change: '+8%',
                  changeType: 'positive',
                  color: 'blue'
                },
                { 
                  id: 'maintenance', 
                  title: 'Maintenance Required', 
                  value: '24', 
                  icon: <AlertTriangle className="h-5 w-5" />,
                  change: '-12%',
                  changeType: 'positive',
                  color: 'amber'
                },
                { 
                  id: 'pending', 
                  title: 'Pending Assessments', 
                  value: '12', 
                  icon: <Clock className="h-5 w-5" />,
                  change: '+3',
                  changeType: 'negative',
                  color: 'purple'
                },
                { 
                  id: 'utilization', 
                  title: 'Utilization Rate', 
                  value: '94%', 
                  icon: <CheckCircle2 className="h-5 w-5" />,
                  change: '+2%',
                  changeType: 'positive',
                  color: 'emerald'
                }
              ].map((item) => (
                <Card 
                  key={item.id} 
                  className={`dashboard-card overflow-hidden animate-fade-in cursor-pointer transition-all hover:shadow-md ${activePanel === item.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleIconClick(item.id)}
                >
                  <CardHeader className="pb-2 pt-4 px-4 sm:px-6 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {item.title}
                    </CardTitle>
                    <div className={`p-2 rounded-full bg-${item.color}-100/40 text-${item.color}-600`}>
                      {item.icon}
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 pb-4">
                    <div className="text-2xl font-semibold">{item.value}</div>
                    <p className={`text-xs ${item.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'} flex items-center mt-1`}>
                      {item.change}
                      <span className="text-muted-foreground ml-1 text-xs">from last month</span>
                    </p>
                    <div className="mt-2 text-xs text-blue-600 flex items-center">
                      View details <CircleChevronRight className="ml-1 h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="md:col-span-2 lg:col-span-1">
                <AssetDistribution />
              </div>
              <div className="md:col-span-2 lg:col-span-2">
                <RecentActivities />
              </div>
            </div>
            
            <PerformanceMetrics />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
