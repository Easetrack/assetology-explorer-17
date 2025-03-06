
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getAppSettings, saveAppSettings } from "../utils/helpers";

const Settings = () => {
  const [appName, setAppName] = useState('Assetology');
  const [logo, setLogo] = useState<string | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Profile form fields
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Bailey');
  const [email, setEmail] = useState('alex.bailey@example.com');
  const [jobTitle, setJobTitle] = useState('Administrator');
  const [department, setDepartment] = useState('IT & Operations');

  useEffect(() => {
    // Load settings from localStorage
    const settings = getAppSettings();
    if (settings) {
      setAppName(settings.appName || 'Assetology');
      setLogo(settings.logo);
      setPreviewLogo(settings.logo);
      setIsDarkMode(settings.theme === 'dark');
    }
    
    // Apply dark mode if needed
    if (settings?.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setPreviewLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleThemeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handleSaveChanges = () => {
    // Save app settings
    saveAppSettings({
      appName,
      logo: previewLogo,
      theme: isDarkMode ? 'dark' : 'light',
    });

    // Update user profile in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      localStorage.setItem('user', JSON.stringify({
        ...user,
        username: `${firstName} ${lastName}`,
        department,
      }));
    }

    toast.success('Settings saved successfully');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
        
        <Separator />
        
        <Tabs defaultValue="branding" className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="branding" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Branding Settings</CardTitle>
                <CardDescription>
                  Customize your application's branding and appearance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="appName">Application Name</Label>
                  <Input 
                    id="appName" 
                    value={appName} 
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="Enter application name"
                  />
                  <p className="text-sm text-muted-foreground">
                    This name will appear in the sidebar and browser title.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label>Application Logo</Label>
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="w-24 h-24 rounded-md bg-muted flex items-center justify-center overflow-hidden border">
                      {previewLogo ? (
                        <img src={previewLogo} alt="Logo Preview" className="w-full h-full object-contain" />
                      ) : (
                        <div className="text-2xl font-bold">
                          {appName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleLogoChange}
                        className="w-full"
                      />
                      <p className="text-sm text-muted-foreground">
                        Recommended size: 256x256 pixels. SVG, PNG, or JPG.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleRemoveLogo}
                        disabled={!previewLogo}
                      >
                        Remove Logo
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account details and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xl">{firstName?.charAt(0)}{lastName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm">
                      Upload New Photo
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove Photo
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      type="email" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input 
                      id="title" 
                      value={jobTitle} 
                      onChange={(e) => setJobTitle(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input 
                      id="department" 
                      value={department} 
                      onChange={(e) => setDepartment(e.target.value)} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the application looks and behaves.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="theme">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </p>
                    </div>
                    <Switch 
                      id="theme" 
                      checked={isDarkMode}
                      onCheckedChange={handleThemeToggle}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Reduce padding and font size
                      </p>
                    </div>
                    <Switch id="compact" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="animations">Animations</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable or disable animations
                      </p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email alerts for important events
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>In-App Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Show notifications within the application
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Desktop Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Show notifications on your desktop
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system-wide settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">
                        Regularly backup system data
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Help improve the system by sharing usage data
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Data Retention Period</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="w-full">30 Days</Button>
                      <Button variant="outline" className="w-full">90 Days</Button>
                      <Button variant="outline" className="w-full">1 Year</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
