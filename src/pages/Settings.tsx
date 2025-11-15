import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Building2,
  User,
  Bell,
  CreditCard,
  Shield,
  Globe,
  Mail,
  Phone,
  MapPin,
  Save,
  Eye,
  EyeOff,
  Upload,
  Trash2,
  CheckCircle2
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  
  // Business Profile State
  const [businessProfile, setBusinessProfile] = useState({
    businessName: "Bean There Cafe",
    yourName: "John Smith",
    email: "john@beanthere.com",
    phone: "+1 (555) 123-4567",
    website: "https://beanthere.com",
    description: "Local coffee shop focused on quality beans and community connection.",
    streetAddress: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    industry: "Food & Beverage",
    companySize: "1-10 employees"
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    projectUpdates: true,
    newApplications: true,
    milestoneReminders: true,
    paymentAlerts: true,
    marketingEmails: false,
    weeklyReports: true
  });

  // Payment Settings
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "**** **** **** 4242",
    cardHolder: "John Smith",
    expiryDate: "12/25",
    billingAddress: "123 Main Street, San Francisco, CA 94102"
  });

  // Security Settings
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: "30 minutes"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (section: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log(`Saved ${section} settings`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/business-dashboard")}
              className="gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-xs sm:text-base px-2 sm:px-4 h-8 sm:h-10"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              Back
            </Button>
            <h1 className="text-lg sm:text-2xl font-bold text-primary">CampusBuild</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-4xl">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your business account and preferences</p>
          </div>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Business Profile */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Business Information</h2>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={businessProfile.businessName}
                      onChange={(e) => setBusinessProfile({...businessProfile, businessName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="yourName">Your Name</Label>
                    <Input
                      id="yourName"
                      value={businessProfile.yourName}
                      onChange={(e) => setBusinessProfile({...businessProfile, yourName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={businessProfile.email}
                      onChange={(e) => setBusinessProfile({...businessProfile, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={businessProfile.phone}
                      onChange={(e) => setBusinessProfile({...businessProfile, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={businessProfile.website}
                      onChange={(e) => setBusinessProfile({...businessProfile, website: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={businessProfile.industry}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                      id="description"
                      value={businessProfile.description}
                      onChange={(e) => setBusinessProfile({...businessProfile, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={() => handleSave("profile")}
                    disabled={isLoading}
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </Card>

              {/* Location Information */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Location</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Input
                      id="streetAddress"
                      value={businessProfile.streetAddress}
                      onChange={(e) => setBusinessProfile({...businessProfile, streetAddress: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={businessProfile.city}
                      onChange={(e) => setBusinessProfile({...businessProfile, city: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={businessProfile.state}
                      onChange={(e) => setBusinessProfile({...businessProfile, state: e.target.value})}
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Notification Preferences</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Communication Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive updates via email</p>
                        </div>
                        <Switch
                          checked={notifications.emailNotifications}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, emailNotifications: checked})
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive urgent updates via text</p>
                        </div>
                        <Switch
                          checked={notifications.smsNotifications}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, smsNotifications: checked})
                          }
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Project Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Applications</p>
                          <p className="text-sm text-muted-foreground">When teams apply to your projects</p>
                        </div>
                        <Switch
                          checked={notifications.newApplications}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, newApplications: checked})
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Project Updates</p>
                          <p className="text-sm text-muted-foreground">Progress updates from your teams</p>
                        </div>
                        <Switch
                          checked={notifications.projectUpdates}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, projectUpdates: checked})
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Milestone Reminders</p>
                          <p className="text-sm text-muted-foreground">Reminders to review and approve work</p>
                        </div>
                        <Switch
                          checked={notifications.milestoneReminders}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, milestoneReminders: checked})
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={() => handleSave("notifications")}
                    disabled={isLoading}
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Payments */}
            <TabsContent value="payments" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Payment Methods</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium">{paymentInfo.cardNumber}</p>
                          <p className="text-sm text-muted-foreground">Expires {paymentInfo.expiryDate}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Primary
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{paymentInfo.billingAddress}</p>
                  </div>
                  
                  <Button variant="outline" className="gap-2">
                    <CreditCard className="h-4 w-4" />
                    Add New Payment Method
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Billing History</h2>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Coffee Shop Website - Project Payment</p>
                      <p className="text-sm text-muted-foreground">Nov 15, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$260.00</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Paid
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Restaurant Mobile App - Project Payment</p>
                      <p className="text-sm text-muted-foreground">Nov 8, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$460.00</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Paid
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Security Settings</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Switch
                        checked={security.twoFactorEnabled}
                        onCheckedChange={(checked) => 
                          setSecurity({...security, twoFactorEnabled: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Login Alerts</p>
                        <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                      </div>
                      <Switch
                        checked={security.loginAlerts}
                        onCheckedChange={(checked) => 
                          setSecurity({...security, loginAlerts: checked})
                        }
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter new password"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={() => handleSave("security")}
                    disabled={isLoading}
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Update Security
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Preferences */}
            <TabsContent value="preferences" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">General Preferences</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="PST">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                          <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                          <SelectItem value="CST">Central Standard Time (CST)</SelectItem>
                          <SelectItem value="MST">Mountain Standard Time (MST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="USD">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">US Dollar (USD)</SelectItem>
                          <SelectItem value="EUR">Euro (EUR)</SelectItem>
                          <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={() => handleSave("preferences")}
                    disabled={isLoading}
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
