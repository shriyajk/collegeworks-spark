import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHomeConfirmation } from "@/hooks/use-home-confirmation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2,
  Plus,
  BarChart3,
  Users,
  Settings,
  Bell,
  Building2,
  DollarSign,
  Calendar,
  Eye
} from "lucide-react";

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { confirmGoHome, ConfirmationDialog } = useHomeConfirmation();
  
  const { email, businessName, isNewlyApproved } = location.state || {
    email: "business@example.com",
    businessName: "Your Business",
    isNewlyApproved: false
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={confirmGoHome}
              className="gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Building2 className="h-5 w-5" />
              Back to Home
            </Button>
            <div className="border-l pl-3 ml-3">
              <h1 className="text-xl font-bold">CampusBuild Business</h1>
              <p className="text-sm text-muted-foreground">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{businessName}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <div className="flex px-4">
          <Button variant="ghost" className="border-b-2 border-blue-600 text-blue-600 rounded-none">
            Dashboard
          </Button>
          <Button variant="ghost" className="rounded-none" onClick={() => navigate("/post-project")}>
            Post Project
          </Button>
          <Button variant="ghost" className="rounded-none" onClick={() => navigate("/my-projects")}>
            My Projects
          </Button>
          <Button variant="ghost" className="rounded-none" onClick={() => navigate("/messages")}>
            Messages
          </Button>
          <Button variant="ghost" className="rounded-none" onClick={() => navigate("/settings")}>
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-4xl space-y-6">
          
          {/* Welcome Banner (dismissible) */}
          {isNewlyApproved && (
            <Card className="p-4 bg-blue-50 border-blue-200 relative">
              <button 
                className="absolute top-2 right-2 p-1 hover:bg-blue-200 rounded"
                onClick={() => {/* Handle dismiss */}}
              >
                ✕
              </button>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Welcome! Your account is ready.</p>
                  <p className="text-sm text-blue-700">Start by posting your first project</p>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Stats (3 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            <Card className="p-6 card-enhanced hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Posted Projects</p>
                <p className="text-4xl font-bold text-gray-900 animate-count-up">0</p>
              </div>
            </Card>

            <Card className="p-6 card-enhanced hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 gradient-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Active Teams</p>
                <p className="text-4xl font-bold text-gray-900 animate-count-up">0</p>
              </div>
            </Card>

            <Card className="p-6 card-enhanced hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 gradient-success rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Total Spent</p>
                <p className="text-4xl font-bold text-gray-900 animate-count-up">$0</p>
              </div>
            </Card>
          </div>

          {/* Main CTA (large, centered card) */}
          <Card className="p-10 text-center card-featured border-2 border-purple-200 shadow-xl hover-lift">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-20 h-20 gradient-warm rounded-3xl flex items-center justify-center mx-auto shadow-glow-coral animate-bounce-subtle">
                <Plus className="h-10 w-10 text-white" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-gradient">Post Your First Project</h2>
                <p className="text-gray-600 text-lg font-medium">Connect with student teams in 24 hours</p>
              </div>
              <Button 
                onClick={() => navigate("/post-project")}
                size="lg"
                className="h-14 px-10 text-lg btn-coral shadow-glow-coral"
              >
                Post a Project
              </Button>
            </div>
          </Card>

          {/* My Projects Section */}
          <Card className="p-8 card-enhanced">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Your Projects</h3>
              <Button 
                onClick={() => navigate("/post-project")}
                className="btn-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
            
            {/* Empty State */}
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
                <BarChart3 className="h-10 w-10 text-gray-400" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">No projects yet</h4>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start by posting your first project to connect with talented student teams and bring your ideas to life
              </p>
              <Button 
                onClick={() => navigate("/post-project")}
                className="btn-coral px-8 py-3"
              >
                Post Your First Project
              </Button>
            </div>
          </Card>
        </div>
      </main>
      
      <ConfirmationDialog />
    </div>
  );
};

export default BusinessDashboard;
