
import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  BarChart3,
  LayoutDashboard,
  ClipboardList,
  Package,
  MoveRight,
  Clipboard,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const location = useLocation();
  
  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) {
        toggle();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, toggle]);
  
  const navigationItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/',
    },
    {
      title: 'Asset Register',
      icon: <ClipboardList className="h-5 w-5" />,
      path: '/asset-register',
    },
    {
      title: 'Asset Received',
      icon: <Package className="h-5 w-5" />,
      path: '/asset-received',
    },
    {
      title: 'Asset Assessment',
      icon: <Clipboard className="h-5 w-5" />,
      path: '/asset-assessment',
    },
    {
      title: 'Asset Move',
      icon: <MoveRight className="h-5 w-5" />,
      path: '/asset-move',
    },
    {
      title: 'Asset Count',
      icon: <BarChart3 className="h-5 w-5" />,
      path: '/asset-count',
    },
    {
      title: 'Reports',
      icon: <FileText className="h-5 w-5" />,
      path: '/reports',
    },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      path: '/settings',
    },
  ];

  // Mobile sidebar component
  const MobileSidebar = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden fixed top-3 left-3 z-50">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[250px]">
        <div className="flex h-16 items-center justify-between px-4 py-4 border-b border-sidebar-border/20">
          <div className="flex items-center gap-2 font-medium">
            <div className="h-8 w-8 rounded-md bg-white text-sidebar flex items-center justify-center">
              <span className="font-bold text-lg">A</span>
            </div>
            <span className="text-lg">Assetology</span>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="px-3 py-4">
            <NavLink
              to="/"
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 mb-2 rounded-md text-sm font-medium
                transition-colors duration-200 bg-primary text-primary-foreground hover:bg-primary/90
              `}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </NavLink>

            <Separator className="my-2" />
            
            <nav className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                    transition-colors duration-200
                    ${isActive 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'}
                  `}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
  
  // Desktop sidebar
  return (
    <>
      <MobileSidebar />
      <aside className={`fixed inset-y-0 left-0 z-30 hidden md:flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-[70px]'}`}>
        <div className="flex h-16 items-center justify-between px-4 py-4 border-b border-sidebar-border/20">
          <div className={`flex items-center gap-2 font-medium ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
            <div className="h-8 w-8 rounded-md bg-white text-sidebar flex items-center justify-center">
              <span className="font-bold text-lg">A</span>
            </div>
            <span className="text-lg">Assetology</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggle}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>
        
        <ScrollArea className="flex-1 px-3 py-4">
          <NavLink
            to="/"
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2 mb-2 rounded-md text-sm font-medium
              transition-colors duration-200 bg-primary text-primary-foreground hover:bg-primary/90
              ${!isOpen ? 'justify-center px-0' : ''}
            `}
          >
            <Home className="h-5 w-5" />
            {isOpen && <span>Home</span>}
          </NavLink>

          <Separator className="my-2" />
          
          <nav className="flex flex-col gap-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                  transition-colors duration-200
                  ${isActive 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'}
                  ${!isOpen ? 'justify-center px-0' : ''}
                `}
              >
                {item.icon}
                {isOpen && <span>{item.title}</span>}
              </NavLink>
            ))}
          </nav>
        </ScrollArea>
        
        <div className="p-4 border-t border-sidebar-border/20 mt-auto">
          <div className={`flex items-center gap-3 ${isOpen ? 'justify-start' : 'justify-center'}`}>
            <div className="h-8 w-8 bg-white text-sidebar rounded-full flex items-center justify-center">
              <span className="font-medium">AB</span>
            </div>
            {isOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">Alex Bailey</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
