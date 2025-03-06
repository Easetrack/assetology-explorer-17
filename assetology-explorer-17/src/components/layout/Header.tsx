
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search, User, Moon, Sun, LogOut, Shield } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const { user, logout } = useAuth();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Function to get role badge color
  const getRoleBadgeColor = (role: string | undefined) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500 hover:bg-red-600';
      case 'manager':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'user':
        return 'bg-green-500 hover:bg-green-600';
      case 'guest':
        return 'bg-gray-500 hover:bg-gray-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-border/40 bg-background z-20 animate-fade-in sticky top-0">
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-[200px] md:max-w-[256px] hidden sm:block">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search assets..." 
            className="pl-8 h-9 bg-background border-muted" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {user && (
              <>
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                  Signed in as <span className="font-semibold text-foreground">{user.username}</span>
                </div>
                <div className="px-2 py-1.5 text-xs flex items-center gap-2">
                  <span className="text-muted-foreground">Department: {user.department}</span>
                </div>
                <div className="px-2 py-1.5 text-xs flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                  <Badge variant="outline" className={`text-white ${getRoleBadgeColor(user.role)}`}>
                    {user.role}
                  </Badge>
                </div>
                <DropdownMenuItem className="py-2 cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
