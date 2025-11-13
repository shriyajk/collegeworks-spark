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
      <div className="p-3 sm:p-4 border-b">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            <Button
              variant="ghost"
              onClick={confirmGoHome}
              className="gap-1 sm:gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs sm:text-base px-2 sm:px-4 h-8 sm:h-10"
            >
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Button>
            <div className="border-l pl-2 sm:pl-3 ml-1 sm:ml-3">
              <h1 className="text-sm sm:text-xl font-bold truncate">CampusBuild Business</h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-medium truncate max-w-[80px] sm:max-w-none">{businessName}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="text-xs sm:text-sm px-2 sm:px-4 h-7 sm:h-9"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b overflow-x-auto">
        <div className="flex px-3 sm:px-4 min-w-max">
          <Button variant="ghost" className="border-b-2 border-blue-600 text-blue-600 rounded-none text-xs sm:text-sm px-3 sm:px-4 h-9 sm:h-10">
            Dashboard
          </Button>
          <Button variant="ghost" className="rounded-none text-xs sm:text-sm px-3 sm:px-4 h-9 sm:h-10" onClick={() => navigate("/post-project")}>
            Post Project
          </Button>
          <Button variant="ghost" className="rounded-none text-xs sm:text-sm px-3 sm:px-4 h-9 sm:h-10" onClick={() => navigate("/my-projects")}>
            My Projects
          </Button>
          <Button variant="ghost" className="rounded-none text-xs sm:text-sm px-3 sm:px-4 h-9 sm:h-10" onClick={() => navigate("/messages")}>
            Messages
          </Button>
          <Button variant="ghost" className="rounded-none text-xs sm:text-sm px-3 sm:px-4 h-9 sm:h-10" onClick={() => navigate("/settings")}>
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-3 sm:px-4 py-4 sm:py-6">
        <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
          
          {/* Welcome Banner (dismissible) */}
          {isNewlyApproved && (
            <Card className="p-3 sm:p-4 bg-blue-50 border-blue-200 relative">
              <button 
                className="absolute top-2 right-2 p-1 hover:bg-blue-200 rounded text-sm"
                onClick={() => {/* Handle dismiss */}}
              >
                ✕
              </button>
              <div className="flex items-center gap-2 sm:gap-3">
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900 text-sm sm:text-base">Welcome! Your account is ready.</p>
                  <p className="text-xs sm:text-sm text-blue-700">Start by posting your first project</p>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Stats (3 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 stagger-children">
            <Card className="p-4 sm:p-6 card-enhanced hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Posted Projects</p>
                <p className="text-4xl font-bold text-gray-900 animate-count-up">0</p>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 card-enhanced hover-lift">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-blue rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Active Teams</p>
                <p className="text-2xl sm:text-4xl font-bold text-gray-900 animate-count-up">0</p>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 card-enhanced hover-lift">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-success rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Total Spent</p>
                <p className="text-2xl sm:text-4xl font-bold text-gray-900 animate-count-up">$0</p>
              </div>
            </Card>
          </div>

          {/* Main CTA (large, centered card) */}
          <Card className="p-6 sm:p-10 text-center card-featured border-2 border-purple-200 shadow-xl hover-lift">
            <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 gradient-warm rounded-3xl flex items-center justify-center mx-auto shadow-glow-coral animate-bounce-subtle">
                <Plus className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-xl sm:text-3xl font-bold text-gradient">Post Your First Project</h2>
                <p className="text-gray-600 text-sm sm:text-lg font-medium">Connect with student teams in 24 hours</p>
              </div>
              <Button 
                onClick={() => navigate("/post-project")}
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-10 text-base sm:text-lg btn-coral shadow-glow-coral w-full sm:w-auto"
              >
                Post a Project
              </Button>
            </div>
          </Card>

          {/* My Projects Section */}
          <Card className="p-4 sm:p-8 card-enhanced">
            <div className="flex items-center justify-between mb-4 sm:mb-8 gap-2">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Your Projects</h3>
              <Button 
                onClick={() => navigate("/post-project")}
                className="btn-primary text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-10"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">New Project</span>
                <span className="xs:hidden">New</span>
              </Button>
            </div>
            
            {/* Empty State */}
            <div className="text-center py-8 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce-subtle">
                <BarChart3 className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
              </div>
              <h4 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">No projects yet</h4>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto px-4">
                Start by posting your first project to connect with talented student teams and bring your ideas to life
              </p>
              <Button 
                onClick={() => navigate("/post-project")}
                className="btn-coral px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
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
